import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const coingeckoApi = createApi({
  reducerPath: 'coingeckoApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.coingecko.com/api/v3/` }),
  endpoints: (builder) => ({
    getPing: builder.query({
      query: () => `ping`
    }),
    getAllCoins: builder.query({
      query: () =>
        `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    })
  })
})

export const { useGetPingQuery, useGetAllCoinsQuery } = coingeckoApi
