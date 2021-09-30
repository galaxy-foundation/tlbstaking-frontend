// import React,{useEffect} from 'react';
import styled from 'styled-components';
import { useSelector} from 'react-redux';

import {NF,copyToClipboard} from '../util';
import ImgWave from '../img/wave.webp'
import { OverPack } from 'rc-scroll-anim';
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
/* import intl from 'react-intl-universal'; */

const Section = styled.section`
	position: relative;
	&::before {
		content: "";
		width: 100%;
		height: 33%;
		position: absolute;
		top: -65px;
		right: 0;
		background: #080e23 url(${ImgWave}) center/cover no-repeat;
		background-blend-mode: screen;
	}
	h3 {
		margin-top: 100px;
		color: white;
		text-align: center;
	}
	.content_wrapper {
		z-index: 1;
		position: relative;
		.custom_table {
			&.custom_table_style {
				border-collapse: separate;
				border-spacing: 10px;
				td {
					background: #393e4f;
					&:first-of-type {
						border-radius: 25px 0 0 25px;
					}
					&:last-of-type {
						border-radius: 0 25px 25px 0;
					}
				}
			}
		}
	}
`

function Section_7(props) {
	const L = useSelector(state => state.contract.L);
	let contract = useSelector(state => state.contract);
	
	
	return (
		<Section>
			<div className="content_wrapper p-0 p-md-5" style={{minHeight:330,marginTop:-50}}>
				<OverPack always={false} >
				<h3><Texty>{L['TITLE_7']}</Texty></h3>
				</OverPack>
				<OverPack always={false} >
					<QueueAnim type="scale">
						<div key="a">
							<table className="w-100 text-center custom_table custom_table_style">
								<tbody>
									<tr>
										<td style={{maxWidth:100}}>{L['CONTENT_7_LABEL1']}</td>
										<td style={{minWidth:100}}>{contract._userid ? contract._userid : '-' }</td>
									</tr>
									<tr>
										<td>{L['CONTENT_7_LABEL2']}</td>
										<td onClick={()=>copyToClipboard('https://'+window.location.host+'/mlm/'+contract.address || '')}>{contract.address ? contract.address.slice(0,8)+'***'+contract.address.slice(-4) : '-' } <span class="text-white-50">{L['TEXT_COPY']}</span></td>
									</tr>
									<tr>
										<td>{L['CONTENT_7_LABEL3']}</td>
										<td>{contract._withdrawal ? NF(contract._withdrawal) + 'USDT' : '-'}</td>
									</tr>
									<tr>
										<td>{L['CONTENT_7_LABEL_BALANCE']}</td>
										<td>{contract._balance ? NF(contract._balance) + 'USDT' : '-'}</td>
									</tr>
									<tr>
										<td>{L['CONTENT_7_LABEL4']}</td>
										<td>{contract._limit ? NF(contract._limit) + 'USDT' : '-'}</td>
									</tr>
									<tr>
										<td>{L['CONTENT_7_LABEL5']}</td>
										<td>{contract._children || '-'}</td>
									</tr>
									<tr>
										<td>{L['CONTENT_7_LABEL6']}</td>
										<td>{contract._contribution ? NF(contract._contribution) : '-'}</td>
									</tr>
									<tr>
										<td>{L['CONTENT_7_LABEL7']}</td>
										<td>{contract._deposit ? NF(contract._deposit) : '-'}</td>
									</tr>
									<tr>
										<td>静态收益</td>
										<td>{contract._staticRewards ? NF(contract._staticRewards) + 'USDT' : '-'}</td>
									</tr>
									<tr>
										<td>动态收益</td>
										<td>{contract._dynamicRewards ? NF(contract._dynamicRewards) + 'USDT' : '-'}</td>
									</tr>
									{contract._rewards ? <tr>
										<td>节点奖励</td>
										<td>{contract._rewards ? NF(contract._rewards) + 'USDT' : '-'}</td>
									</tr> : null}
									<tr>
										<td>{L['CONTENT_7_LABEL8']}</td>
										<td>{contract._overflowed ? <span className="text-danger">{L['TEXT_EXPLODE']} {(contract._staticRewards+contract._dynamicRewards+contract._rewards).toFixed(2) + 'USDT'}</span> : (contract._withdrawable ? NF(contract._withdrawable) : '-')}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</QueueAnim>
				</OverPack>
			</div>
		</Section>
	);
}

export default Section_7;