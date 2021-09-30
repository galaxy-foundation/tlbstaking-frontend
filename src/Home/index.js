import {useState} from 'react';
import styled from 'styled-components';
import { contractSlice } from '../reducer';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';

import Metamask from '../connectors/v2';

const Section = styled.section`
	width: 100vw;
	height: 90vh;
	.dialog {
		.title{
			font-size:14px;
		}
		.btn-area{
			margin-top:50px;
		}
		.info{
			font-size:12px;color:#ccc;
			margin-top:5px;
		}
		input{
			font-size:16px;
			border-radius:6px;
			padding:10px 5px !important;
			background-color:#000;
			color:#13B643;
			font-weight:bold;
		}
		position: fixed;
		width: 80%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(57,57,58,.8);
		border-radius: 6px;
		padding: 20px;
		box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
		z-index: 100;
		@media (max-width: 768px) {
			width: 600px;
		}
		@media (max-width: 576px) {
			width: 90%;
		}
	}
`;


const HomePage = () => {
	const [value,setValue] = useState('');
	const [error,setError] = useState('');
	const dispatch = useDispatch()
	/* const contract = useSelector(state => state.contract); */
	let history = useHistory();
	const valueChanger = (e) => {
		if (!value) return setError(L['ERROR_ADDRESS_INPUT'])
		if (!Metamask.validAddress(value)) return setError(L['ADDRESS_ERROR']);
		dispatch(contractSlice.actions.update({referer:value}));
		history.push("/mlm/"+value);
	}
	const L = useSelector(state => state.contract.L);
	
	return (
		<Section>
			<div className="dialog">
				<div className="form-group">
					<span className="text-white-50 title">{L['RECOMMEND_TITLE']}</span>
				</div>
				<div className="form-group mb-4">
					<input onChange={(e)=>setValue(e.target.value)} placeholder={L['RECOMMEND_PLACEHOLDER']} className="w-100 p-3" value={value} />
					<div className="text-danger">{error}</div>
					<p className="info">{L['RECOMMEND_HELP']}</p>
				</div>
				<div className="text-center btn-area">
					<button onClick={()=>valueChanger()} className="h4 btn btn-block px-5 border text-white">
						{L['TEXT_CONFIRM']}
					</button>
				</div>
			</div>
		</Section>
	)
}
  
export default HomePage;