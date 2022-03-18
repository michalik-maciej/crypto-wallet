import { useState } from 'react'
import Box from '@mui/material/Box'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import Typography from '@mui/material/Typography'
import { RootState } from '../../../redux/store'
import { useGetUserTransactionsQuery } from '../../../services/local'
import { useGetCurrentPriceQuery } from '../../../services/coingecko'
import { IPriceQueryResponse } from '../../../services/coingecko.types'
import { useAppSelector } from '../../../redux/hooks'
import { getUserId } from '../../../redux/userSlice'
import { IUserQueryResponse } from '../../../services/local.types'
import Tabs from '../../common/Tabs/Tabs'
import portfolioSettings from '../../../settings/settings'
import SubWallet from '../../features/SubWallet/SubWallet'
import QueryStatusSwitch from '../../features/QueryStatusSwitch/QueryStatusSwitch'
import dataFormatter from './Portfolio.helper'

export default function Portfolio() {
  const userId = useAppSelector((state: RootState) => getUserId(state))

  const {
    isLoading,
    isSuccess,
    error,
    data: rawUserData
  } = useGetUserTransactionsQuery<{
    isLoading: boolean
    isSuccess: boolean
    error: FetchBaseQueryError
    data: IUserQueryResponse
  }>(userId)

  const [currentSubWalletLabel, setCurrentSubWalletLabel] = useState(
    portfolioSettings[0].label
  )
  const coinIds = rawUserData?.coins?.map(({ originalId }) => originalId)
  const { data: currentPrices } = useGetCurrentPriceQuery<{
    data: Record<string, IPriceQueryResponse>
  }>(coinIds?.join('%2C'))

  const { assets, total } = dataFormatter(rawUserData, currentPrices).find(
    ({ id }) => id === currentSubWalletLabel
  ) || { assets: [], total: { netCost: 0, holdings: 0 } }

  return (
    <QueryStatusSwitch queryStatus={{ isLoading, isSuccess, error }}>
      {userId === `622de8e0af979f16e7bdb670` && (
        <Tabs
          tabConfig={portfolioSettings}
          getValue={currentSubWalletLabel}
          setValue={setCurrentSubWalletLabel}
        />
      )}
      <Box sx={{ m: 2 }}>
        {!assets.length && (
          <Typography variant="h4">Add your first transaction</Typography>
        )}
      </Box>
      {!!assets.length && <SubWallet assets={assets} total={total} />}
    </QueryStatusSwitch>
  )
}
