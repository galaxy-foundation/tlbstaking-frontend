// import React from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';
import {NF,TF} from '../util';
import { OverPack } from 'rc-scroll-anim';
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
/* import intl from 'react-intl-universal'; */

const Section = styled.section`
	h3 {
		margin-top: 50px;
	}
	.content_wrapper {
		z-index: 1;
		position: relative;
		.custom_table{
			tbody{
				td{
					padding-top: 20px;
				}
			}
		}
	}
	table tr td{font-size:12px;}
`

function Section_9(props) {
	const L = useSelector(state => state.contract.L);
	let contract = useSelector(state => state.contract);
	return (
		<Section>
			{
				contract.pending.length ? <>
					<h3 className="text-center"></h3>
					<OverPack always={false} >
					<h4 className="text-center"><Texty>{L["TEXT_MY_ORDER"]}</Texty></h4>
					</OverPack>
					<div className="content_wrapper p-0 p-md-5 mb-5">
					<OverPack always={false} >
						<div>
							<QueueAnim type="scale">
								<div key="a">
									<table className="w-100  text-center custom_table custom_table_style">
										<thead>
											<tr >
												<td className="bg_blue_9 py-2 py-md-3 radius_left_side_pill">
													{L["CONTENT_9_COL3"]}
												</td>
												<td className="bg_blue_9 py-2 py-md-3">
													{L["CONTENT_9_COL2"]}
												</td>
												<td className="bg_blue_9 py-2 py-md-3 radius_right_side_pill">
													{L["CONTENT_9_COL4"]}
												</td>
											</tr>
										</thead>
										<tbody>
											{contract.pending ? (
												contract.pending.map(v=><tr key={v[0]}>
													<td>{v[0]}</td>
													<td>{v[1]===0?L["TEXT_BUY"]:L["TEXT_SELL"]}</td>
													<td>{v[2].toFixed(2) + '/' + v[3].toFixed(2)} {v[1]===0?'USDT':'TLB'}</td>
												</tr>)
											) : null}
										</tbody>
									</table>
								</div>
							</QueueAnim>
						</div>
					</OverPack>
					</div>
				</>  : null
			}
			<OverPack always={false}  style={{minHeight:30}}>
			<h3 className="text-center"><Texty>{L["TITLE_9"]}</Texty></h3>
			</OverPack>
			<OverPack always={false}  style={{minHeight:20}}>
			<h4 className="text-center" style={{opacity:.5,fontWeight:100,marginBottom:15}}><Texty>{L["TITLE_9_SUB"]}</Texty></h4>
			</OverPack>
			<div className="content_wrapper p-0 p-md-5">
			<OverPack always={false} >
				<div style={{minHeight:200}}>
					<QueueAnim type="scale">
						<div key="a">
							<table className="w-100  text-center custom_table custom_table_style">
								<thead>
									<tr >
										<td className="bg_blue_9 py-2 py-md-3 radius_left_side_pill">
										{L["CONTENT_9_COL1"]}
										</td>
										<td className="bg_blue_9 py-2 py-md-3">
										{L["CONTENT_9_COL2"]}
										</td>
										<td className="bg_blue_9 py-2 py-md-3">
										{L["CONTENT_9_COL3"]}
										</td>
										<td className="bg_blue_9 py-2 py-md-3 radius_right_side_pill">
										{L["CONTENT_9_COL4"]}
										</td>
									</tr>
								</thead>
								<tbody>
									{contract.orders ? (
										contract.orders.map(v=><tr key={v[0]}>
											<td>{v[0]}</td>
											<td>{v[1]===0?L["TEXT_BUY"]:L["TEXT_SELL"]}</td>
											<td>{TF(v[3])}</td>
											<td>{NF(v[2])} TLB</td>
										</tr>)
									) : null}
								</tbody>
							</table>
						</div>
					</QueueAnim>
				</div>
			</OverPack>
			</div>
		</Section>
	);
}

export default Section_9;