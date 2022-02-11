import { RawCoinData } from '../../../redux/coins/types'

interface DataFormatterProps {
  coinId: string
  general: { name: string; symbol: string; logo: string; rank: number }
  market: { price: number; priceChange: number }
  form: { price: number }
  chart: { price: number }
}

function DataFormatter(coinData: RawCoinData): DataFormatterProps {
  return {
    coinId: coinData.id,
    general: {
      name: coinData.name,
      symbol: coinData.symbol.toUpperCase(),
      logo: coinData.image,
      rank: coinData.market_cap_rank
    },
    market: {
      price: coinData.current_price,
      priceChange: coinData.price_change_percentage_24h
    },
    form: {
      price: coinData.current_price
    },
    chart: {
      price: coinData.current_price
    }
  }
}

export default DataFormatter
