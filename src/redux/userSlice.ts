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
  logged: true,
  id: '620ed26b7f65d70be90509e6',
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
