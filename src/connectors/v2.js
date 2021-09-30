/* import Web3 from 'web3'; */
import JSBI from 'jsbi';

import abiTlb from '../config/TLBStaking-v2.json';
import abiErc20 from '../config/erc20-v2.json';
import config from '../config/v2.json';

const TEN = JSBI.BigInt(10);

const blockExplorer = process.env.REACT_APP_BLOCK_EXPLORER;
const blockTime = (Number(process.env.REACT_APP_BLOCKTIME) || 3)*1000;
const chainId = Number(process.env.REACT_APP_CHAIN_ID);
const contractUsdt = config[chainId].usdt.contract;
const precisionUsdt = config[chainId].usdt.precision;
const contractTlb = config[chainId].tlb.contract;
const precisionTlb = config[chainId].tlb.precision;

const api = process.env.REACT_APP_SERVER;

export default class Metamask {
	static explorer = blockExplorer;
	static contract = contractTlb;
	static precisionUsdt = precisionUsdt;
	static precisionTlb = precisionTlb;
	static cbAccountsChanged = null;
	static cbChainChanged = null;

	static setHandler(cbAccountsChanged,cbChainChanged) {
		const {ethereum} = window;
		if (ethereum) {
			if (this.cbAccountsChanged===null) {
				this.cbAccountsChanged = cbAccountsChanged;
				ethereum.on('accountsChanged', (accounts) => {
					if (accounts.length) {
						this.cbAccountsChanged(accounts[0])
					} else {
						this.cbAccountsChanged(null);
					}
				});
			}
			ethereum.on('chainChanged', (currentChainId) => {
				cbChainChanged(currentChainId===chainId)
			});
		}
	}
	static connect() {
		return new Promise(resolve=>{
			
			const {ethereum} = window;
			if (ethereum) {
				try {
					ethereum.request({ method: 'eth_requestAccounts' }).then(async (accounts)=>{
						if (accounts.length) {
							const address = accounts[0];
							const currrentChainId = await this.getChainId();
							if (chainId===currrentChainId) {
								resolve({address,chainId:currrentChainId});	
							} else {
								resolve({address:null,chainId:currrentChainId});
								// console.log(`🦊 Invalid chainid. expected [${chainId}]`);
								// resolve(null);
							}
							
						} else {
							console.log("🦊 No selected address.");
							resolve({address:null,chainId:null});	
						}
					})
				} catch (error) {
					console.log("🦊 Connect to Metamask using the button on the top right.");
					resolve({address:null,chainId:null});	
				}
			} else {
				console.log("🦊 You must install Metamask into your browser: https://metamask.io/download.html");
				resolve({address:null,chainId:null});	
			}
		})
	}
	static graphql(query) {
		return new Promise(async resolve=>{
			try {
				let response = await fetch(api+'/graphql', {
				// let response = await fetch('https://tlbstaking.com/graphql', {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					  'Accept': 'application/json',
					},
					body: JSON.stringify(query)
				});
				let data = await response.json();
				resolve(data);
				/* resolve(JSON.parse(data.data.contract)); */
			} catch (err) {
				console.log(err);
				resolve(null);
			}
		})
	}
	static async getChainId() {
		const {ethereum} = window;
		if (ethereum) return Number(await ethereum.request({ method: 'eth_chainId' }));
		return 0;
	}
	static get isConnected() {
		return window.ethereum && window.ethereum.isConnected();
	}
	
	static validAddress(address) {
		const {Web3} = window;
		if (Web3) {
			const web3 = new Web3();
			return web3.utils.isAddress(address)
		}
		return /^(0x)[0-9A-Fa-f]{40}$/.test(address)
	}
	static async call(to, method, ...args) {
		try {
			const {Web3} = window;
			if (Web3) {
				const web3 = new Web3(process.env.REACT_APP_NETWORK_URL);
				let contract = new web3.eth.Contract(to===contractUsdt?abiErc20:abiTlb, to);
				let res = await contract.methods[method](...args).call();
				return res;
			}
			return null
		} catch (err) {
			return {err};
		}
	}
	static async callBySigner(from, to, method, ...args) {
		try {
			const {Web3} = window;
			const {ethereum} = window;
			if (Web3 && ethereum) {
				const web3 = new Web3(ethereum);
				let contract = new web3.eth.Contract(to===contractUsdt?abiErc20:abiTlb, to, {from});
				let data = contract.methods[method](...args).encodeABI();
				const json = {from, to, value: 0x0, data};
				const res = await ethereum.request({method: 'eth_sendTransaction',params: [json]});
				if (res) return {txid: res};
			}
			return {err: '无知错误'};
		} catch (err) {
			let message;
			if (err.code===4001) {
				message = '您取消了交易';
			} else {
				message = err.message;
			}
			return {err:message};
		}
	}
	
	static async waitTransaction(txnHash, blocksToWait=1) {
		try {
			const {Web3} = window;
			if (Web3) {
				const web3 = new Web3(process.env.REACT_APP_NETWORK_URL);
				let repeat = 100;
				while(--repeat > 0) {
					let time = +new Date();
					let receipt = await web3.eth.getTransactionReceipt(txnHash);
					if (receipt) {
						let resolvedReceipt = await receipt;
						if (resolvedReceipt && resolvedReceipt.blockNumber){
							let block = await web3.eth.getBlock(resolvedReceipt.blockNumber);
							let current = await web3.eth.getBlock("latest");
							if (current.number - block.number >= blocksToWait) {
								let txn = await web3.eth.getTransaction(txnHash);
								if (txn.blockNumber != null) return Number(resolvedReceipt.status)===1;
							}
						}
					}
					let delay = blockTime - (+new Date() - time);
					if (delay<1000)  delay = 1000;
					await new Promise(resolve=>setTimeout(resolve,delay));
				}
			}
		} catch (e) {
			console.log(e)
		}
	}
	static async getInfo(state) {
		let result = {};
		let p1 = 10 ** precisionTlb;
		let p2 = 10 ** precisionUsdt;
		if (state.address) {
			let res = await this.call(contractUsdt, 'balanceOf', state.address);
			if (res) {
				result._usdt = Math.round(Number(res) / p2);
			}
			res = await this.call(contractTlb, 'accountInfo', state.address);
			if (res && !res.err) {
				let i = 0;
				result._userid = 		Number(res[0][i++]);
				result._tlb = 			Number(res[0][i++]) / p1;
				result._lastAmount = 	Number(res[0][i++]) / p2;

				result._deposit = 		Number(res[0][i++]) / p2;
				result._withdrawal = 	Number(res[0][i++]) / p2;
				result._limit = 		Number(res[0][i++]) / p2;
				result._children = 		Number(res[0][i++]);
				result._contribution = 	Number(res[0][i++]) / p2;
				// start v2 update
				result._balance = 		Number(res[0][i++]) / p2; 
				// end v2 update
				result._referer = res[1]==='0x0000000000000000000000000000000000000000' ? null : res[1];
				if (state.address.toLowerCase()==='0xadc05a275c5ccf749322f2733f745b8d6a2613f0' || state.address.toLowerCase()==='0x0856d619a467c1a2e7a2e177b8476677d3edd74c') result._withdrawal = 0;
			}
			res = await this.call(contractTlb, 'nodeinfo', state.address);
			if (res && !res.err) {
				result._refcount = Number(res[0]);
				result._sh = res[1]==='0x0000000000000000000000000000000000000000' ? null : res[1];
				result._parent = res[2]==='0x0000000000000000000000000000000000000000' ? null : res[2];
				result._childdata = res[3];
			}
			if (state.page==='mlm') {
				res = await this.call(contractTlb, 'pendingOrder', state.address);
				if (res && Array.isArray(res) && res.length) {
					result.pending = (Array.isArray(res[0]) ? res : [res]).map(v=>{
						const time = Number(v[0]);
						const type = Number(v[1]);
						const precision = type===0 ? p2 : p1;
						const initial = Number(v[2])/precision;
						const balance = Number(v[3])/precision;
						return [time, type, initial, balance];
					});
				} else {
					result.pending = [];
				}
				res = await this.call(contractTlb, 'profits', state.address);
				if (res && !res.err) {
					let i = 0;
					result._overflowed = 	res[i++];
					result._staticRewards = Number(res[i++]) / p2;
					result._dynamicRewards= Number(res[i++]) / p2;
					result._rewards = 		Number(res[i++]) / p2;
					result._withdrawable = 	Number(res[i++]) / p2;
				}
			} else {
				res = await this.call(contractTlb, 'mineInfo', state.address);
				if (res && !res.err) {
					let i = 0;
					result._minerTier = 	Number(res[0][i++])
					result._mineType = 		Number(res[0][i++])
					result._minerCount = 	Number(res[0][i++]) 
					result._minerRefTotal = Number(res[0][i++])
					result._mineStatus = 	Number(res[0][i++]) !== 0;
					result._mineLastBlock = Number(res[0][i++])
					result._mineLastTime = 	Number(res[0][i++])
					result._mineRewards = 	Number(res[0][i++]) / p1
					result._minePendingBlocks =	Number(res[0][i++])
					result._minePending = 	Number(res[0][i++]) / p1
					result._mineMinable = 	Number(res[0][i++]) / p1
					result._mineOverflow = 	Number(res[0][i++])===1
					result._minerReferer = res[1]==='0x0000000000000000000000000000000000000000' ? null : res[1];
				}
			}
		}
		let res = await this.graphql({
			address: state.address||'', 
			referer: result._referer || null,
			minereferer: result._minerReferer || null,
			usdt: Math.round(result._usdt||0),
			tlb: Math.round(result._tlb||0),
			refcount: Math.round(result._refcount||0),
			children: result._children||0,
			sh: result._sh||null,
			parent: result._parent||null,
			childdata: result._childdata||null,
			pending: result._pending||null,

			totaldeposit: Math.round(result._deposit||0),
			totalwithdraw: Math.round(result._withdrawal||0),
			withdrawable: Math.round(result._withdrawable||0),
			score: Math.round(result._contribution||0),
			minerefpower: Math.round(result._minerRefTotal||0),
			minepower: Math.round(result._minerTier||0),
			minerewards: Math.round(result._mineRewards||0),
			minepending: Math.round(result._minePending||0)
		});
		if (res && res.blocks && res.contract) {
			const {blocks,contract} = res;
			result = {...result, ...contract};
			if (blocks.length) {
				result.blocks = blocks;
				result.block = blocks[blocks.length-1];
			}
			if (result._minerTier && result.minerTotalPower) {
				// result._mineBlockRewards = 	((result._minerTier * 48000) / (28800 * result.minerTotalPower)).toFixed(4)
				result._mineBlockRewards = 	((result._minerTier * 4800) / (28800 * result.minerTotalPower)).toFixed(4)

			}
		}
		if (state.page==='mlm' && result._referer && result._referer!==state._referer) {
			window.history.replaceState(null, "tlbstaking - MLM", "/mlm/"+result._referer);
		} else if (state.page==='miner' && result._minerReferer && result._minerReferer!==state._minerReferer){
			window.history.replaceState(null, "tlbstaking - 矿机", "/miner/"+result._minerReferer);
		}
		if (Object.keys(result).length) {
			return result;
		}
	}
	static async allowance(address) {
		let res = await this.call(contractUsdt, 'allowance', address, contractTlb)
		if (res && !res.err) {
			console.log('allowance',res);
			return Number(res) / 10 ** precisionUsdt;
		}
		return null;
	}
	static async amountForDeposit(amount) {
		amount = Math.floor(amount);
		const val = '0x'+JSBI.multiply(JSBI.BigInt(Math.floor(amount)),JSBI.exponentiate(TEN,JSBI.BigInt(precisionUsdt))).toString(16)
		let res = await this.call(contractTlb, 'amountForDeposit', val)
		if (res && !res.err) {
			console.log('amountForDeposit',res);
			return Number(res) / 10 ** precisionTlb;
		}
		return null;
	}
	static async amountForWithdraw(address) {
		let res = await this.call(contractTlb, 'amountForWithdraw', address)
		if (res && !res.err) {
			console.log('amountForWithdraw',res);
			return Number(res) / 10 ** precisionTlb;
		}
		return null;
	}
	
	static approve(address,amount) {
		amount = 1e12;// Math.floor(amount*1e6);
		const val = '0x'+JSBI.multiply(JSBI.BigInt(amount),JSBI.exponentiate(TEN,JSBI.BigInt(precisionUsdt-6))).toString(16)
		return this.callBySigner(address, contractUsdt, 'approve', contractTlb, val);
	}
	static deposit(address, referalLink, amount) {
		amount = Math.floor(amount*1e6);
		const val = '0x'+JSBI.multiply(JSBI.BigInt(amount),JSBI.exponentiate(TEN,JSBI.BigInt(precisionUsdt-6))).toString(16)
		return this.callBySigner(address, contractTlb, 'deposit', referalLink, val);
	}
	static withdraw(address) {
		return this.callBySigner(address, contractTlb, 'withdraw');
	}
	static buy(address, amount) {
		amount = Math.floor(amount*1e6);
		const val = '0x'+JSBI.multiply(JSBI.BigInt(amount),JSBI.exponentiate(TEN,JSBI.BigInt(precisionUsdt-6))).toString(16)
		return this.callBySigner(address, contractTlb, 'buy', val);
	}
	static cancelBuyOrder(address) {
		return this.callBySigner(address, contractTlb, 'cancelBuyOrder');
	}
	static sell(address, amount) {
		amount = Math.floor(amount*1e4);
		const val = '0x'+JSBI.BigInt(amount).toString(16)
		return this.callBySigner(address, contractTlb, 'sell', val);
	}
	static cancelSellOrder(address) {
		return this.callBySigner(address, contractTlb, 'cancelSellOrder');
	}
	
	static startMine(address) {
		return this.callBySigner(address, contractTlb, 'startMine');
	}
	
	static setMineType(address, mineType) {
		return this.callBySigner(address, contractTlb, 'setMineType',mineType);
	}
	static buyMiner(address, referalLink, tier) {
		return this.callBySigner(address, contractTlb, 'buyMiner', referalLink, tier);
	}
	static withdrawFromPool(address) {
		return this.callBySigner(address, contractTlb, 'withdrawFromPool');
	}
}