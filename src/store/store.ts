import {configureStore} from '@reduxjs/toolkit'
import userreducer from './slices/userslice.slice.ts'
const store=configureStore({
    reducer:{
        user: userreducer
    }
})
export default store