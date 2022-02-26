import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export default function CoinSearch() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={[
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 }
      ]}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search coin" />}
    />
  )
}
