import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import App from './App';
import { Provider } from 'react-redux';
import store from './store'
/* import { Router } from 'react-router-dom'; */
import reportWebVitals from './reportWebVitals';
import './index.css';

if ('ethereum' in window) {
	window.ethereum.autoRefreshOnNetworkChange = false
}

const Style = styled.div`
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type="number"] {
		-moz-appearance: textfield;
	}
	// text color
	.text_red {
		color: #cc0000;
	}
	.fill_white {
		fill: white;
	}
	.text_cyan {
		color: #13B643 !important;
	}

	.text_6 {
		color: #666666;
	}
	.text_yellow {
		color: #ffd249;
	}
	.text_9 {
		color: #999999;
	}
	.text_blue {
		color: #5878a5;
	}
	.text_yellow_50 {
		color: #999933;
	}
	.bg_cyan {
		background: #13B643;
	}
	.bg_cyan2 {
		background: #13B643;
	}
	.bg_blue_deep {
		background: #0c1b44;
	}
	.bg_a4 {
		background: #a4a5a7;
	}
	.bg_yellow_50 {
		background: #999933;
	}
	.bg_9 {
		background: #999999;
	}
	.bg_blue {
		background: #1b50c7;
	}
	.bg_blue_50 {
		background: rgba(57, 62, 79, 0.5);
	}
	.bg_blue_9 {
		background: rgba(52, 57, 75, 0.9);
	}
	.bg_yellow {
		background: #ffd249;
	}
	.gradient_bg {
		background: linear-gradient(-43deg, #21e2b8, #28b3e6);
	}
	//  bg

	.bg_transparent {
		background: transparent !important;
	}
	// height and width


	.line_height_int {
		line-height: initial;
	}

	// radious
	.radius_30 {
		border-radius: 30px;
	}
	.radius_left_side_pill {
		border-radius: 50px 0 0 50px;
	}
	.radius_right_side_pill {
		border-radius: 0 50px 50px 0;
	}
	// others

	.input_focus_off:focus-visible {
		outline: none;
	}
	.pill_max {
		$pill_color: #3399cc;
		color: $pill_color;
		border: 2px solid $pill_color;
	}
	.img_contain {
		object-fit: contain;
	}
	.top_bottom_cyan_border {
		position: relative;
		&::before {
			content: "";
			position: absolute;
			width: 90%;
			height: 2px;
			top: 0;
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
		&::after {
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
	.border_cyan {
		border: 1px solid #13B643;
	}

	// btn group.....
	.cyan_btn_group {
		.cyan_btn {
			border: 1px solid #1c79a5;
			overflow: visible !important;
			position: relative;
			background: rgba(48, 64, 96, 0.357);
			&::before {
				content: "";
				position: absolute;
				width: 90%;
				height: 4px;
				top: -25px;
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
				&::before {
					content: "";
					position: absolute;
					width: 90%;
					height: 3px;
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

	.custom_dropdown{
		&>button{
			&::after{
				display: none;
			}
		}
		ul>li>a{
			background: transparent;    
			&:hover{
				background: rgba(8, 14, 35, 0.315);
			}
		}
	}
`;

ReactDOM.render(
	<Provider store={store}>
			<React.StrictMode>
				<Style>
					<App />
				</Style>
			</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
