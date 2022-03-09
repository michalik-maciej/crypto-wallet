import { IUserQuery } from '../../../services/local.types'
import { IPriceQuery } from '../../../services/coingecko.types'

export interface ISingleAsset {
  coin: {
    originalId: string
    logo: string
    name: string
    ticker: string
  }
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
  let total = 0
  if (
    userData?.coins &&
    userData?.transactions &&
    currentPrices &&
    Object.entries(currentPrices).length > 0 &&
    currentPrices.constructor === Object
  ) {
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
    })
    assets.forEach((a) => {
      a.currentPrice = parseFloat(currentPrices[a.coin.originalId].usd)
      a.holdings.usd = a.holdings.original * a.currentPrice
      a.profit = a.holdings.usd - a.netCost
      total += a.holdings.usd
      const index = assets.indexOf(a)
      if (a.holdings.original === 0) assets.splice(index, 1)
    })
    assets.sort((a, b) => (a.holdings.usd > b.holdings.usd ? -1 : 1))
  }

  return { assets, total }
}
