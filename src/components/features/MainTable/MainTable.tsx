import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { RawCoinData } from '../../../redux/coins/types'
import { mainTableColumnIds } from '../../../settings/settings'
import { useGetAllCoinsQuery } from '../../../services/coingecko'
import TableCell from './TableCell'
import DataFormatter from './DataFormatter'

export default function MainTable() {
  const { isLoading, data: rawCoinsData } =
    useGetAllCoinsQuery<{ isLoading: boolean; data: RawCoinData[] }>(null)

  if (isLoading) return <div>Loading...</div>

  const formattedCoinsData = rawCoinsData.map((coin) => DataFormatter(coin))

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
