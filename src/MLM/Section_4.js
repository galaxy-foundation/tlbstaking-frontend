import React from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';
import ImgWhitepaper from '../img/whitepaper.webp'
import ImgFairy1 from '../img/fairy1new.webp'
import ImgFairy2 from '../img/fairy2new.webp'

import Texty from 'rc-texty';
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
/* import intl from 'react-intl-universal'; */

const Section = styled.section`
	margin-top: 0px;
	padding-right: 0;
	padding-top: 0px;
	overflow: hidden;
	h3 {
		margin-top: 100px;
		margin-bottom: 100px;
	}
	img {margin-right: -15px}
	button.h2 {
		margin-top: 100px;
	}
	.content_mt {
		margin-top: -300px;
		@media (max-width: 767px) {
			margin-top: -150px;
		}
	}
	.download-whitepaper{
		margin-top:5px;
		border-radius:0;
	}
	.image-bg{
		margin-top:-50px;
	}
`;


function Section_4(props) {
	const L = useSelector(state => state.contract.L);
	return (
		<Section>
			<OverPack always={false}  style={{minHeight:50}}>
				<h3 className="text-center"><Texty>{L['TITLE_4']}</Texty></h3>
			</OverPack>
			<div className="content_wrapper" style={{minHeight:441.89}}>
				<OverPack always={false} >
					<div style={{minHeight:58.75}}>
						<QueueAnim  type={['scale']}>
							<div className="row justify-content-center me-2" key="part1">
								<div key="part1" className="col-6 col-md-5 h-auto">
									<a className="h-100 bg-white d-inline-block btn btn-muted" href="/blueberry_audit_report_in_chinese.pdf" target="_blank">
										<img className="w-100 img_contain" src={ImgFairy1} alt="fairyproof" />
									</a>
								
								</div>
								<div key="part2" className="col-6 col-md-5 h-auto">
								
									<a className="h-100 bg-white d-inline-block btn btn-muted" href="/knownsec_audit_report.pdf" target="_blank">
										<img className="w-100 img_contain" src={ImgFairy2} alt="" />
									</a>
								</div>
							</div>
						</QueueAnim>
					</div>
					<QueueAnim  type={['scale']}>
					<div className="mt-5" key="part1">
						<div className="h5 btn rounded-0 btn-muted text-white shadow-0 border " style={{opacity:0}}>
							{L['CONTENT_4_WHITEPAPER']}
						</div>
						<img className="w-100 image-bg" src={ImgWhitepaper} alt="tl_img" />
					</div>
					</QueueAnim>
					
				</OverPack>

			</div>
			<div className="content_mt" style={{minHeight:95}}>
				<OverPack always={false} >
					<QueueAnim  type={['scale']}>
					<div key='a'>
						<button className="h5 btn btn-muted shadow-0 border text-white d-inline-block rounded-0" >
						{L['CONTENT_4_REPORT']}
						</button>
					</div>
					<div key='b'>
						<a href="/whitepaper.pdf" className="download-whitepaper h5 d-inline-block btn btn-muted text-black gradient_bg" target="_blank">
						{L['CONTENT_4_DOWNLOAD']}
						</a>
					</div>
					</QueueAnim>
				</OverPack>		
			</div>
		</Section>
	);
}

export default Section_4;