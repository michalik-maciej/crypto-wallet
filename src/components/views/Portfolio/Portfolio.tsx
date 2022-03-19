import { useState } from 'react'
import Box from '@mui/material/Box'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import Typography from '@mui/material/Typography'
import { RootState } from '../../../redux/store'
import { useGetUserTransactionsQuery } from '../../../services/local'
import { useGetCurrentPriceQuery } from '../../../services/coingecko'
import { IPriceQueryResponse } from '../../../services/coingecko.types'
import { useAppSelector } from '../../../redux/hooks'
import { getUserId, getIsAdmin } from '../../../redux/userSlice'
import { IUserQueryResponse } from '../../../services/local.types'
import Tabs from '../../common/Tabs/Tabs'
import portfolioSettings from '../../../settings/settings'
import SubWallet from '../../features/SubWallet/SubWallet'
import QueryStatusSwitch from '../../features/QueryStatusSwitch/QueryStatusSwitch'
import dataFormatter from './Portfolio.helper'

export default function Portfolio() {
  const admin = useAppSelector((state: RootState) => getIsAdmin(state))
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

  const [currentSubWallet, setCurrentSubWallet] = useState(portfolioSettings[0])
  const coinIds = rawUserData?.coins?.map(({ originalId }) => originalId)
  const { data: currentPrices } = useGetCurrentPriceQuery<{
    data: Record<string, IPriceQueryResponse>
  }>(coinIds?.join('%2C'))

  const { assets, total, portfolioId } = dataFormatter(
    rawUserData,
    currentPrices
  ).find(({ portfolioId: id }) => id.label === currentSubWallet.label) || {
    portfolioId: currentSubWallet,
    assets: [],
    total: { netCost: 0, holdings: 0 }
  }

  return (
    <QueryStatusSwitch queryStatus={{ isLoading, isSuccess, error }}>
      {admin && (
        <Tabs
          tabConfig={portfolioSettings}
          getValue={currentSubWallet.label}
          setValue={(tabInput) =>
            setCurrentSubWallet(
              portfolioSettings.find((wallet) => wallet.label === tabInput)!
            )
          }
        />
      )}
      <Box sx={{ m: 2 }}>
        {!assets.length && (
          <Typography variant="h4">Add your first transaction</Typography>
        )}
      </Box>
      {!!assets.length && (
        <SubWallet assets={assets} total={total} portfolioId={portfolioId} />
      )}
    </QueryStatusSwitch>
  )
}
