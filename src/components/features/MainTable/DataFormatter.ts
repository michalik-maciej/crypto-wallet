import { RawCoinData } from '../../../redux/coins/types'

interface IFormattedCoinData {
  coinId: string
  rank: { data: number }
  name: { data: { image: string; name: string; symbol: string } }
  price: { data: string }
  priceChange: { data: { label: string; positive: boolean } }
  marketCap: { data: string }
}

export default function DataFormatter(
  coinData: IRawCoinData
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
      data: `$${coinData.current_price.toLocaleString('en-us')}`
    },
    priceChange: {
      data: {
        label: coinData.price_change_percentage_24h.toFixed(2),
        positive: coinData.price_change_percentage_24h >= 0
      }
    },
    marketCap: { data: `$${coinData.market_cap.toLocaleString('en-us')}` }
  }
}
