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
    }),
    getCoinById: builder.query({
      query: (coinId) =>
        `simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=false`
    }),
    getCoinChart: builder.query({
      query: (coinId) =>
        `coins/${coinId}/market_chart?vs_currency=usd&days=90&interval=daily`
    })
  })
})

export const {
  useGetPingQuery,
  useGetAllCoinsQuery,
  useGetCoinByIdQuery,
  useGetCoinChartQuery
} = coingeckoApi
