import { configureStore } from '@reduxjs/toolkit'
import coinsReducer from './coinsSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
