import { createSlice } from '@reduxjs/toolkit'

interface CoinsState {
  loading: {
    active: boolean
    error: boolean
  }
  data: undefined[]
}

const initialState: CoinsState = {
  loading: {
    active: false,
    error: false
  },
  data: []
}

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {}
})

export default coinsSlice.reducer
