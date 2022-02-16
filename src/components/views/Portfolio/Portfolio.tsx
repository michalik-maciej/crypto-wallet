import { Box } from '@mui/material'
import { useGetCoinByIdQuery } from '../../../services/coingecko'
import { useGetUserTransactionsQuery } from '../../../services/local'
import dataFormatter, { ITransactionQuery } from './dataFormatter'

export default function Portfolio() {
  const { data: transactions } =
    useGetUserTransactionsQuery<{ data: ITransactionQuery[] }>('test@email')
  const coinIds = transactions?.map(({ coinId }) => coinId)
  const { data: currentPrices } = useGetCoinByIdQuery(
    [...new Set(coinIds)].join('%2C')
  )
  console.log(currentPrices)

  console.log(dataFormatter({ transactions, currentPrices }))
  return <Box>box</Box>
}
