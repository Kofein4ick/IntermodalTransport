import {configureStore} from '@reduxjs/toolkit'
import routeSlice from './features/routeSlice/routeSlice'
import authSlice from './features/slices/authSlice'
import userSlice from './features/userSlice/userSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        route: routeSlice,
    }
})