import { RawCoinData } from '../../../redux/AppStateModel'

export type CoinNameDataType = {
  image: string
  name: string
  symbol: string
}

interface FormattedCoinData {
  id: string
  data: {
    caption: string
    value: string | number | CoinNameDataType
  }[]
}

function CoinDataFormatter(coinData: RawCoinData): FormattedCoinData {
  return {
    id: coinData.id,
    data: [
      { caption: 'Rank', value: coinData.market_cap_rank },
      {
        caption: 'Name',
        value: {
          image: coinData.image,
          name: coinData.name,
          symbol: coinData.symbol
        }
      },
      { caption: 'Price', value: coinData.current_price },
      { caption: '24h %', value: coinData.price_change_percentage_24h },
      { caption: 'Market Cap', value: coinData.market_cap }
    ]
  }
}

export default CoinDataFormatter
