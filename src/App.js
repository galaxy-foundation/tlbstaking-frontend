import {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch} from 'react-redux';
import { contractSlice } from './reducer';

import Loader from './components/Loader';
import Dialog from './components/Dialog';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Miner from './Miner';
import MLM from './MLM';
import Home from './Home';
import Metamask from './connectors/v2';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImgBg from './img/bg.webp'

const Style = styled.div`
	max-width: 1080px;
	margin: auto;
	background: url(${ImgBg}) center repeat;
`;


const blockTime = (Number(process.env.REACT_APP_BLOCKTIME) || 3)*1000;


function App() {
	/* const L = useSelector(state => state.contract.L); */
	const contract = useSelector(state => state.contract);
	const [status, setStatus] = useState({
		done: false,
		loading:true,
		pending:false,
		spent:0,
		invalidChain:false,
	})
	const dispatch = useDispatch();

	const accountChange = (newAccount)=>{
		setStatus({...status,loading:true});
		dispatch(contractSlice.actions.login(newAccount));
	}
	const connect = () => {
		setStatus({...status,pending:true});
		Metamask.connect().then((res)=>{
			Metamask.setHandler((address)=>accountChange(address),(chainid)=>chainChanged(chainid));
			
			const {address,chainId} = res;
			if (address) {
				dispatch(contractSlice.actions.login(address));
				setStatus({...status,pending:false,done:true});
			} else if(chainId) {
				setStatus({...status,pending:false,done:true});
			} else {
				setStatus({...status,pending:false,done:true});
			}
		})
	}
	const getContract = () => {
		setStatus({...status,pending:true});
		let time = +new Date();
		Metamask.getInfo(contract).then(res=>{
			dispatch(contractSlice.actions.update(res))
			const date = new Date();
			const hh = date.getHours();
			const mm = date.getMinutes();
			const ss = date.getSeconds();
			const spent = +new Date()-time;
			console.log((hh>9?'':'0')+hh+':'+(mm>9?'':'0')+mm+':'+(ss>9?'':'0')+ss + (spent?' spent: '+spent+'ms' : ''),res);
			setStatus({...status,loading:false,pending:false,spent});
		})
	}
	const chainChanged = (valid)=>{
		setStatus({...status,loading:true});
		if (valid) {
			setStatus({...status,loading:false});
		} else {
			setStatus({...status,loading:false});
			dispatch(contractSlice.actions.logout());
		}
	}
	useEffect(() => {
		let timer;
		if (!status.pending) {
			if (!contract.address && !status.done) {
				connect();
			}
			if (status.loading) {
				getContract();
			} else {
				let delay = status.spent ? blockTime - status.spent : blockTime;
				if (delay>3000) {
					delay = blockTime;
				} else if (delay<0) {
					delay = 10;
				}
				timer = setTimeout(()=>getContract(delay), delay)
			}
		}
		return () => timer && clearTimeout(timer);
	});
	return (
		<Router>
			<Style>
				{status.invalidChain?<Dialog>
					<div className="dialog">
						<h3 className="text-center">无效网络ID</h3>
					</div>
				</Dialog>:(
					status.loading ? <Loader></Loader> : <>
					<Header></Header>
					<menu className="m-0 p-0">
						<Switch>
							
							<Route exact path="/mlm/:referal" component={MLM}></Route>
							<Route exact path="/miner/:referal" component={Miner}></Route>
							<Route path="*" component={Home}></Route>
						</Switch>
					</menu>
					<Footer></Footer>
					</>	
				)}
			</Style>
			<ToastContainer />
		</Router>
	);
}

export default App;
