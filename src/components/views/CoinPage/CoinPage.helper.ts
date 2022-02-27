import { IMarketQuery } from '../../../services/coingecko.types'
import { IFormProps } from './Form'
import { IMarketProps } from './Market'

export interface IDataFormatterProps {
  coinId: string
  market: IMarketProps
  form: IFormProps
}

export default function DataFormatter(
  coinData: IMarketQuery
): IDataFormatterProps {
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
    }
  }
}
