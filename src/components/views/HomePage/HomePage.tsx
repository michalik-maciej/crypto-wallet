import { useState } from 'react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import MainTable from '../../features/MainTable/MainTable'
import CoinSearch from '../../features/CoinSearch/CoinSearch'
import { IMarketQueryResponse } from '../../../services/coingecko.types'
import { useGetCoinsMarketQuery } from '../../../services/coingecko'
import QueryStatusSwitch from '../../features/QueryStatusSwitch/QueryStatusSwitch'
import DataFormatter from './HomePage.helper'

export default function HomePage() {
  const [selectedCoin, setSelectedCoin] = useState('')

  const {
    isLoading,
    isSuccess,
    error,
    data: rawData
  } = useGetCoinsMarketQuery<{
    isLoading: boolean
    isSuccess: boolean
    error: FetchBaseQueryError
    data: IMarketQueryResponse[]
  }>(null)

  const formattedData = rawData?.map((coin) => DataFormatter(coin))

  return (
    <QueryStatusSwitch queryStatus={{ isLoading, isSuccess, error }}>
      <CoinSearch
        inputData={formattedData}
        setSelectedCoin={(coinId) => setSelectedCoin(coinId)}
      />
      <MainTable inputData={formattedData} searchId={selectedCoin} />
    </QueryStatusSwitch>
  )
}
