import React, { useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import RadioInput from '../../common/RadioInput/RadioInput'
import TextInput from '../../common/TextInput/TextInput'

export interface FormProps {
  id: string
  price: number
  name: string
  symbol: string
  logo: string
}

export default function Form({ id, logo, name, price, symbol }: FormProps) {
  const [coinAmount, setCoinAmount] = useState(1)
  const [coinPrice, setCoinPrice] = useState(price)
  const { register, handleSubmit } = useForm()

  console.log(id, logo, name, symbol)
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <RadioInput
            groupName="transactionTypes"
            labels={['deposit', 'withdraw']}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            id="input-amount"
            adornment=""
            label={`${symbol} quantity`}
            value={coinAmount}
            setValue={setCoinAmount}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            id="input-price"
            adornment="$"
            label="Price per coin"
            value={coinPrice}
            setValue={setCoinPrice}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ fontWeight: 'bold' }}>
          Total: ${(coinAmount * coinPrice).toLocaleString('en-us')}
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained">
            Add transaction
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
