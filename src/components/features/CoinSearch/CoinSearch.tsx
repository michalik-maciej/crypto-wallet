import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import { IFormattedCoinData } from '../../views/HomePage/HomePage.helper'
import { compareStrings } from '../../../utils/utils'

interface ICoinSearchProps {
  inputData: IFormattedCoinData[]
  // eslint-disable-next-line no-unused-vars
  setSelectedCoin: (a: string) => void
}

export default function CoinSearch({
  inputData,
  setSelectedCoin
}: ICoinSearchProps) {
  return (
    inputData && (
      <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
        <Autocomplete
          onChange={(_event, value) => {
            if (value) setSelectedCoin(value.coinId)
            else setSelectedCoin('')
          }}
          disablePortal
          id="coinSearchField"
          getOptionLabel={({ name }) => name.data.name}
          options={[...inputData].sort((a, b) =>
            compareStrings(a.name.data.name, b.name.data.name)
          )}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Coin Search" />
          )}
        />
      </Box>
    )
  )
}
