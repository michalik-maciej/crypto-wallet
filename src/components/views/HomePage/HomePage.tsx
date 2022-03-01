import { useState } from 'react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import MainTable from '../../features/MainTable/MainTable'
import CoinSearch from '../../features/CoinSearch/CoinSearch'
import ProgressBar from '../../common/ProgressBar/ProgressBar'
import { IMarketQuery } from '../../../services/coingecko.types'
import { useGetCoinsMarketQuery } from '../../../services/coingecko'
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
    data: IMarketQuery[]
  }>(null)

  const formattedData = rawData?.map((coin) => DataFormatter(coin))

  return (
    <>
      {isLoading && <ProgressBar>Loading</ProgressBar>}
      {error && (
        <div>
          {error.status} {JSON.stringify(error.data)}
        </div>
      )}
      {isSuccess && (
        <>
          <CoinSearch
            inputData={formattedData}
            setSelectedCoin={(coinId) => setSelectedCoin(coinId)}
          />
          <MainTable inputData={formattedData} searchId={selectedCoin} />
        </>
      )}
    </>
  )
}
