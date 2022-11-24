import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    users: [],
    paths:  [],
    length: null,
    isLoading: false,
}

export const getAllUsers = createAsyncThunk('user/getAllUsers', async(_,{rejectWithValue}) => {
    try {
        const { data } = await axios.get('/user/')
        return data
    } catch (error) {
        throw rejectWithValue(error.response.data.message)
    }
})

export const deleteUser = createAsyncThunk('user/delete', async(id, {rejectWithValue}) => {
    try{
        const{data} = await axios.delete(`/user/:{id}`, id)
        return data
        }catch(error){
            throw rejectWithValue(error.response.data.message)
        }
    
})


export const bestWaysUser = createAsyncThunk(
    'user/bestWaysUser',
    async({from, to},{rejectWithValue}) => {
        try {
                const { data } = await axios.post('/user/route', {
                from,
                to,
            })
            if(data.path){
                window.localStorage.setItem('paths', data.path)
            }
            return data
        } catch (error) {
            throw rejectWithValue(error.response.data.message)
        }
    })
    
export const allWaysUser = createAsyncThunk(
    'user/allWaysUser',
    async({from, to},{rejectWithValue}) => {
        try {
                
                const { data } = await axios.post('/user/routes', {
                from,
                to,
            })
            return data
        } catch (error) {
            throw rejectWithValue(error.response.data.message)
        }
    }
)




export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        // Get All
        [getAllUsers.pending]: (state) => {
            state.isLoading = true
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.isLoading = false
            state.users = action.payload?.users
        },
        [getAllUsers.rejected]: (state) => {
            state.isLoading = false
        },

        [deleteUser.pending]: (state) => {
            state.isLoading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.isLoading = false
            
            
        },
        [deleteUser.rejected]: (state) => {
            state.isLoading = false
        },

        [bestWaysUser.pending]: (state) => {
            state.isLoading = true
        },
        [bestWaysUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
            state.length= action.payload?.length
            state.paths.push(action.payload?.path)

        },
        [bestWaysUser.rejected]: (state, action) => {
            state.isLoading = false
        },


        [allWaysUser.pending]: (state) => {
            state.isLoading = true
        },
        [allWaysUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
        },
        [allWaysUser.rejected]: (state, action) => {
            state.isLoading = false
        },
    },
})



export default userSlice.reducer