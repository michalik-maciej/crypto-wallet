import { createAsyncThunk } from '@reduxjs/toolkit'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import { UserCredentials } from './types'

/* thunk creators */
export const requestLogin = createAsyncThunk(
  'user/login',
  async (payload: UserCredentials, { rejectWithValue }) => {
    let finalResponse
    try {
      const response = (await Axios.post(
        `http://localhost:8011/api/user/login`,
        payload
      )) as AxiosResponse

      finalResponse = {
        status: response.status,
        message: response.data.message
      }
      return finalResponse
    } catch (err) {
      const error = err as AxiosError

      if (error.response) {
        finalResponse = {
          status: error.response.status,
          message: error.response.data.message
        }
        return rejectWithValue(finalResponse)
      }
      return { status: undefined, message: error }
    }
  }
)

export default requestLogin
