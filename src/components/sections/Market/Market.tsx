import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import { useTheme, styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

interface MarketProps {
  data: any
}

const StyledChip = styled(Chip)({
  borderRadius: '8px',
  fontWeight: 'bold'
})

export default function Market({ data }: MarketProps) {
  const theme = useTheme()
  const { logo, name, symbol, rank, price, priceChange } = data

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
        <StyledChip label={symbol} />
        <StyledChip
          avatar={<Avatar alt={`${name} logo`} src={logo} />}
          label={`Rank ${rank}`}
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {price}
        </Typography>
        <StyledChip
          label={priceChange.label}
          sx={{
            color: 'white',
            backgroundColor: priceChange.positive
              ? theme.palette.success.main
              : theme.palette.error.main
          }}
        />
      </Stack>
    </>
  )
}
