import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    users: [],
    paths:  [],
    allpaths: [],
    length: null,
    isLoading: false,
    isProgress: false,
    isAllProgress: false,
}

//Поучение всех пользователей
export const getAllUsers = createAsyncThunk('user/getAllUsers', async(_,{rejectWithValue}) => {
    try {
        const { data } = await axios.get('/user/')
        return data
    } catch (error) {
        throw rejectWithValue(error.response.data.message)
    }
})


//Удаление пользователя
export const deleteUser = createAsyncThunk('user/delete', async({id}, {rejectWithValue}) => {
    try{
        const{data} = await axios.delete(`/user/${id}`, {id})
        return data
        }catch(error){
            throw rejectWithValue(error.response.data.message)
        }
    
})

//Получение лучшего маршрута
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
    

    //Получение всех маршрутов
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

        //delete
        [deleteUser.pending]: (state) => {
            state.isLoading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.isLoading = false
            
            
        },
        [deleteUser.rejected]: (state) => {
            state.isLoading = false
        },


        //bestWays
        [bestWaysUser.pending]: (state) => {
            state.isLoading = false
            state.isProgress = false
        },
        [bestWaysUser.fulfilled]: (state, action) => {
            state.isLoading = true
            state.status = action.payload?.message
            state.length= action.payload?.length
            state.paths=action.payload?.path
            state.isProgress = true
          
        },
        [bestWaysUser.rejected]: (state, action) => {
            state.isLoading = false
            state.isProgress = true
        },

        
        //allWays
        [allWaysUser.pending]: (state) => {
            state.isLoading = false
            state.isAllProgress = false
        },
        [allWaysUser.fulfilled]: (state, action) => {
            state.isLoading = true
            state.status = action.payload?.message
            state.allpaths = action.payload?.paths
            state.isAllProgress = true
        },
        [allWaysUser.rejected]: (state, action) => {
            state.isLoading = false
            state.isAllProgress = false
        },
    },
})

export const checkIsLoad = (state) => {
    Boolean(state.user.isProgress)
}


export default userSlice.reducer