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

export const columnCaptions = {
  rank: '#',
  name: 'Name',
  price: 'Price',
  priceChangeDaily: '24h %',
  marketCap: 'Market Cap'
}

function DataFormatter(coinData: RawCoinData): FormattedCoinData {
  return {
    id: coinData.id,
    data: [
      { caption: columnCaptions.rank, value: coinData.market_cap_rank },
      {
        caption: columnCaptions.name,
        value: {
          image: coinData.image,
          name: coinData.name,
          symbol: coinData.symbol.toUpperCase()
        }
      },
      {
        caption: columnCaptions.price,
        value: `$${coinData.current_price.toLocaleString('en-us')}`
      },
      {
        caption: columnCaptions.priceChangeDaily,
        value: coinData.price_change_percentage_24h.toFixed(2)
      },
      {
        caption: columnCaptions.marketCap,
        value: `$${coinData.market_cap.toLocaleString('en-us')}`
      }
    ]
  }
}

export default DataFormatter
