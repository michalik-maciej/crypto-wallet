import AppState from './AppStateModel'

/* Selectors */
export const getCoinsData = (state: AppState) =>
  state.coingeckoApi.queries.getAllCoins.status === 'fulfilled'
    ? state.coingeckoApi.queries.getAllCoins.data
    : []

export default getCoinsData
