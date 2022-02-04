import React from 'react'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import { useGetAllCoinsQuery } from '../../../services/coingecko'

function CoinTable() {
  const coins = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      current_price: 40709,
      market_cap: 771386171220,
      market_cap_rank: 1,
      fully_diluted_valuation: 854886159087,
      total_volume: 24690374005,
      high_24h: 40872,
      low_24h: 36439,
      price_change_24h: 4206.72,
      price_change_percentage_24h: 11.52457,
      market_cap_change_24h: 79742092855,
      market_cap_change_percentage_24h: 11.52935,
      circulating_supply: 18948850,
      total_supply: 21000000,
      max_supply: 21000000,
      ath: 69045,
      ath_change_percentage: -40.91256,
      ath_date: '2021-11-10T14:24:11.849Z',
      atl: 67.81,
      atl_change_percentage: 60064.26587,
      atl_date: '2013-07-06T00:00:00.000Z',
      roi: null,
      last_updated: '2022-02-04T20:34:34.012Z'
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
      current_price: 2964.02,
      market_cap: 353816486647,
      market_cap_rank: 2,
      fully_diluted_valuation: null,
      total_volume: 18939097444,
      high_24h: 2974.25,
      low_24h: 2590.72,
      price_change_24h: 366.07,
      price_change_percentage_24h: 14.09073,
      market_cap_change_24h: 43538371290,
      market_cap_change_percentage_24h: 14.03205,
      circulating_supply: 119445701.624,
      total_supply: null,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -39.1402,
      ath_date: '2021-11-10T14:24:19.604Z',
      atl: 0.432979,
      atl_change_percentage: 685591.5348,
      atl_date: '2015-10-20T00:00:00.000Z',
      roi: {
        times: 96.35382875605082,
        currency: 'btc',
        percentage: 9635.382875605083
      },
      last_updated: '2022-02-04T20:35:43.251Z'
    }
  ]

  /*   function destructureCoinData(coinData) {
    const {
      id,
      symbol,
      name,
      image,
      current_price: currentPrice,
      market_cap: marketCap,
      market_cap_rank: marketCapRank,
      price_change_percentage_24h: priceChangePercentageDaily
    } = coinData

    return {}
  } */

  const {
    id,
    symbol,
    name,
    image,
    current_price: currentPrice,
    market_cap: marketCap,
    market_cap_rank: marketCapRank,
    price_change_percentage_24h: priceChangePercentageDaily
  } = coins[0]

  const columns = [
    { caption: 'Rank', data: marketCapRank },
    { caption: 'Name', data: name },
    { caption: 'Price', data: currentPrice },
    { caption: '24h %', data: priceChangePercentageDaily }
  ]

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell>{column.caption}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {columns.map((column) => (
            <TableCell>{column.data}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default CoinTable
