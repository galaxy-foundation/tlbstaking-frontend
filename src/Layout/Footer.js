import React from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';

import ImgWechat from '../img/social-wechat.webp'
import ImgGoogle from '../img/social-google.webp'
import ImgYoutube from '../img/social-youtube.webp'
/* import intl from 'react-intl-universal'; */

const Footer = styled.footer`
	.social_row {
		@media (max-width: 991px) {
			img {
				height: 30px;
				@media (max-width: 767px) {
					height: 25px;
					@media (max-width: 400px) {
						height: 20px;
					}
				}
			}
		}
	}
	.copyright{
		font-size:12px;
		font-weight:100;
		opacity:.5;
	}
	.border-top,.border-bottom{
		border-color:rgba(255,255,255,.5) !important;
	}
	.linktitle{
		font-size:12px;
		font-weight:100;
	}
`

export default function(props) {
	const L = useSelector(state => state.contract.L);
	return (
		<Footer className="mt-3 mt-md-5">
			<div className="social_row text-white px-3 px-md-5 py-2 border-top border-bottom d-flex align-items-center">
				<h6 className="mb-0 me-3 linktitle">
				{L['FOOTER_LINK']}：
				</h6>
				<ul className="ad list-unstyled flex-grow-1 m-0 p-0 d-flex align-items-center justify-content-between">
					<li>
						<a href="#">
							<i className="fab fa-facebook text-white"></i>
						</a>
					</li>
					<li>
						<a href="#">
							<i className="fab fa-twitter text-white"></i>
						</a>
					</li>
					<li>
						<a href="#">
							<i className="fab fa-linkedin-in text-white"></i>
						</a>
					</li>
					<li>
						<a href="#">
							<i className="fab fa-tumblr text-white"></i>
						</a>
					</li>
					<li>
						<a href="#">
							<img src={ImgWechat} alt="wechat" />
						</a>
					</li>
					<li>
						<a href="#">
							<img src={ImgGoogle} alt="google" />
						</a>
					</li>
					<li>
						<a href="#">
							<img src={ImgYoutube} alt="youtube" />
						</a>
					</li>
				</ul>
			</div>
			<p className="text-white text-center font_size_29 py-3 py-md-5 px-3 px-md-5 mb-0 copyright">
				Copyright © 2021 TLBstaking inc
			</p>
		</Footer>
	);
}
