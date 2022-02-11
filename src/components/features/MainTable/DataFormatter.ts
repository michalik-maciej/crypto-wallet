import { RawCoinData } from '../../../redux/coins/types'

export type CoinNameDataType = {
  image: string
  name: string
  symbol: string
}

interface FormattedCoinData {
  coinId: string
  data: {
    id: string
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
    coinId: coinData.id,
    data: [
      {
        id: 'rank',
        caption: columnCaptions.rank,
        value: coinData.market_cap_rank
      },
      {
        id: 'name',
        caption: columnCaptions.name,
        value: {
          image: coinData.image,
          name: coinData.name,
          symbol: coinData.symbol.toUpperCase()
        }
      },
      {
        id: 'price',
        caption: columnCaptions.price,
        value: `$${coinData.current_price.toLocaleString('en-us')}`
      },
      {
        id: 'priceChange',
        caption: columnCaptions.priceChangeDaily,
        value: coinData.price_change_percentage_24h.toFixed(2)
      },
      {
        id: 'marketCap',
        caption: columnCaptions.marketCap,
        value: `$${coinData.market_cap.toLocaleString('en-us')}`
      }
    ]
  }
}

export default DataFormatter
