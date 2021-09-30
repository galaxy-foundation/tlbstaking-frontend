import {useState,useEffect} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';

import ImgUSDT from '../img/usdt.svg'
import ImgTLB from '../img/tlb.svg'
import { NF } from '../util';
import Metamask from '../connectors/v2';
import Loading from '../components/Loading';
import Dialog from '../components/Dialog';
import { OverPack } from 'rc-scroll-anim';
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
/* import intl from 'react-intl-universal'; */


const Section = styled.section`
	margin-top: 0px;
	h2 {
		margin-bottom: 1em;

	}
	button.h3 {
		margin-bottom: 0;
	}
	
	.icon {
		width: 1em;
		height: 1em;
	}
	.content_wrapper {
		border-radius: 20px;
		padding: 20px;

	}
	.btn_control_tab{
		.btn_custom_group{
			border-radius: 20px;
			overflow: hidden;
			.btn{
				border-radius: 20px;
			}
		}
	}
	.max-btn{
		color:#13A53E !important;
		border:1px solid #13A53E !important;
		padding:0 3px !important;
	}
	.trade-btn{
		color:#fff !important;
		background-color:#13B643 !important;
	}
`

const TYPE_BUY = 1;
const TYPE_SELL = 2;
function TradeDialog(props) {
	const L = useSelector(state => state.contract.L);
	const dispatch = useDispatch();
	const {type,amount,amount2} = props;
	const [status, setStatus] = useState({
		allowance: null,
		err: null,
		loading: type===TYPE_BUY,
		txid: null,
		completed: false
	});
	const contract = useSelector(state => state.contract);
	useEffect(() => {
		if (!contract.address) {
			Metamask.connect(dispatch);
		} else {
			if (type===TYPE_BUY && status.allowance===null) {
				Metamask.allowance(contract.address).then(res=>setStatus({...status, loading:false, allowance:res}));
			}
		}
	});
	const handleApprove = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask.approve(contract.address, amount).then(res=>{
			if (res.txid) {
				const txid = res.txid;
				Metamask.waitTransaction(res.txid).then(res=>{
					if (res===true) {
						Metamask.allowance(contract.address).then(res=>setStatus({...status, txid, err: null, loading:false, allowance:res}));
					} else {
						setStatus({...status, loading:false, txid, err: res===false ? L["APPROVE_FAIL"] : L["TEXT_ERROR"]});
					}
				})
			} else {
				setStatus({...status, loading:false, err:res.err || L["TEXT_ERROR"]});
			}
		});
	}
	const handleSubmit = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask[type===TYPE_BUY?'buy':'sell'](contract.address, amount).then(res=>{
			if (res.txid) {
				setStatus({...status, loading:true, err: null, ...res});
				const txid = res.txid;
				Metamask.waitTransaction(txid).then(res=>{
					let err = null;
					if (res===false) {
						err = L["TEXT_FAIL"] + (type===TYPE_BUY?L["TEXT_BUY"]:L["TEXT_SELL"]);
					} else if (res===null) {
						err = L["TEXT_ERROR"];
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
			{type===TYPE_BUY ? (
				<div className="dialog">
					<h3 className="mb-4">{L["TEXT_BUY"]}TLB</h3>
					<h4 className="mb-4">USDT {amount ? NF(amount,6) : '-'} {contract._usdt<amount ? <span className="text-danger">{L["TEXT_OUT_OF_BALANCE"]}</span> : null}</h4>
					<h4 className="mb-4">TLB {amount2 ? NF(amount2,Metamask.precisionTlb) : '-'}</h4>
					{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
					{status.txid ? <div className="text-center">{L["HASH"]} 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
					<div className="text-center mt-3">
						{(status.completed || amount<=0 || contract._usdt<amount) ? null : (
							status.allowance < amount ? (
								<button onClick={()=>handleApprove()} className="h4 btn btn-outline-info text-white">{L["APPROVE"]}</button>
							) : (
								<button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">{L["TEXT_CONFIRM"]}</button>
							)
						)}
						<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">{L["TEXT_CLOSE"]}</button>
					</div>
				</div>
			) : (
				<div className="dialog">
					<h3 className="mb-4">{L["TEXT_SELL"]}TLB</h3>
					<h4 className="mb-4">TLB {NF(amount,Metamask.precisionTlb)} {contract._tlb<amount ? <span className="text-danger">{L["TEXT_OUT_OF_BALANCE"]}</span> : null}</h4>
					<h4 className="mb-4">USDT {NF(amount2,6)}</h4>
					{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
					{status.txid ? <div className="text-center">{L["HASH"]} 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
					<div className="text-center mt-3">
						{(status.completed || contract._tlb<amount) ? null : <button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">{L["TEXT_CONFIRM"]}</button>}
						<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">{L["TEXT_CLOSE"]}</button>
					</div>
				</div>
			)}
		</Dialog>
	);
}
function CancelDialog(props) {
	const L = useSelector(state => state.contract.L);
	const [status, setStatus] = useState({
		err: null,
		loading: false,
		txid: null,
		completed: false
	});
	const contract = useSelector(state => state.contract);
	const handleSubmit = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask['cancel'+(props.type===TYPE_BUY?'Buy':'Sell')+'Order'](contract.address).then(res=>{
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
				<h3 className="mb-4">{L["TEXT_CANCEL_ORDER"]}{(props.type===TYPE_BUY?L["TEXT_BUY"]:L["TEXT_SELL"])}{L["TEXT_ORDER"]}</h3>
				{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
				{status.txid ? <div className="text-center">{L["HASH"]} 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
				<div className="text-center mt-3">
					{status.completed ? null : <button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">{L["TEXT_CONFIRM"]}</button>}
					<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">{L["TEXT_CLOSE"]}</button>
				</div>
			</div>
		</Dialog>
	);
}

function Section_8(props) {
	const L = useSelector(state => state.contract.L);
	let [status,setStatus] = useState({
		type: TYPE_BUY,
		trade: false,
		cancel: false,
		amount: 0
	});
	
	let contract = useSelector(state => state.contract);
	const amount2 = contract.price ? Number(status.type===TYPE_BUY?(status.amount/contract.price).toFixed(Metamask.precisionTlb):(status.amount*contract.price*0.998).toFixed(6)) : '';

	/* console.log(NF(contract._usdt, 6));
	console.log(NF(contract._tlb, Metamask.precisionTlb)); */
	const balance = contract.address ? (status.type===TYPE_BUY ? NF(contract._usdt, 6) + ' USDT' : NF(contract._tlb, Metamask.precisionTlb) + ' TLB') : '-';

	const changeAmount = (amount) => {
		setStatus({...status, amount:Math.floor(amount)});
	}
	return (
		<Section>
			<OverPack always={false}  style={{height:42}}>
			<h2 className="text-center">
				<Texty>{L['TITLE_8']}</Texty>
			</h2>
			</OverPack>
			<OverPack always={false} >
				<div style={{minHeight:368}}>
					<QueueAnim type="scale">
					<div className="content_wrapper bg_blue_9" key="a">
						<div className="btn_control_tab">
							<div className="btn-group btn_custom_group d-flex w-100 bg_a4">
								<button onClick={()=>setStatus({...status, type:TYPE_BUY})}  className={"btn text-white w-50 " + (status.type===TYPE_BUY ? 'bg_cyan2' : '')}>{L['CONTENT_8_BUY']}</button>
								<button onClick={()=>setStatus({...status, type:TYPE_SELL})} className={"btn text-white w-50 " + (status.type===TYPE_SELL ? 'bg_cyan2' : '')}>{L['CONTENT_8_SELL']}</button>
							</div>
						</div>
						<div className="d-flex align-items-center  justify-content-between mt-3 text-white mt-md-5" style={{marginBottom:10}}>
							{L['CONTENT_8_BALANCE']}：{balance}
							<button onClick={()=>changeAmount(status.type===TYPE_BUY?contract._usdt:contract._tlb)} className="max-btn text-white-50 btn muted-0 rounded-3 pill_max px-3 text-center">
								MAX
							</button>
						</div>

						<div className="h3 select_form_wrapper p-2 bg-white rounded-3 d-flex align-items-center">
							<div className="form-group d-flex align-items-center">
								<img className="icon" src={status.type===TYPE_BUY?ImgUSDT:ImgTLB} alt="" />
								<span className="text-black-50">{status.type===TYPE_BUY?'USDT':'TLB'}</span>
							</div>
							<div className="form-group flex-grow-1 w-75 d-flex">
								<input onChange={(e)=>changeAmount(Number(e.target.value))} type="number" max="1000000" min="0" value={status.amount} className="input_focus_off w-100 text-end bg_transparent border-0 rounded-0 line_height_int" />
							</div>
						</div>

						<div className="text-center p-1">
							<i className="h3 far fa-arrow-alt-circle-down"></i>
						</div>

						<div className="h3 select_form_wrapper p-2 bg-white rounded-3 d-flex align-items-center">
							<div className="form-group d-flex align-items-center">
								<img className="icon" src={status.type===TYPE_BUY?ImgTLB:ImgUSDT} alt="" />
								<span className="text-black-50">{status.type===TYPE_BUY?'TLB':'USDT'}</span>
							</div>
							<div className="form-group flex-grow-1 w-75 d-flex">
								<input readOnly value={amount2} className="input_focus_off w-100 text-end bg_transparent border-0 rounded-0 line_height_int" />
							</div>
						</div>

						<div className="d-flex justify-content-center align-items-center">
							<h4 className="text-center mb-0  text-white me-3 me-md-5">
								{status.type===TYPE_BUY?'1 TLB = ' + contract.price + 'USDT':'1 USDT = ' + (1/contract.price).toFixed(Metamask.precisionTlb) + ' TLB'}
							</h4>
							<button className="h3 btn btn-muted m-0 p-0 ms-3 ms-md-5 text-white rounded-0" style={{backgroundColor:'none',boxShadow:'none'}}>
								<i className="fas fa-sync-alt"></i>
							</button>
						</div>
						<br />
						<div className="btn_control_exchange d-flex justify-content-center">
							<button onClick={()=>setStatus({...status, trade:true})} className="trade-btn h4 btn me-1 me-md-3 radius_left_side_pill bg-white text-black-50 flex-grow-1">
							{L['CONTENT_8_CONFIRM']}
							</button>
							<button onClick={()=>setStatus({...status, cancel:true})} className="trade-btn h4 btn ms-1 ms-md-3 radius_right_side_pill bg-white text-black-50 flex-grow-1">
							{L['CONTENT_8_CANCEL']}
							</button>
						</div>
					</div>
					</QueueAnim>
				</div>
			</OverPack>
			{status.trade  ? <TradeDialog  handleClose={()=>setStatus({...status,trade:false})}  type={status.type} amount={status.amount} amount2={amount2} /> : null}
			{status.cancel ? <CancelDialog handleClose={()=>setStatus({...status,cancel:false})} type={status.type} /> : null}
		</Section>
	);
}

export default Section_8;