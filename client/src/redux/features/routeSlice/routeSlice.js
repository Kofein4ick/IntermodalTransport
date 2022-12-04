import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    status: null,
    isLoading: false,
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

export const routeSlice = createSlice({
    name: 'route',
    initialState,
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
    }
})

export default routeSlice.reducer