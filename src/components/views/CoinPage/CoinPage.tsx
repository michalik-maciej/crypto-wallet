import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { useNavigate, useParams } from 'react-router-dom'
import UndoRoundedIcon from '@mui/icons-material/UndoRounded'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { IMarketQuery } from '../../../services/coingecko.types'
import { useGetCoinsMarketQuery } from '../../../services/coingecko'
import Market from './Market'
import Form from './Form'
import DataFormatter from './CoinPage.helper'

type CoinPageParams = {
  coinId: string
}

export default function CoinPage() {
  const { coinId } = useParams<CoinPageParams>()
  const navigate = useNavigate()
  const { data: rawCoinsData } = useGetCoinsMarketQuery<{
    data: IMarketQuery[]
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

  const { form, market } = currentCoin
  const sections = [
    { id: 'market', component: <Market {...market} /> },
    { id: 'form', component: <Form {...form} /> }
  ]

  return (
    <Container>
      <Box
        sx={{ position: 'absolute', top: 96, right: 16 }}
        onClick={() => navigate(-1)}
      >
        <IconButton
          aria-label="back to homepage"
          size="small"
          sx={{ border: '3px solid #666', position: 'right' }}
        >
          <UndoRoundedIcon fontSize="inherit" />
        </IconButton>
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
