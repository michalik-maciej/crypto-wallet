import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

export interface IMarketProps {
  symbol: string
  name: string
  logo: string
  rank: string
  price: number | string
  priceChange: { label: string; positive: boolean }
}

const StyledChip = {
  borderRadius: '8px',
  fontWeight: 'bold'
}

export default function Market({
  logo,
  symbol,
  name,
  rank,
  price,
  priceChange
}: IMarketProps) {
  const theme = useTheme()

  return (
    <Grid container spacing={2} sx={{ px: { xs: 0, sm: 12, md: 6 } }}>
      <Grid item xs={12}>
        {' '}
        <Stack
          spacing={2}
          direction="row"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {price}
          </Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex'
        }}
      >
        <Stack spacing={1} direction="row" sx={{ flexWrap: 'wrap' }}>
          <Chip sx={StyledChip} label={symbol} />
          <Chip
            sx={StyledChip}
            avatar={<Avatar alt={`${symbol} logo`} src={logo} />}
            label={`Rank ${rank}`}
          />
          <Chip
            label={priceChange.label}
            sx={{
              ...StyledChip,
              color: 'white',
              backgroundColor: priceChange.positive
                ? theme.palette.success.main
                : theme.palette.error.main
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  )
}
