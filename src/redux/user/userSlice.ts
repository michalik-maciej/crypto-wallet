import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { UserState } from './types'
import { requestLogin } from './requestLogin'

const initialState = {
  status: 'idle',
  logged: true,
  email: 'test@email',
  error: null
} as UserState

/* selectors */
export const selectStatus = (state: RootState) => state.user.status
export const selectUserId = (state: RootState) => state.user.email

/* reducers and actions */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state: UserState, action: PayloadAction<string>) {
      state.email = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(requestLogin.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.email = payload.message
      })
      .addCase(requestLogin.rejected, (state) => {
        // state.error = payload.message
        state.status = 'idle'
      })
  }
})

export const { loginUser } = userSlice.actions
export default userSlice.reducer
