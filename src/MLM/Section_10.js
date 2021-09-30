import React from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';

import ImgTLB from '../img/tlb.svg'
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
/* import intl from 'react-intl-universal'; */

const Section = styled.section`
	margin-top: 0;
	.summary {
		padding: 30px;
		font-size:12px;
	}
	.content_wrapper_body {
		position: relative;
		&::after {
			content: "";
			position: absolute;
			top: 45%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 350px;
			height: 350px;
			background: #080E23 url(${ImgTLB}) center/auto 60% no-repeat;
			border-radius: 50%;
			@media (max-width: 991px) {
				width: 300px;
				height: 300px;
				@media (max-width: 767px) {
					width: 200px;
					height: 200px;
					@media (max-width: 575px){
						width: 120px;
						height: 120px;
					}
				}
			}
		}

		[class*="col"] {
			margin-bottom: 45px;
			@media (max-width: 767px) {
				margin-bottom: 20px;
				@media (max-width: 575px) {
					margin-bottom: 15px;
				}
			}
			.col_wrapper {
				height: 200px;
				display: flex;
				justify-content: center;
				align-items: center;
				p{
					font-size:12px !important;
					text-align:center;
				}
				@media (max-width: 575px) {
					height: 120px;
				}
			}
		}
	}
	.bg-aboutus{
		background-color:#072A1A !important;
	}
`


function Section_10(props) {
	const L = useSelector(state => state.contract.L);
	return (
		<Section>
			<OverPack always={false}  style={{minHeight:130}}>
				<QueueAnim>
					<div key="a">
						<h3 className="text-center">
							{L["TITLE_10"]}
						</h3>
					</div>
					<div className="summary" key="b">
						{L["CONTENT_10"]}
					</div>
				</QueueAnim>
			</OverPack>
			<div className="content_wrapper content_wrapper_body" style={{marginLeft:-15,marginRight:-15}}>
				<div className="row justify-content-between">
					<div className="col-6 col-md-5">
						<div className="col_wrapper bg_blue_deep p-3 bg-aboutus">
							<OverPack always={false} >
								<QueueAnim type="scale">
								<div key="a">
									<p>
										{L["CONTENT_10_SECTION1"]}
									</p>
								</div>
								</QueueAnim>
							</OverPack>
						</div>
					</div>
					<div className="col-6 col-md-5">
						<div className="col_wrapper bg_blue_deep p-3 bg-aboutus">
							<OverPack always={false} >
								<QueueAnim type="scale">
									<div key="a">
										<p>
										{L["CONTENT_10_SECTION2"]}
										</p>
									</div>
								</QueueAnim>
							</OverPack>
						</div>
					</div>
					<div className="col-6 col-md-5">
						<div className="col_wrapper bg_blue_deep p-3 bg-aboutus">
							<OverPack always={false} >
								<QueueAnim type="scale">
									<div key="a">
										<p style={{marginTop:30}}>
										{L["CONTENT_10_SECTION3"]}
										</p>
									</div>
								</QueueAnim>
							</OverPack>
						</div>
					</div>
					<div className="col-6 col-md-5">
						<div className="col_wrapper bg_blue_deep p-3 bg-aboutus">
							<OverPack always={false} >
								<QueueAnim type="scale">
									<div key="a">
										<p style={{marginTop:20}}>
										{L["CONTENT_10_SECTION4"]}
										</p>
									</div>
								</QueueAnim>
							</OverPack>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}

export default Section_10;