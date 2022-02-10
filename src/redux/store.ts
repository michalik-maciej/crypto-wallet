import { configureStore } from '@reduxjs/toolkit'
import { coingeckoApi } from '../services/coingecko'
import { localApi } from '../services/local'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [coingeckoApi.reducerPath]: coingeckoApi.reducer,
    [localApi.reducerPath]: localApi.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
