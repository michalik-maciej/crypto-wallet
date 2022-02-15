import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { useParams, Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Chart from '../../sections/Chart/Chart'
import Form from '../../sections/Form/Form'
import Market from '../../sections/Market/Market'

import { IRawCoinData } from '../../../redux/coins/types'
import {
  useGetAllCoinsQuery,
  useGetCoinByIdQuery
} from '../../../services/coingecko'
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
    padding: '2rem',
    margin: '0 2rem',
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
      <Button variant="contained" component={Link} to="/">
        Back
      </Button>
      <Grid container spacing={1} mt={4}>
        {sections.map(({ id, component }) => (
          <Grid key={id} item xs={12} md={6}>
            <StyledPaper>{component}</StyledPaper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
