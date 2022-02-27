import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserLoginInput, IUserLoginOutput } from './local.types'

const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8011/api'

export const localApi = createApi({
  reducerPath: 'localApi',
  tagTypes: ['Transaction'],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<IUserLoginOutput, IUserLoginInput>({
      query: (loginData) => ({
        url: `/user/login`,
        method: 'POST',
        body: loginData
      })
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `/user/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Transaction']
    }),
    getUserTransactions: builder.query({
      query: (userId) => `/transactions/${userId}`,
      providesTags: ['Transaction']
    }),
    postTransaction: builder.mutation({
      query: (data) => ({
        url: `/transactions/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Transaction']
    })
  })
})

export const {
  useLoginUserMutation,
  useCreateUserMutation,
  useGetUserTransactionsQuery,
  usePostTransactionMutation
} = localApi
