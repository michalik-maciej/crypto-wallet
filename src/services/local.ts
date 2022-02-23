import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserLoginInput } from './local.types'

const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8011/api'

export const localApi = createApi({
  reducerPath: 'localApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      { userId: string; message: string },
      IUserLoginInput
    >({
      query: (loginData) => ({
        url: `/user/login`,
        method: 'POST',
        body: loginData
      })
    }),
    getUserTransactions: builder.query({
      query: (userId) => `/transactions/${userId}`
    }),
    postTransaction: builder.mutation({
      query: (data) => ({
        url: `/transactions/add`,
        method: 'POST',
        body: data
      })
    })
  })
})

export const {
  useGetUserTransactionsQuery,
  useLoginUserMutation,
  usePostTransactionMutation
} = localApi
