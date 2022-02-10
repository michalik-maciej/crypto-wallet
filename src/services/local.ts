import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const localApi = createApi({
  reducerPath: 'localApi',
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8011/api/` }),
  endpoints: (builder) => ({
    getPing: builder.query({
      query: () => `ping`
    }),
    postUser: builder.mutation({
      query: (loginData) => ({
        url: `user/login`,
        method: 'POST',
        body: loginData
      }),
      transformResponse: ({ data }) => data
    })
  })
})

export const { useGetPingQuery, usePostUserMutation } = localApi
