import { createSlice } from '@reduxjs/toolkit'
import { UserState } from './AppStateModel'

const initialState: UserState = {
  logged: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
})

export default userSlice.reducer
