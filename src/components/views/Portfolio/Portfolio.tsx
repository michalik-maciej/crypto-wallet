import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import TableCell from '@mui/material/TableCell'
import { useTheme } from '@mui/material'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { useGetUserTransactionsQuery } from '../../../services/local'
import { useGetCoinByIdQuery } from '../../../services/coingecko'
import dataFormatter, { ITransactionQuery } from './dataFormatter'

export default function Portfolio() {
  const theme = useTheme()
  const {
    isLoading,
    isSuccess,
    error,
    data: transactions
  } = useGetUserTransactionsQuery<{
    isLoading: boolean
    isSuccess: boolean
    error: FetchBaseQueryError
    data: ITransactionQuery[]
  }>('test@email')
  const coinIds = transactions?.map(({ coinId }) => coinId)
  const { data: currentPrices } = useGetCoinByIdQuery(
    [...new Set(coinIds)].join('%2C')
  )
  const formattedCoinsData = dataFormatter({ transactions, currentPrices })
  const columnHeaders = [
    { id: 'name', caption: 'Name' },
    { id: 'price', caption: 'Price' },
    { id: 'holdings', caption: 'Holdings' }
  ]

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && (
        <div>
          {error?.status} {JSON.stringify(error?.data)}{' '}
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
            {formattedCoinsData.map(({ coinId, currentPrice, holdings }) => (
              <TableRow
                key={coinId}
                hover
                component={Link}
                to={`/coins/${coinId}`}
                sx={{ textDecoration: 'none' }}
              >
                <TableCell>{coinId}</TableCell>
                <TableCell>{currentPrice}</TableCell>
                <TableCell>
                  {' '}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ fontWeight: 600 }}>${holdings.usd}</Box>
                    <Box>
                      {holdings.original} {coinId}
                    </Box>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
