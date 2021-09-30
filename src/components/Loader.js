import React from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';

import Logo from '../img/logo.svg'
import loadingBg from '../img/loading-bg.webp'

const LoaderDiv = styled.div`
	position: relative;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	
	.logo-overlay {
		position: absolute;
		height: 100vh;
		width: 100%;
		background: url(${Logo}) center bottom / contain no-repeat;
		opacity: 0.02;
	}

	.logo {
		height: 180px;
		@media (max-width: 767px) {
			height: 130px;
			@media (max-width: 575px) {
				height: 90px;
			}
		}
	}
	.content_loading_animate{
		span{
			opacity: 0;
			animation: .5s linear animateLoading infinite;
			&:nth-child(1){
				animation-delay: .1s;
			}
			&:nth-child(1){
				animation-delay: .2s;
			}
			&:nth-child(1){
				animation-delay: .3s;
			}
			&:nth-child(1){
				animation-delay: .4s;
			}
			@keyframes animateLoading {
				0%{
					opacity: 0;
				}
				100%{
					opacity: 1;
				}
			}
		}
	}
	.loading-bg{
		position:fixed;
		width:100%;
		height:100%;
		z-index:0;
	}
	.loading-content{
		z-index:1;
		position:fixed;
		width:100%;
		height:100%;
		.loading-text-box{
			position:fixed;
			bottom:20px;
			width:100%;
			.loader_content *{
				text-align:center;
			}
		}
	}
`

export default function(props) {
	const L = useSelector(state => state.contract.L);
	return (<LoaderDiv>
		<img className="loading-bg" src={loadingBg} alt="" style={{height:'100%',width:'100%'}}/>
		<div className="loading-content">
			<div className="loading-text-box">
				<div className="loader_content ms-2 ms-md-5">
					<h2 className="text_cyan">
						TLBstaking
					</h2>
					<h3 className="text-white content_loading_animate">
						{L["TEXT_LOADING"]}<span>.</span><span>.</span><span>.</span><span>.</span>
					</h3>
				</div>
			</div>
		</div>
	</LoaderDiv>)
};