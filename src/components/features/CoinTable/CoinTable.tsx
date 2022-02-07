import React from 'react'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import shortid from 'shortid'
import { useGetAllCoinsQuery } from '../../../services/coingecko'
import CoinDataFormatter from '../CoinDataFormatter/CoinDataFormatter'
import { RawCoinData } from '../../../redux/AppStateModel'
import CoinDataTableCell from '../CoinDataTableCell/CoinDataTableCell'

function CoinTable() {
  const { isLoading, data: rawCoinsData } = useGetAllCoinsQuery(null)

  if (isLoading) return <div>Loading...</div>

  const formattedCoinsData = (rawCoinsData as RawCoinData[]).map((coin) =>
    CoinDataFormatter(coin)
  )

  return (
    <Table>
      <TableHead>
        <TableRow>
          {formattedCoinsData[0].data.map((column) => (
            <TableCell key={column.caption} sx={{ fontWeight: 'bold' }}>
              {column.caption}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {formattedCoinsData.map((coin) => (
          <TableRow key={coin.id}>
            {coin.data.map((coinData) => (
              <CoinDataTableCell key={shortid()} value={coinData.value} />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default CoinTable
