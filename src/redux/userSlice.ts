import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface UserState {
  status: 'loading' | 'idle'
  logged: boolean
  id: string | null
  admin: boolean
  error: null
}

const initialState = {
  status: 'idle',
  logged: false,
  id: null,
  admin: false,
  error: null
} as UserState

/* selectors */
export const getUserId = (state: RootState) => state.user.id
export const getUserLogged = (state: RootState) => state.user.logged
export const getIsAdmin = (state: RootState) => state.user.admin

/* reducers and actions */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logUserIn(
      state: UserState,
      action: PayloadAction<{ userId: string; admin: boolean }>
    ) {
      state.id = action.payload.userId
      state.logged = true
      state.admin = action.payload.admin
    },
    logUserOut(state: UserState) {
      state.id = null
      state.logged = false
      state.admin = false
    }
  }
})

export const { logUserIn, logUserOut } = userSlice.actions
export default userSlice.reducer
