import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface UserState {
  status: 'loading' | 'idle'
  logged: boolean
  id: string | null
  error: null
}

const initialState = {
  status: 'idle',
  logged: false,
  id: null,
  error: null
} as UserState

/* selectors */
export const getUserId = (state: RootState) => state.user.id
export const getUserLogged = (state: RootState) => state.user.logged

/* reducers and actions */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logUserIn(state: UserState, action: PayloadAction<string>) {
      state.id = action.payload
      state.logged = true
    },
    logUserOut(state: UserState) {
      state.id = null
      state.logged = false
    }
  }
})

export const { logUserIn, logUserOut } = userSlice.actions
export default userSlice.reducer
