import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import ProgressBar from '../../common/ProgressBar/ProgressBar'

interface IQueryStatusSwitchProps {
  queryStatus: {
    isLoading: boolean
    error: FetchBaseQueryError
    isSuccess: boolean
  }
  children: React.ReactNode
}

export default function QueryStatusSwitch({
  queryStatus,
  children
}: IQueryStatusSwitchProps) {
  const { isLoading, error, isSuccess } = queryStatus

  return (
    <>
      {isLoading && <ProgressBar>Loading</ProgressBar>}
      {error && (
        <div>
          {error.status} {JSON.stringify(error.data)}
        </div>
      )}
      {isSuccess && children}
    </>
  )
}
