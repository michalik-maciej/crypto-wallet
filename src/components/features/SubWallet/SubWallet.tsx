import { useState } from 'react'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'
import TableBody from '@mui/material/TableBody'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { ISingleAsset } from '../../views/Portfolio/Portfolio.helper'
import { formatToUSD } from '../../../utils/utils'
import { IPortfolioSettings } from '../../../settings/settings'

export interface ISubWalletProps {
  assets: ISingleAsset[]
  total: { holdings: number; netCost: number }
  portfolioId: IPortfolioSettings
}

const StyledTableCell = styled(TableCell)({
  borderBottom: 'none'
})

export default function SubWallet({
  assets,
  total,
  portfolioId
}: ISubWalletProps) {
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
      id: 'currentValue',
      caption: 'Current value',
      value: formatToUSD(total.holdings)
    },
    {
      id: 'profit',
      caption: 'Profit',
      value: formatToUSD(total.holdings - total.netCost)
    }
  ]

  return (
    <>
      <Container
        sx={{
          backgroundColor: 'grey[100]',
          border: `2px solid ${portfolioId.color}`,
          borderRadius: 1
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 5 }}
          sx={{
            justifyContent: 'center',
            py: 3
          }}
        >
          {!!assets.length &&
            totalBalance.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: portfolioId.color }}
                >
                  {item.caption}
                </Typography>
                <Chip
                  variant="outlined"
                  data-testid={`portfolio-${portfolioId.label}-${item.id}`}
                  label={item.value}
                  sx={{ fontWeight: 600, fontSize: 20 }}
                />
              </Box>
            ))}
        </Stack>
      </Container>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              borderBottom: `1px dotted ${portfolioId.color}`
            }}
          >
            {columnHeaders.map(({ id, caption }) => (
              <StyledTableCell
                key={id}
                sx={{
                  fontWeight: 600,
                  borderBottom: 'none',
                  ...(id === 'marketCap' && {
                    display: { xs: 'none', sm: 'block' }
                  })
                }}
              >
                {caption}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map(({ coin, currentPrice, holdings }) => (
            <TableRow
              key={coin.originalId}
              hover
              onClick={() => navigate(`/coins/${coin.originalId}`)}
              sx={{
                textDecoration: 'none',
                cursor: 'pointer',
                borderBottom: `1px dotted ${portfolioId.color}`
              }}
            >
              <StyledTableCell>
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
              </StyledTableCell>
              <StyledTableCell>{formatToUSD(currentPrice)}</StyledTableCell>
              <StyledTableCell>
                {' '}
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ fontWeight: 600 }}>
                    {formatToUSD(holdings.usd)}
                  </Box>
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    {holdings.original} {coin.symbol}
                  </Box>
                </Stack>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
