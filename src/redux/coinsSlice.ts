import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface CoinsState {
  status: string
  data: any
}

export const fetchCoins = createAsyncThunk('coins/ping', async () => {
  const res = await axios.get(`https://api.coingecko.com/api/v3/ping`)
  return res
})

const initialState: CoinsState = {
  status: '',
  data: null
}

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = `loading`
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = `fulfilled`
        state.data = action
      })
  }
})

export default coinsSlice.reducer
