import {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch} from 'react-redux';

import styled from 'styled-components';

import { contractSlice } from '../reducer';
import {NF,TF,copyToClipboard} from '../util';
import Dialog from '../components/Dialog';

import Metamask from '../connectors/v2';
import ImgCell from '../img/btn-cell.webp'
import ImgUSDT from '../img/usdt.svg'
import ImgTLB from '../img/logo.svg'
import ImgCheck from '../img/checkmark.webp'
import ImgWechat from '../img/social-wechat.webp'
import ImgGoogle from '../img/social-google.webp'
import ImgYoutube from '../img/social-youtube.webp'
import minerPanel from "../img/miner-panel.webp"

import {IgrLegendModule, IgrItemLegendModule, IgrRingSeriesModule, IgrDoughnutChartModule, IgrItemLegend, IgrDoughnutChart, IgrRingSeries, IgrLegend, IgrCategoryChart, IgrCategoryChartModule} from 'igniteui-react-charts';

import Loading from '../components/Loading';
import Logo from '../img/tlb.svg'

import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import mineIcon from "../img/mining.webp"

const mods = [
    IgrLegendModule,
	IgrItemLegendModule,
    IgrDoughnutChartModule,
	IgrRingSeriesModule,
	IgrCategoryChartModule
];

mods.forEach((m) => m.register());

const Section = styled.section`
	.overlay {
		pointer-events: none;
	}
	padding-top:20px;
	.wallet{
		border-radius:20px;
	}
	.radius {
		border-radius: 10px;
	}
	.radius-button {
		border-radius: 5px;
	}
	div.address {
		&.btn  {
			text-transform: none;
		}
	}
	.top_bottom_cyan_bg {
		background: url(${ImgCell}) center/100% 100% no-repeat;
	}
	.content_wrapper {
		padding: 15px;
	}
	.wallet-panel {
		margin-bottom: 50px;
		text-align: right;
	}
	.gauge{
        position: relative;
		width: 100%;
		height: 100%;

		div.text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 1;
			text-align: center;
			
		}
    }
	ul.ad {
		img {
			height: 1em;
		}
	}
	div.buy {
		padding: 20px;
		button {
			font-size: 1em;
			padding-left: 0;
			padding-top: 0.625rem;
			padding-right: 0;
    		padding-bottom: 0.5rem;
		}
	}
	.mode-selector {
		border-radius: .25rem;
		background-color: white;
		button {
			margin-bottom: 0 !important;
		}
	}
	.gradient_bg {
		background: linear-gradient(-43deg, #1ABC62, #2AFDEF);
		padding:2px 15px !important;
		opacity:.8;
	}
	.bg_blue_9{
		background-color:rgba(0,0,0,.2) !important;
		border:2px solid #2AFDEF;
		border-image: -webkit-linear-gradient(#CC0406,#13B643) 30 30;
		border-image: -moz-linear-gradient(#CC0406,#13B643) 30 30;
		border-image: linear-gradient(#CC0406,#13B643) 30 30;
		border-radius:6px !important;
	}
	.miner-panel{
		position:relative;
		.miner-panel-image{
			width:100%;
			position:absolute;
			top:0;
			left:0;

		}
		.miner-panel-text{
			padding-top:50px;
			text-align:center;
			font-size:12px;
			*{text-align:center;}
			.main_color{
				font-weight:bold;
				font-size:18px;
				color:#05FD48 !important;
			}
		}
	}
	.miner-info{
		.txt_wrapper{padding:5px !important;}
		h4{
			font-size:18px !important;
			line-height:100% !important;
			padding:0 !important;
			margin:0 !important;
		}
		span{
			font-size:12px;
			line-height:100%;
		}
	}
	.miner-buy{
		.buy{
			div{font-size:12px;font-weight:normal;color:#05FD48;}
		}
	}

	p.tip{font-size:10px;line-height:120% !important;}

	.cyan_btn_group {
		.cyan_btn {
			border: 1.5px solid #19789D;
			border-radius:0;
			overflow: visible !important;
			position: relative;
			background: rgba(48, 64, 96, 0.357);
			&::before {
				content: "";
				position: absolute;
				width: 90%;
				height: 2px;
				top: -15px;
				left: 50%;
				transform: translateX(-50%);
				background: linear-gradient(
					90deg,
					rgba(0, 238, 255, 0.07) 10%,
					#00f0ff 49%,
					rgba(0, 238, 255, 0.07) 90%
				);
				border-radius: 100%;
			}
			.cyan_btn_bottom {
				position: relative;
				display: block;
				margin-top: -13px;
				border-top: 5px solid #303447;
				span{
					display:block;
					margin-top:-15px;
					padding:5px;
					color:#05FD48;
				}
				&::before {
					content: "";
					position: absolute;
					width: 90%;
					height: 2px;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					background: linear-gradient(
						90deg,
						rgba(0, 238, 255, 0.07) 10%,
						#00f0ff 49%,
						rgba(0, 238, 255, 0.07) 90%
					);
					border-radius: 100%;
				}
			}
			&:hover {
				background-color: #1b50c7;
			}
		}
	}	
	.mining-log{
		margin-left:-10px;
		margin-right:-10px;
		ul{
			*{
				display:flex;
				flex-direction:colum;
			}
			
			border:1px solid rgba(255,255,255,.5);
			border-radius:6px !important;
			list-style:none;
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			margin:0;
			padding:0;
			margin-bottom:5px;
			li{
				display:flex;
				flex-direction:colum;
				font-size:12px;
				a{
					color:#13B643;
				}
				.icon{
					width:20px;
					height:20px;
				}
				
			}
			li:last-child{
				span{
					font-weight:bold;
					color:#13B643;
					padding-right:5px;
				}
				flex-direction:row;
				justify-content:flex-end;
			}
		}
		
	}
	.static-table{
		th{
			font-size:12px;
		}
		th.left,td.left{
			text-align:left;
		}
		td{
			font-size:12px;
			a{
				color:#13B643;
			}
		}
	}
`
// https://codesandbox.io/examples/package/igniteui-react-charts
const Section1 = () => {
	const L = useSelector(state => state.contract.L);
	let contract = useSelector(state => state.contract);
	const dispatch = useDispatch()
	const connectWallet = () => {
		Metamask.connect(dispatch);
	};
	
	const now = Math.round(new Date().getTime()/1000);
	const chart = {
		min: -10,
		max: 0,
		data: []
	};
	let count = contract.tvls.length>6 ? 6 : contract.tvls.length;
	for(let i=0; i<count; i++) {
		if (count) {
			const v = contract.tvls[i];
			if (chart.max < v[2]) {
				chart.max = v[2];
			}
			if (chart.min===-10) {
				chart.min = v[2];
			} else if (chart.min>v[2]) {
				chart.min = v[2];
			}
			chart.data.push({x:v[0],y:v[2]})
		}

	}
	//console.log(contract)
	chart.data.push({
		x: contract.block.time,
		y: contract.minerTotalPower
	});
	if (contract.minerTotalPower && chart.max < contract.minerTotalPower) {
		chart.max = contract.minerTotalPower;
	}

	console.log(chart)

	console.log(chart.min-(chart.max-chart.min)/5);

	let chartYmax = chart.min+(chart.max-chart.min)/5
	let chartYmin = chart.min-(chart.max-chart.min)/5

	if(chartYmin - chartYmax === 0){
		chartYmin = 0;
	}
	
	/* const data = [
		{x:1597763454, y:0},
		{x:1597767054, y:10},
		{x:1597770654, y:20},
		{x:1597774254, y:40}
	]; */
	/* data.push({
		x: contract.block.time,
		y: contract.minerTotalPower
	}); */
	return (
		<Section>
			
			<div className="wallet-panel">
				{contract.address? (
					<div className="wallet address btn gradient_bg text-white">
						{contract.address.slice(0,8)+'***'+contract.address.slice(-4) }
					</div>
				) : (
					<button onClick={connectWallet} className="wallet address btn gradient_bg text-white">
						{L["TEXT_CONNECT"]}
					</button>
				)}
			</div>
			<h4 className=" text-end text-white mb-2 mb-md-4 main_color">
				{L["MINER_POWER"]}
			</h4>
			<div className="content_wrapper overlay">
				<IgrCategoryChart
					height="200px"
					width="100%"

					chartType="Spline"
					dataSource={chart.data}
					xAxisFormatLabel={(item)=>{
						const date = new Date(item.x * 1000);
						const h = date.getHours();
						const m = date.getMinutes();
						//console.log(date)
						return (h>9?'':'0') + h + ':' + (m>9?'':'0') + m;
					}}
					yAxisFormatLabel={(item)=>{
						if(item < 0){
							item = 0;
						}
						return item<1000 ? Math.ceil(item/5)*5 : Math.ceil(item/200)/5 + "K";
					}}
					yAxisMinimumValue={chartYmin}
					yAxisMaximumValue={chartYmax}
					yAxisInterval={(chart.max-chart.min)/4}
					includedProperties={['x','y']}
					thickness={2}
					>
                </IgrCategoryChart>
			</div>
		</Section>
	)
}
const Section2 = () => {
	const L = useSelector(state => state.contract.L);
	let contract = useSelector(state => state.contract);
	/* const totalSupply = (Math.round(contract.totalSupply/100)/100) + L["UNIT_TLB"]; */
	//const circulating = (Math.round((contract.totalSupply-contract.totalBurnt)/100)/100) + L["UNIT_TLB"];
	const circulating = (Math.round((contract.totalSupply)/100)/100) + L["UNIT_TLB"];
	const totalBurnt = contract.totalBurnt>10000 ? (Math.round(contract.totalBurnt/100)/100) + L["UNIT_TLB"] : contract.totalBurnt + 'TLB';
	
	return (
		<Section>
			<OverPack always={false} style={{minHeight:155}}>
				<QueueAnim type="scale">
					<div key="a" className="content_wrapper bg_blue_9 px-2 py-3 py-md-5 radius">
						<table className="w-100 text-center">
							<tbody>
								<tr className="text-white">
									<td>{L["BOX1_LABEL1"]}</td>
									<td>{L["BOX1_LABEL2"]}</td>
									<td>{L["BOX1_LABEL3"]}</td>
								</tr>
								<tr className="text_cyan">
									<td className="pb-3 pb-md-5 main_color">3502{L["UNIT_TLB"]}</td>
									<td className="pb-3 pb-md-5 main_color">{circulating}</td>
									<td className="pb-3 pb-md-5 main_color">{totalBurnt}</td>
								</tr>
								<tr className="text-white">
									<td>{L["BOX1_LABEL4"]}</td>
									<td>{L["BOX1_LABEL5"]}</td>
									<td>{L["BOX1_LABEL6"]}</td>
								</tr>
								<tr className="text_cyan main_color">
									<td className="main_color">{contract.block.number}</td>
									<td className="main_color">00：03</td>
									<td className="main_color">{contract.minerCount} / {contract.minerTotalPower} T</td>
								</tr>
							</tbody>
						</table>
					</div>
				</QueueAnim>
			</OverPack>
		</Section>
	)
}

const Section3 = () => {
	const L = useSelector(state => state.contract.L);
	let contract = useSelector(state => state.contract);
	return (
		<Section>
			<OverPack always={false} style={{minHeight:443}}>
				<QueueAnim type="scale">
					<div key="a" className="content_wrapper bg_blue_9 p-3 radius">
						<div className="chart_wrapper">
							<div className="row no-gutters">
								<div className="col-7">
									<div className="miner-panel">
										<img src={minerPanel} className='miner-panel-image'></img>
										<div className="miner-panel-text text">
											{L["BOX2_POWER"]}<br/>
											<span className="main_color">
												{contract.address ? contract._minerTier + ' T' : '-'}
											</span>
										</div>
										
									</div>
									
								</div>
								<div className="col-5">
									<div className="text-center miner-info">
										<div className="txt_wrapper top_bottom_cyan_bg py-3">
											<h4 className="text_cyan main_color">{contract.address ? contract._minerCount : '-'}</h4>
											<span>{L["BOX2_LABEL1"]}</span>
										</div>
										<div className="txt_wrapper top_bottom_cyan_bg py-3" style={{marginTop:15}}>
											<h4 className="text_cyan main_color">{contract.address ? contract._minerRefTotal : '-'}</h4>
											<span>{L["BOX2_LABEL2"]}</span>
										</div>
									</div>
								</div>
							</div>

						</div>
						<div className="txt_wrapper mt-5">
							<h4 className="mb-3">
								{L["BOX2_LABEL3"]}
							</h4>
							<div className="d-flex ">
								<input readOnly value={"https://"+window.location.host+"/miner/"+contract.address} className="form-control w-100"  />
								<button onClick={()=>copyToClipboard("https://"+window.location.host+"/miner/"+contract.address)} className="btn btn-muted bg_cyan text-white ms-2 text-nowrap radius-button  " style={{backgroundColor:'#15b643'}}>
									{L["TEXT_COPY"]}
								</button>
							</div>
						</div>
						<div className="social_wrapper mb-3 mb-md-5 mt-4">
							<div className="row justify-content-center">
								<div className="col-11">
									<ul className="ad list-unstyled flex-grow-1 m-0 p-0 d-flex align-items-center justify-content-between">
										<li>
											<a href="#"><i className="fab fa-facebook text-white"></i></a>
										</li>
										<li>
											<a href="#"><i className="fab fa-twitter text-white"></i></a>
										</li>
										<li>
											<a href="#"><i className="fab fa-linkedin-in text-white"></i></a>
										</li>
										<li>
											<a href="#"><i className="fab fa-tumblr text-white"></i></a>
										</li>
										<li>
											<a href="#"><img src={ImgWechat} alt="wechat" /></a>
										</li>
										<li>
											<a href="#"><img src={ImgGoogle} alt="google" /></a>
										</li>
										<li>
											<a href="#"><img src={ImgYoutube} alt="youtube" /></a>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="footer_wrapper mt-5">
							<h4>{L["BOX2_LABEL4"]}</h4>
							<div className="row">
								<div className="col-6 d-flex align-items-start">
									<img style={{ height: '3em' }} src={Logo} alt="TLB" />
									<div className="ms-2">
										<div className="text-white">TLB</div>
										<span className="text_cyan main_color">
											{contract.address ? NF(contract._tlb,2) : '-'}
										</span>
									</div>
								</div>
								<div className="col-6 d-flex align-items-start">
									<span className="bg_cyan rounded-circle">
										<img className="rounded-circle" style={{ height: '3em' }} src={ImgUSDT} alt="bitcoin_sm" />
									</span>
									<div className="ms-2">
										<div className="text-white">USDT</div>
										<span className="text_cyan main_color">
											{contract.address ? NF(contract._usdt,2) : '-'}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</QueueAnim>
			</OverPack>
		</Section>
	)
}
// const DLG_MODE = 1;
const DLG_BUY = 2;
const DLG_START = 3;
const DLG_WITHDRAW = 4;

function BuyDialog(props) {
	const L = useSelector(state => state.contract.L);
	const dispatch = useDispatch();
	const {param} = props;
	const [status, setStatus] = useState({
		allowance: null,
		/* usdt: null, */
		err: null,
		loading: true,
		txid: null,
		completed: false
	});
	
	const contract = useSelector(state => state.contract);
	const amount = contract['minerTierPrice'+param];
	useEffect(() => {
		if (!contract.address) {
			Metamask.connect(dispatch);
		} else {
			if (status.allowance===null) {
				Metamask.allowance(contract.address).then(res=>setStatus({...status, loading:false, allowance:res}));
			}
		}
	});
	const handleApprove = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask.approve(contract.address, amount + amount*0.1).then(res=>{
			if (res.txid) {
				const txid = res.txid;
				setStatus({...status, loading:true, err: null, ...res});
				Metamask.waitTransaction(res.txid).then(res=>{
					if (res===true) {
						Metamask.allowance(contract.address).then(res=>setStatus({...status, txid, err: null, loading:false, allowance:res}));
					} else {
						setStatus({...status, loading:false, txid, err: res===false ? L["TEXT_FAIL"] : L["TEXT_ERROR"]});
					}
				})
			} else {
				setStatus({...status, loading:false, err:res.err || L["TEXT_ERROR"]});
			}
		});
	}
	const handleSubmit = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask.buyMiner(contract.address, (contract._minerReferer || contract._referer), param-1).then(res=>{
			if (res.txid) {
				setStatus({...status, loading:true, err: null, ...res});
				const txid = res.txid;
				Metamask.waitTransaction(txid).then(res=>{
					let err = null;
					if (res===false) {
						err = L["TEXT_FAIL"];
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
			<div className="dialog">
				<h3 className="mb-4">{L["TEXT_BUY_MINER"]}</h3>
				<h4 className="mb-4">{L["TEXT_PRICE"]} USDT {NF(amount)}  {(contract._usdt>=amount) ? null : <span className="text-danger">{L["TEXT_OUT_OF_BALANCE"]}</span>}</h4>
				{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
				{status.txid ? <div className="text-center">{L["HASH"]} 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
				<div className="text-center mt-3">
					{(status.completed || contract._usdt<amount) ? null : (
						status.allowance < amount ? (
							<button onClick={()=>handleApprove()} className="h4 btn btn-outline-info text-white">{L["APPROVE"]}</button>
						) : (
							<button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">{L["TEXT_CONFIRM"]}</button>
						)
					)}
					<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">{L["TEXT_CLOSE"]}</button>
				</div>
			</div>
		</Dialog>
	);
}

function StartDialog(props) {
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
		Metamask.startMine(contract.address).then(res=>{
			if (res.txid) {
				setStatus({...status, loading:true, err: null, ...res});
				const txid = res.txid;
				Metamask.waitTransaction(txid).then(res=>{
					let err = null;
					if (res===false) {
						err = L["TEXT_FAIL"];
					} else if (res===null) {
						err = L["TEXT_ERROR"];
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
				<h3 className="mb-4">{L["MINER_START"]}</h3>
				{contract._mineStatus ? <div className="text-center text-success">{L["MINER_STARTED"]}</div> : null}
				{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
				{status.txid ? <div className="text-center">{L["HASH"]} 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
				<div className="text-center mt-3">
					{(status.completed || contract._mineStatus) ? null : <button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">{L["START"]}</button>}
					<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">{L["TEXT_CLOSE"]}</button>
				</div>
			</div>
		</Dialog>
	);
}
/*
function ModeDialog(props) {
	const L = useSelector(state => state.contract.L);
	const [status, setStatus] = useState({
		err: null,
		loading: false,
		txid: null,
		completed: false
	});
	const contract = useSelector(state => state.contract);
	const {mode, param, title} = props;
	const handleSubmit = () => {
		setStatus({...status, loading:true, err:null, txid: null});
		Metamask.setMineType(contract.address, param).then(res=>{
			if (res.txid) {
				setStatus({...status, loading:true, err: null, ...res});
				const txid = res.txid;
				Metamask.waitTransaction(txid).then(res=>{
					let err = null;
					if (res===false) {
						err = '失败挖矿模式更改';
					} else if (res===null) {
						err = '无知错误';
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
				<h3 className="mb-4">{title}</h3>
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
*/
function WithdrawDialog(props) {
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
		Metamask.withdrawFromPool(contract.address).then(res=>{
			if (res.txid) {
				setStatus({...status, loading:true, err: null, ...res});
				const txid = res.txid;
				Metamask.waitTransaction(txid).then(res=>{
					let err = null;
					if (res===false) {
						err = L["TEXT_FAIL"];
					} else if (res===null) {
						err = L["TEXT_ERROR"];
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
				<h3 className="mb-4">{L["BOX3_CLAIM"]}</h3>
				<h4 className="mb-4">{L["CONTENT_5_WITHDRAW"]} {NF(contract._minePending,4)} TLB</h4>
				{status.err ? <div className="text-center text-danger">{status.err}</div> : null}
				{status.txid ? <div className="text-center">{L["HASH"]} 【<a className="cmd" href={Metamask.explorer+'/tx/'+status.txid} target="_new">{status.txid.slice(0,10)+'***'+status.txid.slice(-4)}</a>】</div> : null}
				<div className="text-center mt-3">
					{(status.completed || contract._minePending===0) ? null : <button onClick={()=>handleSubmit()} className="h4 btn btn-success text-white">{L["TEXT_CONFIRM"]}</button>}
					<button onClick={()=>props.handleClose()} className="h4 mx-3 btn text-white">{L["TEXT_CLOSE"]}</button>
				</div>
			</div>
		</Dialog>
	);
}

const Section4 = () => {
	const L = useSelector(state => state.contract.L);
	const contract = useSelector(state => state.contract);
	let [status,setStatus] = useState({
		open: 0,
		param: 0,
		title: ''
	});
	/* const dispatch = useDispatch(); */

	const blocks = contract.blocks;

	let enableMining = true;
	/* let totalPower = contract._minerTier;
	let totalReward = contract._mineRewards;
	let minerTotalPower = contract.minerTotalPower; */

	/* let currentLayer = contract.currentLayer;

	let whiteList = [
		'0x51a509be6b6c880b4118bf3ceb2cb583e07b7e42',//7500U买的50T的矿机。当台矿机剩余总产量79657.8947＝按7567.5（当前矿机价格）÷0.19（当前TLB价格）×2
		'0xfa9abc0e278c7c76fd545188288763f27978b755',//25T矿机3500u剩余产量37173.6842＝当前矿机价格3531.5÷（当前TLB价格）0.19＝18586.8421×2
		'0xadb4d65fde1c59fdf33f37ac34e7040b73664f9a',//100T的矿机的地址
		//'0x701232093d50058af9038ca82b26d9afbec240a2'
	]

	let isWhite = false;
	for(let i=0;i<whiteList.length;i++){
		let currentAddress = whiteList[i];
		if(currentAddress == contract.address){
			isWhite = true;
		}
	}

	//console.log("is white:"+isWhite)

	let enableTotalReward = 0;
	let currentPrice = contract.price;

	//console.log(contract.address)
	if(isWhite){
		if(contract.address == whiteList[0]){
			enableTotalReward = (7567.5/currentPrice * 2).toFixed(2);
		}else if(contract.address == whiteList[1]){
			enableTotalReward = (3531.5/currentPrice * 2).toFixed(2);
		}else if(contract.address == whiteList[2]){
			enableTotalReward = (15150/currentPrice * 2).toFixed(2);
		}else{
			enableTotalReward = 0;
		}
	}
	
	

	let rewardT = (1.6/minerTotalPower * 9600).toFixed(4);
	let userReward = rewardT * totalPower;
	

	// if(totalPower < 25){
	// 	//enableTotalReward = totalPower * (400 - 4 * currentLayer);
	// 	enableTotalReward = (500 - 30 * currentLayer) * totalPower;
	// }else if(totalPower>=25 && totalPower <50){
	// 	enableTotalReward = totalPower * (1500 - 15 * currentLayer);
	// }else if(totalPower>=50 && totalPower <100){
	// 	enableTotalReward = totalPower * (2000 - 20 * currentLayer);
	// }else{
	// 	enableTotalReward = totalPower * (2500 - 25 * currentLayer);
	// }

	let leftMiningAmount = enableTotalReward - totalReward;
	leftMiningAmount = leftMiningAmount>=0 ?leftMiningAmount : 0;
	
	// console.log("power:"+ totalPower +";reward:"+ totalReward + ";currentLayer: "+ currentLayer +";minerTotalPower:" + minerTotalPower + "; predictReword:"+userReward+";")

	if((totalReward + userReward) - enableTotalReward >= 0){
		enableMining = false;
	}else{
		enableMining = true;
	} */

	//console.log("enableMining:"+enableMining)

	/* if (blocks.length>10) {
		dispatch(contractSlice.update({blocks:blocks.splice(0,blocks.length-10)}))
	} */
	return (
		<Section>
			<OverPack always={false} style={{minHeight:851}}>
				<QueueAnim type="scale">
				<div key="a" className="content_wrapper bg_blue_9 radius">
					<div className="content_head">
						<table className="w-100 text-center text-white">
							<thead>
								<tr>
									<th className="pb-3">
										{L["BOX3_COL1"]}
									</th>
									<th className="pb-3">
										{L["BOX3_COL2"]}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="pb-3">
										# {contract.block.number}
									</td>
									<td className="pb-3">
										<div className="d-flex align-items-center justify-content-end">
											{contract.address ?  (contract._mineStatus ? L["MINING"] : L["WAIT_MINING"]) : '-'}
										</div>
									</td>
								</tr>
								<tr>
									<td className="pb-3">
										{contract._mineRewards ? contract._mineRewards + ' TLB' : '-'} 
									</td>
									<td className="pb-3">
										<div className="d-flex align-items-center justify-content-end">
										<img src={ImgCheck} alt="check" style={{height:'1.5em'}} />
										</div>
									</td>
								</tr>
								<tr>
									<td className="pb-3">
										{contract.block.hash ? contract.block.hash.slice(0,8)+'***'+contract.block.hash.slice(-4) : '-'}
									</td>
									<td className="pb-3">
										<div className="d-flex align-items-center justify-content-end">
										<img src={ImgCheck} alt="check" style={{height:'1.5em'}} />
										</div>
									</td>
								</tr>
								<tr>
									<td className="pb-3">
										{contract._mineLastTime ? TF(contract._mineLastTime) : '-'}
									</td>
									<td className="pb-3">
										<div className="d-flex align-items-center justify-content-end">
										<img src={ImgCheck} alt="check" style={{height:'1.5em'}} />
										</div>
									</td>
								</tr>
							</tbody>
						</table>
						
					</div>
					<div className="content_body mt-5">
						<h4 style={{marginBottom:20}}>
							{L["BOX3_TITLE1"]}
						</h4>
						<div className="cyan_btn_group row miner-buy">
							<div className="col-6 buy">
								<button onClick={()=>setStatus({...status, open:DLG_BUY, param:1})} className="btn w-100 cyan_btn text_cyan main_color">
									<h4 className="cyan_btn_bottom"><span>150T</span></h4>
									<div>{contract.minerTierPrice1 ? contract.minerTierPrice1.toFixed(2)+('U'+L["BOX3_BUTTON_TEXT"]) : '-'}</div>
								</button>
							</div>
							<div className="col-6 buy">
								<button onClick={()=>setStatus({...status, open:DLG_BUY, param:2})} className="btn w-100 cyan_btn text_cyan main_color">
									<h4 className="cyan_btn_bottom"><span>75T</span></h4>
									<div>{contract.minerTierPrice2 ? contract.minerTierPrice2.toFixed(2)+('U'+L["BOX3_BUTTON_TEXT"]) : '-'}</div>
								</button>
							</div>
							<div className="col-6 buy">
								<button onClick={()=>setStatus({...status, open:DLG_BUY, param:3})} className="btn w-100 cyan_btn text_cyan main_color">
									<h4 className="cyan_btn_bottom"><span>35T</span></h4>
									<div>{contract.minerTierPrice3 ? contract.minerTierPrice3.toFixed(2)+('U'+L["BOX3_BUTTON_TEXT"]) : '-'}</div>
								</button>
							</div>
							<div className="col-6 buy">
								<button onClick={()=>setStatus({...status, open:DLG_BUY, param:4})} className="btn w-100 cyan_btn text_cyan main_color">
									<h4 className="cyan_btn_bottom"><span>1T</span></h4>
									<div>{contract.minerTierPrice4 ? contract.minerTierPrice4.toFixed(2)+('U'+L["BOX3_BUTTON_TEXT"]) : '-'}</div>
								</button>
							</div>
						</div>
						
						<div className="content_body_body" style={{marginTop:10}}>
							<h4 className="text-center ">
								{L["BOX3_SEGMENT_TITLE"]}
							</h4>
							
							<div className="text-center mode-selector" style={{marginTop:10}}>
								<button className={"h4 btn "+(contract._mineType===0?'btn-primary mian-bg':'btn-light text-main')+" w-50 "}>{L["BOX3_SEGMENT1"]}</button>
								<button className={"h4 btn "+(contract._mineType===1?'btn-primary mian-bg':'btn-light text-main')+" w-50 "}>{L["BOX3_SEGMENT2"]}</button>
							</div>
							
							<div className="mt-5 text-center">
								{/* <p style={{fontSize:12,color:'#fff',opacity:.5,lineHeight:'110%'}}>
									{L['MAX_POWER_REWARD'].replace('{amount}',leftMiningAmount)}
								</p> */}
								<button disabled={contract._mineStatus || contract._minerTier===0 || contract._mineOverflow} onClick={()=>setStatus({...status, open:DLG_START})} className="h4 btn btn-primary w-100 rounded-pill" style={{ background: '#15b643' }}>{L["BOX3_START"]}</button>
							</div>

							<div className="d-flex mt-5">
								<div style={{marginRight:10}}>
									<button disabled={contract._minePending===0} onClick={()=>setStatus({...status, open:DLG_WITHDRAW})} className="h4 btn btn-muted w-100  border_cyan text-nowrap text_cyan round-button main_color">
										{L["BOX3_CLAIM"]}
									</button>
								</div>
								<div>
									{contract._mineOverflow ? <div style={{color:'red'}}>到达最大产量</div> : <div className="main_color">{L["TEXT_JOIN"]}<span className="">{contract._minePendingBlocks}</span>{L["TEXT_BLOCK"]}</div>}
									<div className="main_color">{L["TEXT_REWARD"]}<span className="">{contract._minePending}</span> TLB</div>
									{contract._mineType===0 ? <p className="text-white-50 tip">{L["BOX3_HELP"]}</p> : null}
								</div>
							</div>
							<div className="mt-4">
								<div className="radius mt-3">
								<div className="mining-log">
										{(contract._mineStatus && !contract._mineOverflow) ? blocks.map((v,k)=>(
											contract._mineLastBlock>v.number ? null : <ul key={k}>	
												<li className="p-2 p-md-4">
													<div className="td_wrapper  text-center text-white">
													# {v.number}
													</div>
												</li>
												<li className="p-2 p-md-4">
													<div className="td_wrapper  text-center text-white">
														<a href={Metamask.explorer+'/block/'+v.number} target="_blank">{v.hash.slice(0,4) + '...' + v.hash.slice(-4)}</a>
													</div>
												</li>
												<li className="p-2 p-md-4">
													<div className="td_wrapper text-center text-white">
														<span>
															{contract._mineBlockRewards} TLB
														</span>
													</div>
													<div className="icon-box"><img src={mineIcon} className="icon"></img></div>
												</li>
											</ul>
										)) : null}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				</QueueAnim>
			</OverPack>

			{status.open===DLG_BUY ? 		<BuyDialog 		handleClose={()=>setStatus({...status, open:0})} param={status.param} /> : null}
			{status.open===DLG_START ? 		<StartDialog 	handleClose={()=>setStatus({...status, open:0})} /> : null}
			{status.open===DLG_WITHDRAW ? 	<WithdrawDialog handleClose={()=>setStatus({...status, open:0})} /> : null}
		</Section>
	)
}

const Section5 = () => {
	const L = useSelector(state => state.contract.L);
	const legend = useRef(null);
	const chart = useRef(null);
	/* const [status,setStatus] = useState(false); */

	const contract = useSelector(state => state.contract);
	const data = [
		{val:contract.minerTier1, label:contract.minerTier1+"%", summary:L["BOX4_LABEL1"]},
		{val:contract.minerTier2, label:contract.minerTier2+"%", summary:L["BOX4_LABEL2"]},
		{val:contract.minerTier3, label:contract.minerTier3+"%", summary:L["BOX4_LABEL3"]},
		{val:contract.minerTier4, label:contract.minerTier4+"%", summary:L["BOX4_LABEL4"]}
	];
	
	useEffect(() => {
		if (legend && chart) {
            chart.current.actualSeries[0].legend = legend.current;
			if (chart.current.actualSeries && chart.current.actualSeries.length > 0) {
				let series = chart.current.actualSeries[0];
				series.selectedSlices.add(0);
			}
        }
	});
	return (
		<Section>
			<div key="a" className="content_wrapper bg_blue_9 radius overlay">
				<h4 className="text-end text_cyan main_color">{L["BOX4_TITLE"]}</h4>
				
				<div className="gauge">
					<div className="text">
						<img style={{ height: '3em' }} src={ImgTLB} alt="TLB" />
					</div>
					<IgrDoughnutChart 
						ref={chart}

						allowSliceExplosion="true" 
						width="100%" 
						height="300px">
						<IgrRingSeries
							dataSource={data}
							valueMemberPath="val"
							labelMemberPath="label"
							legendLabelMemberPath="summary"
							labelsPosition="OutsideEnd"
							labelExtent={30}
							radiusFactor={0.7}
							startAngle={30}
							name="series"

							brushes={['#ff0000', '#19b819', '#f55b08', '#a0a0a0']}
							outlines={['#ff0000', '#19b819', '#f55b08', '#a0a0a0']}
							labelOuterColor="white"
						/>
					</IgrDoughnutChart>
					
				</div>
				<div style={{display:'flex',justifyContent:'center', marginLeft:-15, marginRight: -15}}>
					<IgrItemLegend
						orientation="Horizontal"
						ref={legend}>
					</IgrItemLegend>
				</div>	
					
				<hr className="bg-white mx-n2 mx-md-n5" style={{ height: '1px', opacity: .5 }} />
				
				<div className="table_wrapper static-table">
					<table className="w-100 text-white">
						<thead className=" text-center">
							<tr>
								<th className="pb-4 pb-md-5 left" style={{paddingLeft:15}}>
									{L["BOX4_COL1"]}
								</th>
								<th className="pb-4 pb-md-5">
								{L["BOX4_COL2"]}
								</th>
								<th className="pb-4 pb-md-5">
								{L["BOX4_COL3"]}
								</th>
							</tr>
						</thead>
						<tbody className=" text-center">
							{contract.minerList.map((v,k)=>(<tr key={k}>
								<td className="pb-2 pb-md-3 left">
									<span style={{ background: '#FF0000' }} className="d-inline-block me-3 rounded-circle align-middle" ></span> 
									<a rel="noreferrer" href={Metamask.explorer+'/address/'+v[0]} target="_blank">{v[0].slice(0,8) + '...' + v[0].slice(-4)}</a>
								</td>
								<td className="pb-2 pb-md-3">
									{((contract.block.number - v[2]) * 100 / 9600).toFixed(2)} %
								</td>
								<td className="pb-2 pb-md-3">
									{(v[1] * 100 / contract.minerTotalPower).toFixed(2)} %
								</td>
							</tr>))}
						</tbody>
					</table>
				</div>
			</div>
		
		</Section>
	)
}

const Miner = ()=>{
	let contract = useSelector(state => state.contract);
	/* let history = useHistory(); */
	const dispatch = useDispatch()
	useEffect(() => {
		const data = {page:'miner'};
		if (!contract._minerReferer) {
			const url = window.location.pathname;
			const _minerReferer = url.slice(url.lastIndexOf('/')+1);
			data._minerReferer = _minerReferer;
		}
		dispatch(contractSlice.actions.update(data));
	});
	return (
		<>
			<Section1 />
			<Section2 />
			<Section3 />
			<Section4 />
			<Section5 />
		</>
	);
};

export default Miner;