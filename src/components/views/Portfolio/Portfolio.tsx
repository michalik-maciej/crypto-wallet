import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import TableCell from '@mui/material/TableCell'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { RootState } from '../../../redux/store'
import { useGetUserTransactionsQuery } from '../../../services/local'
import { useGetCurrentPriceQuery } from '../../../services/coingecko'
import { IPriceQuery } from '../../../services/coingecko.types'
import { useAppSelector } from '../../../redux/hooks'
import { getUserId } from '../../../redux/userSlice'
import { IUserQuery } from '../../../services/local.types'
import ProgressBar from '../../common/ProgressBar/ProgressBar'
import dataFormatter from './Portfolio.helper'

export default function Portfolio() {
  const navigate = useNavigate()
  const userId = useAppSelector((state: RootState) => getUserId(state))

  const {
    isLoading,
    isSuccess,
    error,
    data: rawUserData
  } = useGetUserTransactionsQuery<{
    isLoading: boolean
    isSuccess: boolean
    error: FetchBaseQueryError
    data: IUserQuery
  }>(userId)

  const coinIds = rawUserData?.coins?.map(({ originalId }) => originalId)
  const { data: currentPrices } = useGetCurrentPriceQuery<{
    data: Record<string, IPriceQuery>
  }>(coinIds?.join('%2C'))
  const userData = dataFormatter(rawUserData, currentPrices)

  const columnHeaders = [
    { id: 'name', caption: 'Name' },
    { id: 'price', caption: 'Price' },
    { id: 'holdings', caption: 'Holdings' }
  ]

  return (
    <>
      {isLoading && <ProgressBar>Loading</ProgressBar>}
      {error && (
        <div>
          {error?.status} {JSON.stringify(error?.data)}{' '}
        </div>
      )}
      {isSuccess && !!userData.assets.length && (
        <>
          <h2>Portfolio ${userData.total.toLocaleString('en-us')}</h2>
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
              {userData.assets.map(({ coin, currentPrice, holdings }) => (
                <TableRow
                  key={coin.originalId}
                  hover
                  onClick={() => navigate(`/coins/${coin.originalId}`)}
                  sx={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        src={coin.logo}
                        sx={{ height: '1.5rem', width: '1.5rem' }}
                        alt={`${coin.name} logo`}
                      />
                      <Box
                        sx={{
                          width: '40%',
                          display: { xs: 'none', md: 'block' }
                        }}
                      >
                        {coin.name}
                      </Box>
                      <Box sx={{ fontWeight: 600 }}>{coin.symbol}</Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    $
                    {currentPrice.toLocaleString('en-US', {
                      maximumFractionDigits: 2
                    })}
                  </TableCell>
                  <TableCell>
                    {' '}
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box sx={{ fontWeight: 600 }}>
                        $
                        {holdings.usd.toLocaleString('en-US', {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2
                        })}
                      </Box>
                      <Box>
                        {holdings.original} {coin.symbol}
                      </Box>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  )
}
