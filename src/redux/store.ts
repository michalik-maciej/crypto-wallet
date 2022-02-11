import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit'
import { coingeckoApi } from '../services/coingecko'
import { localApi } from '../services/local'
import userReducer from './user/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [coingeckoApi.reducerPath]: coingeckoApi.reducer,
    [localApi.reducerPath]: localApi.reducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
