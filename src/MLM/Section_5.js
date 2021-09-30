import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
// import { counterSlice/* increment, decrement, redoCounterAction */ } from '../reducer';

import ImgPanel from '../img/panel.webp'
import ImgUSDT from '../img/usdt.svg'
import ImgTier from '../img/tier.webp'

import {NF} from '../util';
import Metamask from '../connectors/v2';
import Loading from '../components/Loading';
import Dialog from '../components/Dialog';
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
/* import intl from 'react-intl-universal'; */

const Section = styled.section`
	margin-top: 50px;
	background: #080E23 url(${ImgPanel}) center/cover no-repeat;
	.wrapper {
		background: rgba(59, 63, 74, 0.447);
		border-radius: 15px;
		padding: 15px;
		box-shadow: 0 0 10px #33cccc;
	}
	.title {
		text-align: center;
		margin-top: 10px;
		margin-bottom: 30px;
		font-size:20px;
	}
	.icon {
		width: 1em;
		height: 1em;
	}
	.panel {
		margin-top: 10px;
		margin-bottom: 10px;
		display: flex;
		justify-content: center;
		.btn{
			font-weight:bold;
			font-size:16px;
			padding:5px 5px !important;
			text-align:center;
			border-radius:6px !important;
			width:30%;
		}
	};
	.select_form_control{
		margin-top:20px!important;
		margin-bottom:32px!important;
	}
	.tier {
		width: 300px;
		height: 300px;
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.5;
		text-shadow: 0px 2px 10px #845f15;
		background-color: transparent;
		border: none;
		outline: none;
		font-size: 0.8em !important;
		&:hover {
			opacity: 0.8;
		}
		@media (max-width: 991px){
			width: 160px;
			height: 160px;
			@media (max-width: 575px){
				width: 160px;
				height: 160px;
			}
		}
		&.big {
			width: 400px;
			height: 400px;
			z-index: 3;
			opacity: 1;
			font-size: 1em;
			cursor:auto;
			@media (max-width: 991px){
				width: 200px;
				height: 200px;
				@media (max-width: 575px){
					width: 200px;
					height: 200px;
				}
			}
		}
		.content {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			text-align: center;
		}
		img {
			width:100%;
		}
	}
`;

const DLG_DEPOSIT = 1;
const DLG_WITHDRAW = 2;

function DepositDialog(props) {
	const L = useSelector(state => state.contract.L);
	const dispatch = useDispatch();
	const [status, setStatus] = useState({
		allowance: null,
		tlb: null,
		err: null,
		loading: true,
		txid: null,
		completed: false
	});
	const contract = useSelector(state => state.contract);
	useEffect(() => {
		if (!contract.address) {
			Metamask.connect(dispatch);
		} else {
			if (status.allowance===null) {
				Metamask.allowance(contract.address).then(res=>setStatus({...status, loading:false, allowance:res}));
			} else if (status.tlb===null) {
				Metamask.amountForDeposit(Number(props.amount)).then(res=>setStatus({...status, loading:false, tlb:res}));
			}
		}
	});
	const handleApprove = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask.approve(contract.address, props.amount).then(res=>{
			if (res.txid) {
				const txid = res.txid;
				Metamask.waitTransaction(res.txid).then(res=>{
					if (res===true) {
						Metamask.allowance(contract.address).then(res=>setStatus({...status, txid, err: null, loading:false, allowance:res}));
					} else {
						setStatus({...status, loading:false, txid, err: res===false ? '失败合约授权' : '无知错误'});
					}
				})
			} else {
				setStatus({...status, loading:false, err:res.err || '无知错误'});
			}
		});
	}
	const handleSubmit = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask.deposit(contract.address, contract._referer, props.amount).then(res=>{
			if (res.txid) {
				setStatus({...status, loading:true, err: null, ...res});
				const txid = res.txid;
				Metamask.waitTransaction(txid).then(res=>{
					let err = null;
					if (res===false) {
						err = L['TEXT_FAIL'];
					} else if (res===null) {
						err = L['TEXT_ERROR'];
					}
					setStatus({...status, loading:false, completed:true, txid, err});
				})
			} else {
				setStatus({...status, loading:false, txid: null, ...res});
			}
		});
	}

	return (
		<Dialog>
			{status.loading?<Loading/>:null}
			<div className="dialog">
				<h3 className="mb-4">{L['SECTION5_MODAL_LABEL1']}</h3>
				<h4 className="mb-4">{L['SECTION5_MODAL_LABEL2']} USDT {NF(props.amount,6)} {(contract._usdt>=props.amount) ? null : <span className="text-danger">{L['TEXT_OUT_OF_BALANCE']} </span>}</h4>
				<h4 className="mb-4">{L['SECTION5_MODAL_LABEL3']} {status.tlb ? NF(status.tlb,4) : L['SECTION5_MODAL_CHECK']} {(status.tlb===null || contract._tlb>=status.tlb) ? null : <span className="text-danger">{L['TEXT_OUT_OF_BALANCE']} </span>}</h4>
				
				{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
				{status.txid ? <div className="text-center">{L['HASH']} 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
				<div className="text-center mt-3">
					{(status.completed || contract._tlb===null || contract._tlb<status.tlb) ? null : (
						status.allowance < props.amount ? (
							<button onClick={()=>handleApprove()} className="h4 btn btn-outline-info text-white">{L['APPROVE']}</button>
						) : (
							<button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">{L['TEXT_CONFIRM']}</button>
						)
					)}
					<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">{L['TEXT_CLOSE']}</button>
				</div>
			</div>
		</Dialog>
	);
}
function WithdrawDialog(props) {
	const L = useSelector(state => state.contract.L);
	const [status, setStatus] = useState({
		tlb:null,
		withdrawable: null,
		err: null,
		loading: true,
		txid: null,
		completed: false
	});
	const contract = useSelector(state => state.contract);
	useEffect(() => {
		if (status.tlb===null) {
			Metamask.amountForWithdraw(contract.address).then(res=>setStatus({...status, loading:false, tlb:res}));
		}
	});
	const handleSubmit = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask.withdraw(contract.address).then(res=>{
			if (res.txid) {
				setStatus({...status, loading:true, err: null, ...res});
				const txid = res.txid;
				Metamask.waitTransaction(txid).then(res=>{
					let err = null;
					if (res===false) {
						err = L['TEXT_FAIL'];
					} else if (res===null) {
						err = L['TEXT_ERROR'];
					}
					setStatus({...status, loading:false, txid, err});
				})
			} else {
				setStatus({...status, loading:false, txid: null, ...res});
			}
		});
	}

	return (
		<Dialog>
			{status.loading?<Loading/>:null}
			<div className="dialog">
				<h3 className="mb-4">{L['SECTION5_MODAL2_LABEL1']}</h3>
				<h4 className="mb-4">{L['SECTION5_MODAL2_LABEL2']} {NF(contract._withdrawable,6)} USDT</h4>
				<h4 className="mb-4">{L['SECTION5_MODAL_LABEL3']} {status.tlb===null ? L['SECTION5_MODAL_CHECK'] : NF(status.tlb,4)}  {(status.tlb===null || contract._tlb>=status.tlb) ? null : <span className="text-danger">{L['TEXT_OUT_OF_BALANCE']}</span>}</h4>
				{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
				{status.txid ? <div className="text-center">{L['HASH']} 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
				<div className="text-center mt-3">
					{(status.completed || contract._withdrawable===0 || contract._tlb<status.tlb) ? null : <button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">{L['TEXT_CONFIRM']}</button>}
					<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">{L['TEXT_CLOSE']}</button>
				</div>
			</div>
		</Dialog>
	);
}

function Section_5(props) {
	const L = useSelector(state => state.contract.L);
	const [open, setOpen] = useState(0);
	const contract = useSelector(state => state.contract);
	const smallestAmount = contract._lastAmount ? (contract._lastAmount>=10000 ? 10000 : contract._lastAmount + 100) : 200;
	let [amount,setAmount] = useState(smallestAmount);
	let [part,setPart] = useState({
		left: 1000,
		right: 2000,
		center: 5000
	});
	/* const dispatch = useDispatch() */
	function valueChanger(e) {
		setAmount(e.target.value);
	}
	function valuePart(val,side) {
		if (side==='left' || side==='right') {
			setPart({...part,center:part[side],[side]:part.center});
		}
		setAmount(val);
	}
	useEffect(() => {
		if (amount<smallestAmount) setAmount(smallestAmount)
	});
	return (
		<Section>
			<OverPack always={false} >
				<div style={{minHeight:498}}>
					<QueueAnim type={['scale']}>
						<div className="wrapper -3 p-md-5 " key="a">
							<h2 className="title">{L['TITLE_5']}</h2>
							<div className="h3 select_form_wrapper p-2 bg-white rounded-3 d-flex align-items-center">
								<div className="form-group d-flex align-items-center">
									<img className="icon" src={ImgUSDT} alt="" />
									<span className="text-black-50">USDT</span>
								</div>
								<div className="form-group flex-grow-1 w-75 d-flex">
									<input onChange={valueChanger} type="number" step="100" className="input_focus_off w-100 text-end bg_transparent shadow-0 border-0 rounded-0 line_height_int" value={amount} />
								</div>
							</div>
							<div className="select_form_control d-flex justify-content-center my-5">
								<button onClick={e => setAmount(amount+100)} className="h3 btn bg_cyan2 text-white px-3 px-md-5 py-2 mx-2 mx-md-3 rounded-pill">
									<i className="fas fa-plus    "></i>
								</button>
								<button onClick={e => setAmount(smallestAmount)} className="h3 btn bg_cyan2 text-white px-3 px-md-5 py-2 mx-2 mx-md-3 rounded-pill">
									<i className="fas fa-redo    "></i>
								</button>
								<button onClick={e => setAmount(amount < smallestAmount+100 ? smallestAmount : amount-100)} className="h3 btn bg_cyan2 text-white px-3 px-md-5 py-2 mx-2 mx-md-3 rounded-pill">
									<i className="fas fa-minus    "></i>
								</button>
							</div>
							<div className="panel h3">
								<button onClick={()=>valuePart(part.left,'left')} className="tier me-xl-n5 me-n1">
									<h4 className="content text-white">
										<i className="fas fa-plus d-block"></i>
										<label>{part.left}U</label>
									</h4>
									<img src={ImgTier} alt="circle_value" />
								</button>
								<button onClick={()=>valuePart(part.center,'center')} className="tier big mx-xl-n5 mx-n4">
									<h3 className="content text-white">
										<i className="fas fa-plus d-block    "></i>
										<label>{part.center}U</label>
									</h3>
									<img src={ImgTier} alt="circle_value" />
								</button>
								<button onClick={()=>valuePart(part.right,'right')} className="tier ms-xl-n5 ms-n1">
									<h4 className="content text-white">
										<i className="fas fa-plus d-block    "></i>
										<label>{part.right}U</label>
									</h4>
									<img src={ImgTier} alt="circle_value" />
								</button>
							</div>
							<div className="panel">
								<button onClick={()=>setOpen(DLG_DEPOSIT)} className="btn px-5 mx-2 mx-md-3 text-white rounded-pill bg_cyan2">
								{L['CONTENT_5_DEPOSIT']}
								</button>
								<button onClick={()=>setOpen(DLG_WITHDRAW)} className="btn px-5 mx-2 mx-md-3 text-white rounded-pill bg_cyan2">
								{L['CONTENT_5_WITHDRAW']}
								</button>
							</div>
						</div>
					</QueueAnim>
				</div>
			</OverPack>
			{open===DLG_DEPOSIT ? <DepositDialog handleClose={()=>setOpen(0)} amount={amount} /> : null}
			{open===DLG_WITHDRAW ? <WithdrawDialog handleClose={()=>setOpen(0)} /> : null}

		</Section>
	);
}

export default Section_5;