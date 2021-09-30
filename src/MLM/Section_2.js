import React from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';

import ImgIntro from '../img/intro.webp'

import { OverPack } from 'rc-scroll-anim';
import Texty from 'rc-texty';
/* import intl from 'react-intl-universal'; */


const Section = styled.section`
	.content_wrapper {
		position: relative;
		z-index: 1;
		position: relative;
		text-align: justify;
		font-size:12px;
		@media (max-width: 991px) {
			padding: 40px;
			@media (max-width: 575px) {
				padding: 30px;
			}
		}
		&::before {
			content: "";
			top: 0;
			left: 0;
			position: absolute;
			width: 100%;
			height: 100%;
			background: #191f34 url(${ImgIntro}) right center/cover no-repeat;
			background-blend-mode: exclusion;
			opacity: 0.2;
			pointer-events: none;
			z-index: -1;
		}
	}
`

function Section_2(props) {
	const L = useSelector(state => state.contract.L);
	return (
		<Section className="">
			<OverPack always={false}  style={{minHeight:30}}>
				<h3 className="mb-3 mb-md-5"><Texty>{L['TITLE_2']}</Texty></h3>
			</OverPack>
			
			<div className="content_wrapper" style={{minHeight:231}}>
				<OverPack always={false} >
				<div>
					<Texty>
					{L['CONTENT_2']}
					</Texty>
				</div>
				</OverPack>
				
			</div>
			
		</Section>
	);
}
export default Section_2;