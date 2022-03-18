import { IMarketQueryResponse } from '../../../services/coingecko.types'
import { formatToUSD } from '../../../utils/utils'

export interface IFormattedCoinData {
  coinId: string
  rank: { data: number }
  name: { data: { image: string; name: string; symbol: string } }
  price: { data: string }
  priceChange: { data: { label: string; positive: boolean } }
  marketCap: { data: string }
}

export default function DataFormatter(
  coinData: IMarketQueryResponse
): IFormattedCoinData {
  return {
    coinId: coinData.id,
    rank: {
      data: coinData.market_cap_rank
    },
    name: {
      data: {
        image: coinData.image,
        name: coinData.name,
        symbol: coinData.symbol.toUpperCase()
      }
    },
    price: {
      data: formatToUSD(coinData.current_price)
    },
    priceChange: {
      data: {
        label: coinData.price_change_percentage_24h.toFixed(2),
        positive: coinData.price_change_percentage_24h >= 0
      }
    },
    marketCap: { data: formatToUSD(coinData.market_cap) }
  }
}
