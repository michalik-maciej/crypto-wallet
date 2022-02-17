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
  holdings: { original: number; usd: number }
  netCost: number
  currentPrice: number
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
          asset.holdings.original += coinQuantity
          asset.netCost += coinQuantity * pricePerCoin
        }
        if (type === 'withdraw') {
          asset.holdings.original -= coinQuantity
          asset.netCost -= coinQuantity * pricePerCoin
        }
      } else {
        const newAsset: ISingleAsset = {
          coinId,
          holdings: {
            original: coinQuantity,
            usd: coinQuantity * currentPrices[coinId].usd
          },
          netCost: coinQuantity * pricePerCoin,
          currentPrice: currentPrices[coinId].usd,
          profit: 0
        }
        assets.push(newAsset)
      }

      assets.forEach((a) => {
        a.holdings.usd = a.holdings.original * currentPrices[coinId].usd
        a.profit = a.holdings.usd - a.netCost
      })
    })
  }
  return assets
}
