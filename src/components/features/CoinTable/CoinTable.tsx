import React from 'react'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import shortid from 'shortid'
import { useGetAllCoinsQuery } from '../../../services/coingecko'
import DataFormatter, { columnCaptions } from '../DataFormatter/DataFormatter'
import { RawCoinData } from '../../../redux/AppStateModel'
import DataTableCell from '../DataTableCell/DataTableCell'

function CoinTable() {
  const { isLoading, data: rawCoinsData } = useGetAllCoinsQuery(null)

  if (isLoading) return <div>Loading...</div>

  const formattedCoinsData = (rawCoinsData as RawCoinData[]).map((coin) =>
    DataFormatter(coin)
  )

  return (
    <Table>
      <TableHead>
        <TableRow>
          {formattedCoinsData[0].data.map((coinData) => (
            <DataTableCell
              key={shortid()}
              value={coinData.caption}
              isHeader
              isHideable={coinData.caption === columnCaptions.marketCap}
            />
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {formattedCoinsData.map((coin) => (
          <TableRow key={coin.id}>
            {coin.data.map((coinData) => (
              <DataTableCell
                key={shortid()}
                value={coinData.value}
                isHeader={false}
                isHideable={coinData.caption === columnCaptions.marketCap}
              />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default CoinTable
