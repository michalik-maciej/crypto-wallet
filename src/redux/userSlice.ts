import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  logged: boolean
}

const initialState: UserState = {
  logged: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
})

export default userSlice.reducer
