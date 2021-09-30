/* import React,{useEffect} from 'react'; */
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';
/* import { contractSlice } from '../reducer'; */
import Metamask from '../connectors/v2';
import {NF} from '../util';
import ImgLogo from '../img/logo.svg'

import { OverPack } from 'rc-scroll-anim';
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
import logo from '../img/logo-homepage.webp'

import {IgrCategoryChart, IgrCategoryChartModule} from 'igniteui-react-charts';
/* import intl from 'react-intl-universal'; */
IgrCategoryChartModule.register();

const Section = styled.section`
	.wallet{
		border-radius:20px;
	}
	padding-top: 30px;
	position: relative;
	@media (max-width: 991px) {
		padding-top: 20px
	}
	@-webkit-keyframes rotation{
		from {-webkit-transform: rotate(0deg);}
		to {-webkit-transform: rotate(360deg);}
	}
	.imgRotate{
		-webkit-transform: rotate(360deg);
		animation: rotation 0.4s linear infinite;
		-moz-animation: rotation 0.4s linear infinite;
		-webkit-animation: rotation 0.4s linear infinite;
		-o-animation: rotation 0.4s linear infinite;
	}
	
		


	&::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		background: #080e23 url(${ImgLogo}) center center/contain no-repeat;
		top: 0;
		left: 0;
		opacity: 0.5;
		mix-blend-mode: saturation;
		pointer-events: none;
	}
	.wallet-panel {
		margin-bottom: 30px;
		text-align: right;
	}
	.desc {
		margin-top: 50px;
		text-align: center;
		color: white;
	}
	h3 {
		text-align: center;
	}
	div.address {
		&.btn  {
			text-transform: none;
		}
	}
	.page-title{
		margin-top:20px;
	}
	.echart-box{
		pointer-events:none;
	}
	.echart-text{
		font-size:12px;
		font-weight:bold;
	}
	p{
		font-size:14px;
	}
	.intro{
		div{
			font-size:12px;
			padding-bottom:5px;
		}
	}
	.logo{
		width:100%;
		img{
			width:250px;
			margin:0 auto;
		}
	}
	.gradient_bg {
		background: linear-gradient(-43deg, #1ABC62, #2AFDEF);
		padding:2px 15px !important;
		opacity:.8;
	}
	.title-logo-box{
		.logo{
			img{
				width:100%;
				margin:0 auto;
				max-width:360px;
			}
		}
	}
`

function Section_1(props) {
	const L = useSelector(state => state.contract.L);
	let contract = useSelector(state => state.contract);
	const dispatch = useDispatch();
	const connectWallet = () => Metamask.connect(dispatch);
	
	const chart = {
		min: -1000,
		max: 0,
		data: []
	};
	contract.tvls.map(v=>{
		if (v[1] && chart.max < v[1]) {
			chart.max = v[1];
		}
		if (chart.min===-1000) {
			chart.min = v[1];
		} else if (chart.min>v[1]) {
			chart.min = v[1];
		}
		chart.data.push({x:v[0],y:v[1]})
	});
	chart.data.push({
		x: contract.block.time,
		y: contract.totalDeposit
	});
	let bull = 0, past = 0;
	if (contract.tvls.length) {
		const org = contract.tvls.length<24 ? 1000 : contract.tvls[0][3];
		bull = Math.round((contract.price*1e4 - org)*1e4/org)/100;
		past = Math.ceil((new Date().getTime()/1000 - contract.tvls[0][0])/3600);
	}
	if (contract.totalDeposit && chart.max < contract.totalDeposit) {
		chart.max = contract.totalDeposit;
	}
	//console.log(chart.data)

	return (
		<Section>
			<div className="text-center">
				<div className="wallet-panel">
					{contract.address? (
						<div className="wallet address btn gradient_bg text-white">
							{contract.address.slice(0,8)+'***'+contract.address.slice(-4) }
						</div>
					) : (
						<button onClick={connectWallet} className="wallet btn bg-warning text-white">
							{L['TEXT_CONNECT']}
						</button>
					)}
				</div>
				
				
				
				<QueueAnim delay={800} type="scaleBig">
					<div key="a">
						<div className="logo">
							<img src={logo} className="imgRotate"></img>
						</div>
					</div>
					<div key="b">
						<h2 className="text-white page-title" style={{letterSpacing:'5px'}}>
						{L['PAGE_TITLE']}
						</h2>
					</div>
				
				</QueueAnim>
				
				<br />
				<OverPack always={false} style={{height:35}}>
				<h2 className="text_red">
					<Texty>
						{contract.totalDeposit ? '$ ' + NF(contract.totalDeposit) : '-'}
					</Texty>
				</h2>
				</OverPack>
				
			</div>
			<div style={{marginLeft:-15,marginRight:-15,overflow:'hidden'}}>
				<div className="echart-box" style={{marginLeft:0,marginRight:0,pointerEvents:false}}>
				<IgrCategoryChart
					height="200px"
					width="100%"
					chartType="Spline"
					dataSource={chart.data}
					xAxisFormatLabel={(item)=>{
						const date = new Date(item.x * 1000);
						// const month = date.getMonth() + 1;
						// const day = date.getDate() + 1;
						const h = date.getHours();
						const m = date.getMinutes();

						return (h>9?'':'0') + h + ':' + (m>9?'':'0') + m;

						//return (h>9?'':'0') + h + ':' + (m>9?'':'0') + m;
					}}
					yAxisFormatLabel={item=>{
						if(item < 0){
							item = 0;
						}
						return item<1000 ? Math.ceil(item/100)*100 : Math.ceil(item/100)/10 + "K";

						//return (h>9?'':'0') + h + ':' + (m>9?'':'0') + m;
					}}
					yAxisMinimumValue={chart.min-(chart.max-chart.min)/5}
					yAxisMaximumValue={chart.max+(chart.max-chart.min)/5}
					yAxisInterval={(chart.max-chart.min)/5}
					//includedProperties={['x','y']}
					thickness={1}
				/>
				</div>
			</div>
			<OverPack  always={false} style={{height:25}}>
				<QueueAnim>
					<div key="part1">
					<span className="text-end d-block echart-text">
					
					<span className="text_cyan">+{contract.price} TLBstaking {bull? `(+${bull}%)` : ''} </span> <span>{bull? L['LAST_24HOURS'].replace('{hour}',past) : ''}</span>
					
					</span>
					</div>
				</QueueAnim>
			</OverPack>

			
			<div className="desc" style={{height:130}}>
				<OverPack always={false}  style={{height:30}}>
					<h3 className="mb-4 mb-md-5">
						<Texty>{L['TITLE_1']}</Texty>
					</h3>
				</OverPack>
				<div class="intro" style={{height:82}}>
					<OverPack always={false}  style={{height:82}}>
						<QueueAnim>
							<div key="part1">{L['CONTENT_1_1']}</div>
							<div key="part2">{L['CONTENT_1_2']}</div>
							<div key="part3">{L['CONTENT_1_3']}</div>
						</QueueAnim>
					</OverPack>
				</div>
			</div>
			
		</Section>
	);
}

export default Section_1;