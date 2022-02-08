import AppState from './AppStateModel'

/* Selectors */
export const getCoinsData = (state: AppState) =>
  state.coingeckoApi.queries.getAllCoins.status === 'fulfilled'
    ? state.coingeckoApi.queries.getAllCoins.data
    : []

export const getCoinById = (coinId: string | undefined, state: AppState) => {
  return state.coingeckoApi.queries.getAllCoins.data.filter(
    (coin) => coin.id === coinId
  )
}
