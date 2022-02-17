import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import { useTheme } from '@mui/material'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import ProgressBar from '../ProgressBar/ProgressBar'
import { IRawCoinData } from '../../../redux/coins/types'
import { useGetAllCoinsQuery } from '../../../services/coingecko'
import DataFormatter from './DataFormatter'

export default function MainTable() {
  const theme = useTheme()
  const {
    isLoading,
    isSuccess,
    error,
    data: rawCoinsData
  } = useGetAllCoinsQuery<{
    isLoading: boolean
    isSuccess: boolean
    error: FetchBaseQueryError
    data: IRawCoinData[]
  }>(null)

  const columnHeaders = [
    { id: 'rank', caption: '#' },
    { id: 'name', caption: 'Name' },
    { id: 'price', caption: 'Price' },
    { id: 'priceChange', caption: '24h %' },
    { id: 'marketCap', caption: 'Market Cap' }
  ]
  const formattedCoinsData = rawCoinsData?.map((coin) => DataFormatter(coin))

  return (
    <>
      {isLoading && <ProgressBar>Loading</ProgressBar>}
      {error && (
        <div>
          {error.status} {JSON.stringify(error.data)}
        </div>
      )}
      {isSuccess && (
        <Table>
          <TableHead>
            <TableRow>
              {columnHeaders.map(({ id, caption }) => (
                <TableCell
                  key={id}
                  sx={{
                    fontWeight: 600,
                    ...(id === 'marketCap' && {
                      display: { xs: 'none', sm: 'block' }
                    })
                  }}
                >
                  {caption}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {formattedCoinsData.map(
              ({ coinId, rank, name, price, priceChange, marketCap }) => (
                <TableRow
                  key={coinId}
                  hover
                  component={Link}
                  to={`/coins/${coinId}`}
                  sx={{ textDecoration: 'none' }}
                >
                  <TableCell>{rank.data}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        src={name.data.image}
                        sx={{ height: '1.5rem', width: '1.5rem' }}
                        alt={`${name.data.name} logo`}
                      />
                      <Box
                        sx={{
                          width: '40%',
                          display: { xs: 'none', md: 'block' }
                        }}
                      >
                        {name.data.name}
                      </Box>
                      <Box sx={{ fontWeight: 600 }}>{name.data.symbol}</Box>
                    </Stack>
                  </TableCell>
                  <TableCell>{price.data}</TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: priceChange.data.positive
                        ? theme.palette.success.main
                        : theme.palette.error.main
                    }}
                  >
                    {priceChange.data.label}
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {marketCap.data}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      )}
    </>
  )
}
