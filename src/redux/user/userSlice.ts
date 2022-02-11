import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { UserState } from './types'
import { requestLogin } from './requestLogin'

const initialState = {
  params: {
    status: 'idle',
    exists: false,
    authorized: false,
    feedback: null
  }
} as UserState

/* selectors */
export const selectStatus = (state: RootState) => state.user.params.status

/* reducers and actions */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state: UserState) {
      state.params = { ...state.params, exists: false, authorized: false }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.pending, (state) => {
        state.params = {
          ...state.params,
          exists: false,
          authorized: false,
          status: 'loading'
        }
      })
      .addCase(requestLogin.fulfilled, (state, { payload }) => {
        state.params = {
          ...state.params,
          feedback: payload.message,
          status: 'idle',
          exists: payload.status === 200,
          authorized: payload.status === 200
        }
      })
      .addCase(requestLogin.rejected, (state, { payload }: any) => {
        state.params = {
          ...state.params,
          status: 'idle',
          authorized: payload.status === 200,
          exists: payload.status === (200 || 401),
          feedback: payload.message
        }
      })
  }
})

export const { logout } = userSlice.actions
export default userSlice.reducer
