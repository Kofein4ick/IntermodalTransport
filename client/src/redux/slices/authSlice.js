import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../../utils/axios'


const initialState = {
    token: null,
    status: null,
    isLoading: false,
}

export const loginUser = createAsyncThunk(
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
        const {data} = await axios.get('auth/check')
        return data
    } catch (error) {
        throw rejectWithValue(error.response.data.message)
    }
})

export const registerUser = createAsyncThunk(
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

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: {

        // Login
        [loginUser.pending]: (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
            state.token = action.payload?.token
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false
            state.status = action.payload
        },

        // GetUser
        [checkUser.pending]: (state) => {
            state.isLoading = true
        },
        [checkUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
            state.token = action.payload?.token
        },
        [checkUser.rejected]: (state, action) => {
            state.isLoading = false
            state.status = action.payload
        },

        // Registration
        [registerUser.pending]: (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
            state.token = action.payload?.token
        },
        [registerUser.rejected]: (state, action) => {
            state.isLoading = false
            state.status = action.payload
        },
    }
})

export const checkIsAuth = (state) => {
    Boolean(state.auth.token)
}

export const {} = authSlice.actions

export default authSlice.reducer