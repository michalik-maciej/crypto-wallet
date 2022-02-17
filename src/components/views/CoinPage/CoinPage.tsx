import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { Link, useParams } from 'react-router-dom'
import UndoRoundedIcon from '@mui/icons-material/UndoRounded'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { IRawCoinData } from '../../../redux/coins/types'
import { useGetAllCoinsQuery } from '../../../services/coingecko'
import Market from '../../sections/Market/Market'
import Form from '../../sections/Form/Form'
import DataFormatter from './DataFormatter'

type CoinPageParams = {
  coinId: string
}

export default function CoinPage() {
  const { coinId } = useParams<CoinPageParams>()
  const { data: rawCoinsData } = useGetAllCoinsQuery<{
    data: IRawCoinData[]
  }>(null)

  const currentCoinRaw = rawCoinsData.find((coin) => coin.id === coinId)
  let currentCoin
  if (!currentCoinRaw) {
    currentCoin = DataFormatter(rawCoinsData[0])
  } else {
    currentCoin = DataFormatter(currentCoinRaw)
  }

  const StyledPaper = styled(Paper)({
    display: 'flex',
    padding: '1.5rem',
    margin: '0',
    flexDirection: 'column'
  })

  const { form, market, chart } = currentCoin
  const sections = [
    { id: 'market', component: <Market data={market} /> },
    { id: 'form', component: <Form {...form} /> }
    // { id: 'chart', component: <Chart>chart</Chart> }
  ]

  return (
    <Container>
      <Box sx={{ position: 'absolute', top: 96, right: 16 }}>
        <Link to="/">
          <IconButton
            aria-label="back to homepage"
            size="small"
            sx={{ border: '3px solid #666', position: 'right' }}
          >
            <UndoRoundedIcon fontSize="inherit" />
          </IconButton>
        </Link>
      </Box>
      <Grid container spacing={1}>
        {sections.map(({ id, component }) => (
          <Grid key={id} item xs={12} md={6}>
            <StyledPaper elevation={3}>{component}</StyledPaper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
