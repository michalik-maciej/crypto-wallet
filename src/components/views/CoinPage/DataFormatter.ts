import { IMarketQuery } from '../../../services/coingecko.types'

export interface DataFormatterProps {
  coinId: string
  market: {
    name: string
    symbol: string
    logo: string
    rank: string
    price: number | string
    priceChange: { label: string; positive: boolean }
  }
  form: {
    originalId: string
    price: number
    name: string
    symbol: string
    logo: string
  }
  chart: { price: number }
}

export default function DataFormatter(
  coinData: IMarketQuery
): DataFormatterProps {
  return {
    coinId: coinData.id,
    market: {
      name: coinData.name,
      symbol: coinData.symbol.toUpperCase(),
      logo: coinData.image,
      rank: `#${coinData.market_cap_rank}`,
      price: `$${coinData.current_price.toLocaleString('en-us')}`,
      priceChange: {
        label: `${coinData.price_change_percentage_24h.toFixed(2)}%`,
        positive: coinData.price_change_percentage_24h >= 0
      }
    },
    form: {
      originalId: coinData.id,
      price: coinData.current_price,
      name: coinData.name,
      symbol: coinData.symbol.toUpperCase(),
      logo: coinData.image
    },
    chart: {
      price: coinData.current_price
    }
  }
}
