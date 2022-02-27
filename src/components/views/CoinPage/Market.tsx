import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import { useTheme, styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

export interface IMarketProps {
  name: string
  symbol: string
  logo: string
  rank: string
  price: number | string
  priceChange: { label: string; positive: boolean }
}

const StyledChip = styled(Chip)({
  borderRadius: '8px',
  fontWeight: 'bold'
})

export default function Market({
  logo,
  name,
  symbol,
  rank,
  price,
  priceChange
}: IMarketProps) {
  const theme = useTheme()

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
