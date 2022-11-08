import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../../utils/axios'


const initialState = {
    token: null,
    status: null,
    isLoading: false,
}

export const userLogin = createAsyncThunk(
    'auth/login',
    async({login, password},{rejectWithValue}) => {
        try {
                const {data} = await axios.post('/auth/login', {
                    login,
                    password,
                })
                if(data.token) {
                    window.localStorage.setItem('token', data.token)
                }
                return data
        } catch (error) {
            throw rejectWithValue(error.response.data.message)   
        }
    }
)

export const checkUser = createAsyncThunk('auth/check', async(_,{rejectWithValue}) => {
    try {
        console.log("1")
        const token = window.localStorage.getItem('token', data.token)
        console.log("token", token)
        const {data} = await axios.get('auth/check', {token})
        return data
    } catch (error) {
        throw rejectWithValue(error.response.data.message)
    }
})

export const register = createAsyncThunk(
    'auth/registration',
    async({login, password},{rejectWithValue}) => {
        try {
                const { data } = await axios.post('/auth/registration', {
                login,
                password,
            })

            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (error) {
            throw rejectWithValue(error.response.data.message)
        }
    }
)

export const checkIsAuth = (state) => {
    Boolean(state.auth.token)
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: {

        // Login
        [userLogin.pending]: (state) => {
            state.isLoading = true
        },
        [userLogin.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
            state.token = action.payload?.token
        },
        [userLogin.rejected]: (state, action) => {
            state.isLoading = false
            state.status = action.payload
        },

        // GetUser
        [checkUser.pending]: (state) => {
            state.isLoading = true
        },
        [checkUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.token = action.payload?.token
        },
        [checkUser.rejected]: (state, action) => {
            state.isLoading = false
            state.status = action.payload
        },

        // Registration
        [register.pending]: (state) => {
            state.isLoading = true
        },
        [register.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.token = action.payload?.token
        },
        [register.rejected]: (state, action) => {
            state.isLoading = false
            state.status = action.payload
        },
    }
})

export const {} = authSlice.actions

export default authSlice.reducer