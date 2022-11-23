import {configureStore} from '@reduxjs/toolkit'

import authSlice from './features/slices/authSlice'
import userSlice from './features/userSlice/userSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
    }
})