import { IUserQuery } from '../../../services/local.types'
import { IPriceQuery } from '../../../services/coingecko.types'

export interface ISingleAsset {
  coin: { originalId: string; logo: string; name: string; symbol: string }
  holdings: { original: number; usd: number }
  netCost: number
  currentPrice: number
  profit: number
}

export default function DataFormatter(
  userData: IUserQuery,
  currentPrices: Record<string, IPriceQuery>
) {
  let assets: ISingleAsset[] = []
  if (userData?.coins && userData?.transactions && currentPrices) {
    const { coins, transactions } = userData
    assets = coins.map((coin) => ({
      coin: { ...coin },
      holdings: { original: 0, usd: 0 },
      netCost: 0,
      currentPrice: 0,
      profit: 0
    }))
    transactions.forEach(({ coinId, coinQuantity, type, pricePerCoin }) => {
      const asset = assets.find(({ coin }) => coin.originalId === coinId)

      if (asset) {
        if (type === 'deposit') {
          asset.holdings.original += coinQuantity
          asset.netCost += coinQuantity * pricePerCoin
        }
        if (type === 'withdraw') {
          asset.holdings.original -= coinQuantity
          asset.netCost -= coinQuantity * pricePerCoin
        }
      }
      console.log('userData: ', userData)
      console.log('assets: ', assets)
      console.log('currentPrices: ', currentPrices)
      assets.forEach((a) => {
        a.holdings.usd =
          a.holdings.original *
          parseInt(currentPrices[a.coin.originalId].usd, 10)
        a.profit = a.holdings.usd - a.netCost
        const index = assets.indexOf(a)
        if (a.holdings.original === 0) assets.splice(index, 1)
      })
      assets.sort((a, b) => (a.holdings.usd > b.holdings.usd ? -1 : 1))
    })
  }

  return assets
}
