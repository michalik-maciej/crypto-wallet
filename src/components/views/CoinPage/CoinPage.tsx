import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useNavigate, useParams } from 'react-router-dom'
import UndoRoundedIcon from '@mui/icons-material/UndoRounded'
import IconButton from '@mui/material/IconButton'
import { IChartQuery, IMarketQuery } from '../../../services/coingecko.types'
import {
  useGetCoinChartQuery,
  useGetCoinsMarketQuery
} from '../../../services/coingecko'
import Market from './CoinPage.market'
import Form from './CoinPage.form'
import { marketDataFormatter } from './CoinPage.helper'

type CoinPageParams = {
  coinId: string
}

export default function CoinPage() {
  const { coinId } = useParams<CoinPageParams>()
  const navigate = useNavigate()
  const { data: rawMarketData } = useGetCoinsMarketQuery<{
    data: IMarketQuery[]
  }>(null)

  const { data: rawChartData } = useGetCoinChartQuery<{
    data: IChartQuery
  }>(coinId)

  const currentCoinRawMarketData = rawMarketData.find(
    (coin) => coin.id === coinId
  )
  let currentCoinMarketData
  if (currentCoinRawMarketData && rawChartData) {
    currentCoinMarketData = marketDataFormatter(currentCoinRawMarketData)
  } else {
    currentCoinMarketData = marketDataFormatter(rawMarketData[0])
  }

  const PaperStyle = {
    display: 'flex',
    padding: '1.5rem',
    margin: '0',
    flexDirection: 'column',
    minHeight: '100%'
  }

  const { formProps, marketProps } = currentCoinMarketData
  const sections = [
    { sectionId: 'market', component: <Market {...marketProps} /> },
    { sectionId: 'form', component: <Form {...formProps} /> }
  ]

  return (
    <Container>
      <Grid container spacing={2} sx={{}}>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
        >
          <IconButton
            aria-label="back to homepage"
            size="small"
            onClick={() => navigate(-1)}
            sx={{
              border: '3px solid #666'
            }}
          >
            <UndoRoundedIcon fontSize="inherit" />
          </IconButton>
        </Grid>
        {sections.map(({ sectionId, component }) => (
          <Grid key={sectionId} item xs={12} md={6}>
            <Paper sx={PaperStyle} elevation={3}>
              {component}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
