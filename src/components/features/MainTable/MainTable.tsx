import React from 'react'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import { useGetAllCoinsQuery } from '../../../services/coingecko'
import { RawCoinData } from '../../../redux/AppStateModel'
import { mainTableColumnIds } from '../../../settings/settings'
import DataFormatter from './DataFormatter'
import TableCell from './TableCell'

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
          {formattedCoinsData[0].data.map(({ id, caption }) => (
            <TableCell
              key={id}
              value={caption}
              isHeader
              isHideable={id === 'marketCap'}
              href=""
            />
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {formattedCoinsData.map(({ coinId, data }) => (
          <TableRow key={coinId}>
            {data
              .filter((item) => mainTableColumnIds.includes(item.id))
              .map(({ id, value }) => (
                <TableCell
                  key={id}
                  value={value}
                  isHeader={false}
                  isHideable={id === 'marketCap'}
                  href={`/coins/${coinId}`}
                />
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default CoinTable
