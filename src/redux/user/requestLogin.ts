import { createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

interface ResponseMessage {
  message: string
}

interface UserCredentials {
  email: string
  password: string
}

/* thunk creators */
export const requestLogin = createAsyncThunk<ResponseMessage, UserCredentials>(
  'user/login',
  async (payload) => {
    try {
      const response = await Axios.post<ResponseMessage>(
        `http://localhost:8011/api/user/login`,
        payload
      )
      return response
    } catch (err: any) {
      return err
    }
  }
)

export default requestLogin
