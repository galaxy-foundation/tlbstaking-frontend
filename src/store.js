import {configureStore} from '@reduxjs/toolkit';
import { contractSlice } from './reducer'

export default configureStore({
    reducer: {
        contract: contractSlice.reducer,
    }
})