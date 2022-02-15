import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { useParams } from 'react-router-dom'
import Chart from '../../sections/Chart/Chart'
import Form from '../../sections/Form/Form'
import General from '../../sections/General/General'
import Market from '../../sections/Market/Market'
import { RawCoinData } from '../../../redux/coins/types'
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
    data: RawCoinData[]
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
    height: '600px',
    padding: '2rem',
    margin: '0 2rem',
    flexDirection: 'column'
  })

  const { general, form, market, chart } = currentCoin
  const sections = [
    // { id: 'general', component: <General data={general} /> },
    // { id: 'market', component: <Market>price</Market> },
    { id: 'form', component: <Form {...form} /> }
    // { id: 'chart', component: <Chart>chart</Chart> }
  ]

  return (
    <Container>
      <Grid container spacing={4} mt={4}>
        {sections.map(({ id, component }) => (
          <Grid key={id} item xs={12} md={6}>
            <StyledPaper>{component}</StyledPaper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
