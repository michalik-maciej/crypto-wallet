import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

interface FormProps {
  symbols: string[]
}

function Form() {
  const [spendCurrency, setSpendCurrency] = useState('USD')
  const [receiveCurrency, setReceiveCurrency] = useState('BTC')
  return (
    <Box
      component="form"
      noValidate
      onSubmit={(event: React.FormEvent) => event.preventDefault()}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Select
            autoWidth
            value={spendCurrency}
            onChange={(event: SelectChangeEvent) =>
              setSpendCurrency(event.target.value)
            }
          >
            <MenuItem value="USD">USD</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            autoWidth
            value={receiveCurrency}
            onChange={(event: SelectChangeEvent) =>
              setReceiveCurrency(event.target.value)
            }
          >
            <MenuItem value="BTC">BTC</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <Button size="small" variant="contained">
            Add Transaction
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Form
