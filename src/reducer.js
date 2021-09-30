import { createSlice } from '@reduxjs/toolkit';

const locales = {
	"en-US": require('./locales/en-US.json'),
	"zh-CN": require('./locales/zh-CN.json'),
	"japanese": require('./locales/japanese.json'),
	"korean": require('./locales/korean.json'),
    "ru-RU": require('./locales/ru-RU.json'),
};
const lang = window.localStorage.getItem('lang') || 'zh-CN';

export const contractSlice = createSlice({
    name: 'contract',
    initialState: {
        lang,
        L: locales[lang],
        page: 'mlm',
        address: null,
        
        price: 0,
        currentLayer:0,
        totalUsers:0,
        totalMineable:0,
        insuranceTime:0,
        totalDeposit: 0,
        redeemAmount: 0,
        totalSupply: 0,
        totalBurnt: 0,
        insuranceCounterTime: 0, 
        insuranceAmount: 0, 
        minerCount: 0, 
        minerTotalPower: 0,
        minerTierPrice1: 0,
        minerTierPrice2: 0,
        minerTierPrice3: 0,
        minerTierPrice4: 0,

        minerTier1: 0,
        minerTier2: 0,
        minerTier3: 0,
        minerTier4: 0,
        minerList: [],
        
        _referer: null,
        _userid: 0,
        _tlb: 0,
        _usdt: 0,
        
        _lastAmount: 0,
        _deposit: 0,
        _withdrawal: 0,
        _limit: 0,  
        
        _overflowed: false,
        _staticRewards: 0,
        _dynamicRewards: 0,
        _rewards: 0,
        _withdrawable: 0,
        // start v2 update
        _balance: 0,
        // end v2 update
        
        
        _refcount: 0,
        _children: 0,
        _contribution: 0,
        _sh: null,
        _parent: null,
        _childdata: [],

        _minerReferer: null,
        _minerTier: 0, 
        _mineType: 0,
        _mineBlockRewards: 0,
        _minerCount: 0, 
        _minerRefTotal: 0,
        _mineStatus: false,
        _mineLastBlock: 0,
        _mineLastTime: 0,
        _mineRewards: 0,
        _minePending: 0,
        _mineMinable: 0,
        _minePendingBlocks: 0,
        _mineOverflow: false,
        block: {
            number: 0,
            hash:null,
            time:0,
        },
        allowance: 0,
        orders: [],
        pending: [],
        blocks: [],
        ranks: [],
        tvls: []
    }, 
    reducers: {
        login: (state, action) => {
            console.log(action);
            state.address = action.payload;
        },
        logout: state => {
            state.address = null;
        },
        rejected: state => {
            state.address = null;
        },
        update: (state,action) => {
            for(let k in action.payload) {
                if (state[k]!==undefined) {
                    state[k] = action.payload[k];
                } else {
                    new Error('🦊 undefined account item')
                }
            }
        },
        lang: (state, action) => {
            state.lang = action.payload;
            state.L = locales[action.payload];
            window.localStorage.setItem('lang',action.payload)
        },
    }
});