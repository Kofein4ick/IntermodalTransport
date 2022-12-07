import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { all } from 'axios'
import axios from '../../../utils/axios'

const initialState = {
    status: null,
    isLoading: false,
    isProgress: false,
    isProgressDelete: true,
    allPaths: [],
    filter: null,
}

// Сохранение маршрута
export const saveRoute = createAsyncThunk(
    'route/save',
    async({from, to, visited, length, cost},{rejectWithValue}) => {
        try {
                const {data} = await axios.post('/route/save', {
                    from,
                    to,
                    visited,
                    length,
                    cost,
                })
                return data
        } catch (error) {
            throw rejectWithValue(error.response.data.message)   
        }
    }
)

//Поучение всех сохраненных маршрутов
export const getAllWays = createAsyncThunk('route/user', async(_,{rejectWithValue}) => {
    try {
        const { data } = await axios.get('/route/user')
        return data
    } catch (error) {
        throw rejectWithValue(error.response.data.message)
    }
})

//Удаление пользователя
export const deleteWay = createAsyncThunk('route/delete', async({id}, {rejectWithValue}) => {
    try{
        const{data} = await axios.delete(`/route/${id}`, {id})
        data.id = id
        return data
        }catch(error){
            throw rejectWithValue(error.response.data.message)
        }
    
})

export const routeSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {
        UpdateWays: (state) =>{
            state.isProgress = false
            state.allPaths = []
        },

        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: {

        // saveRoute
        [saveRoute.pending]: (state) => {
            state.isLoading = true
        },
        [saveRoute.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
        },
        [saveRoute.rejected]: (state, action) => {
            state.isLoading = false
            state.status = action.payload
        },

        // getAllWays
        [getAllWays.pending]: (state) => {
            state.isLoading = true
            state.isProgress = false
        },
        [getAllWays.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
            state.allPaths = action.payload?.routes
            state.isProgress = true
        },
        [getAllWays.rejected]: (state, action) => {
            state.isLoading = false
            state.status = action.payload
            state.isProgress = true
        },

        // deleteWay
        [deleteWay.pending]: (state) => {
            state.isLoading = true
            state.isProgressDelete = false
        },
        [deleteWay.fulfilled]: (state, action) => {
            state.allPaths = state.allPaths.filter(
                (path) => path.id != action.payload.id,
            )
            state.status = action.payload?.message
            state.isProgressDelete = true
        },
        [deleteWay.rejected]: (state) => {
            state.isLoading = false
            state.isProgressDelete = true
        },
    }
})

export const {UpdateWays, setFilter} = routeSlice.actions
export default routeSlice.reducer