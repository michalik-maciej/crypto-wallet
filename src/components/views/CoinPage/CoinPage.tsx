import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useNavigate, useParams } from 'react-router-dom'
import UndoRoundedIcon from '@mui/icons-material/UndoRounded'
import IconButton from '@mui/material/IconButton'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { IMarketQueryResponse } from '../../../services/coingecko.types'
import { useGetCoinsMarketQuery } from '../../../services/coingecko'
import QueryStatusSwitch from '../../features/QueryStatusSwitch/QueryStatusSwitch'
import Market from './CoinPage.market'
import Form from './CoinPage.form'
import { marketDataFormatter } from './CoinPage.helper'

type CoinPageParams = {
  coinId: string
}

export default function CoinPage() {
  const { coinId } = useParams<CoinPageParams>()
  const navigate = useNavigate()

  const {
    isLoading,
    error,
    isSuccess,
    data: rawMarketData
  } = useGetCoinsMarketQuery<{
    isLoading: boolean
    isSuccess: boolean
    error: FetchBaseQueryError
    data: IMarketQueryResponse[]
  }>(coinId)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let sections: any[] = []
  if (isSuccess) {
    const currentCoinMarketData = marketDataFormatter(rawMarketData[0])
    const { formProps, marketProps } = currentCoinMarketData
    sections = [
      { sectionId: 'market', component: <Market {...marketProps} /> },
      { sectionId: 'form', component: <Form {...formProps} /> }
    ]
  }

  const PaperStyle = {
    display: 'flex',
    padding: '1.5rem',
    margin: '0',
    flexDirection: 'column',
    minHeight: '100%'
  }

  return (
    <QueryStatusSwitch queryStatus={{ isLoading, isSuccess, error }}>
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
    </QueryStatusSwitch>
  )
}
