import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    users: [],
    paths:  [],
    allpaths: [],
    length: null,
    cost: null,
    isLoading: false,
    isProgress: false,
    isAllProgress: false,
    isProgressDelete: true
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
        data.id = id
        return data
        }catch(error){
            throw rejectWithValue(error.response.data.message)
        }
})

//Получение лучшего маршрута
export const bestWaysUser = createAsyncThunk(
    'user/bestWaysUser',
    async({from, to, mode},{rejectWithValue}) => {
        try {
                const { data } = await axios.post('/user/route', {
                from,
                to,
                mode
            })
            if(data.path){
                window.localStorage.setItem('paths', data.path)
            }
            return (JSON.parse(JSON.stringify(data)))
        } catch (error) {
            throw rejectWithValue(error.response.data.message)
        }
    })

//Получение всех маршрутов
export const allWaysUser = createAsyncThunk(
    'user/allWaysUser',
    async({from, to, mode},{rejectWithValue}) => {
        try {
                const { data } = await axios.post('/user/routes', {
                from,
                to,
                mode
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
        NewWay: (state) =>{
            state.isProgress = false
            state.isAllProgress = false
            state.allpaths = []
            state.paths = []
            state.length = null
        }
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
            state.isProgressDelete = false
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isProgressDelete = true
            state.users = state.users.filter(
                (path) => path.id != action.payload.id,
            )
        },
        [deleteUser.rejected]: (state) => {
            state.isLoading = false
            state.isProgressDelete = true
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
            state.cost= action.payload?.cost
            state.paths = action.payload?.path
            state.isProgress = true
        },
        [bestWaysUser.rejected]: (state) => {
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
        [allWaysUser.rejected]: (state) => {
            state.isLoading = false
            state.isAllProgress =true
        },
    },
})

export const checkIsLoad = (state) => {
    Boolean(state.user.isProgress)
}

export const {NewWay} = userSlice.actions
export default userSlice.reducer