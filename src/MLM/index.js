import {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { contractSlice } from '../reducer';

import Section_1 from './Section_1';
import Section_2 from './Section_2';
import Section_3 from './Section_3';
import Section_4 from './Section_4';
import Section_5 from './Section_5';
import Section_6 from './Section_6';
import Section_7 from './Section_7';
import Section_8 from './Section_8';
import Section_9 from './Section_9';
import Section_10 from './Section_10';
import Section_11 from './Section_11';
import Section_13 from './Section_13';
import Section_14 from './Section_14';


const MLMPage = () => {
	let contract = useSelector(state => state.contract);
	/* let history = useHistory(); */
	const dispatch = useDispatch()
	useEffect(() => {
		const data = {page:'mlm'};
		if (!contract._minerReferer) {
			const url = window.location.pathname;
			const _referer = url.slice(url.lastIndexOf('/')+1);
			data._referer = _referer;
		}
		dispatch(contractSlice.actions.update(data));
	});
	return (
		<>
			<Section_1></Section_1>
			<Section_2></Section_2>
			<Section_3></Section_3>
			<Section_4></Section_4>
			<Section_5></Section_5>
			<Section_6></Section_6>
			<Section_7></Section_7>
			<Section_8></Section_8>
			<Section_9></Section_9>
			<Section_10></Section_10>
			<Section_11></Section_11>
			<Section_13></Section_13>
			<Section_14></Section_14>
		</>
	)
}

export default MLMPage;