import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const localApi = createApi({
  reducerPath: 'localApi',
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8011/api` }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
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
