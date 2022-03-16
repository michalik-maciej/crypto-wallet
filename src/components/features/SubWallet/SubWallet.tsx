import { useState } from 'react'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TableBody from '@mui/material/TableBody'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { ISingleAsset } from '../../views/Portfolio/Portfolio.helper'
import { formatToUSD } from '../../../utils/utils'

export interface ISubWalletProps {
  assets: ISingleAsset[]
  total: { holdings: number; netCost: number }
}

export default function SubWallet({ assets, total }: ISubWalletProps) {
  const navigate = useNavigate()
  const [columnHeaders] = useState([
    { id: 'name', caption: 'Name' },
    { id: 'price', caption: 'Price' },
    { id: 'holdings', caption: 'Holdings' }
  ])

  const totalBalance = [
    {
      id: 'netCost',
      caption: 'Invested',
      value: formatToUSD(total.netCost)
    },
    {
      id: 'profit',
      caption: 'Profit',
      value: formatToUSD(total.holdings - total.netCost)
    }
  ]

  return (
    <>
      {!!assets.length &&
        totalBalance.map((item) => (
          <Box key={item.id}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600 }}
              data-testid="portfolio-heading"
            >
              {item.caption}
            </Typography>
            <Typography variant="h5">{item.value}</Typography>
          </Box>
        ))}
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
          {assets.map(({ coin, currentPrice, holdings }) => (
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
              <TableCell>{formatToUSD(currentPrice)}</TableCell>
              <TableCell>
                {' '}
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ fontWeight: 600 }}>
                    {formatToUSD(holdings.usd)}
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
  )
}
