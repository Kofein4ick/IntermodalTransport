import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    status: null,
    isLoading: false,
    isProgress: false,
    allPaths: []
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
        return data
        }catch(error){
            throw rejectWithValue(error.response.data.message)
        }
    
})


export const routeSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {UpdateWays: (state) =>{
        state.isProgress = false
        state.allPaths = []
    }
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
            state.allPaths.push(action.payload?.routes)
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
            state.isProgress = false
        },
        [deleteWay.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload?.message
            state.isProgress = true
        },
        [deleteWay.rejected]: (state) => {
            state.isLoading = false
            state.isProgress = true
        },
    }
})

export const {UpdateWays} = routeSlice.actions
export default routeSlice.reducer