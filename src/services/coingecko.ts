import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const coingeckoApi = createApi({
  reducerPath: 'coingeckoApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.coingecko.com/api/v3` }),
  endpoints: (builder) => ({
    getPing: builder.query({
      query: () => `/ping`
    }),
    getCoinsMarket: builder.query({
      query: () =>
        `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
    }),
    getCoinsList: builder.query({
      query: () => `/coins/list`
    }),
    getCurrentPrice: builder.query({
      query: (coinIds) => `/simple/price?ids=${coinIds}&vs_currencies=usd`
    }),
    getCoinChart: builder.query({
      query: (coinId) => `/coins/${coinId}/ohlc?vs_currency=usd&days=365`
    })
  })
})

export const {
  useGetPingQuery,
  useGetCoinsMarketQuery,
  useGetCoinsListQuery,
  useGetCurrentPriceQuery,
  useGetCoinChartQuery
} = coingeckoApi
