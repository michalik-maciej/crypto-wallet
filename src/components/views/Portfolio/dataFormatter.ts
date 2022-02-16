export interface ITransactionQuery {
  coinId: string
  coinQuantity: number
  pricePerCoin: number
  type: string
  _id: string
  userId: string
  timestamp: number
}

interface ISingleAsset {
  coinId: string
  holdings: number
  netCost: number
  currentPrice: number
  marketValue: number
  profit: number
}

export default function DataFormatter({
  transactions,
  currentPrices
}: {
  transactions: ITransactionQuery[]
  currentPrices: any
}) {
  const assets: ISingleAsset[] = []

  if (currentPrices) {
    transactions?.forEach(({ coinId, coinQuantity, type, pricePerCoin }) => {
      const asset = assets.find((c) => c.coinId === coinId)

      if (asset) {
        if (type === 'deposit') {
          asset.holdings += coinQuantity
          asset.netCost += coinQuantity * pricePerCoin
        }
        if (type === 'withdraw') {
          asset.holdings -= coinQuantity
          asset.netCost -= coinQuantity * pricePerCoin
        }
      } else {
        const newAsset: ISingleAsset = {
          coinId,
          holdings: coinQuantity,
          netCost: coinQuantity * pricePerCoin,
          currentPrice: currentPrices[coinId].usd,
          marketValue: coinQuantity * currentPrices[coinId].usd,
          profit: 0
        }
        assets.push(newAsset)
      }

      assets.forEach((a) => {
        a.marketValue = a.holdings * a.currentPrice
        a.profit = a.marketValue - a.netCost
      })
    })
  }
  return assets
}
