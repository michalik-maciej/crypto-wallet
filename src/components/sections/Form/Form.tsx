import React, { useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import RadioInput from '../../common/RadioInput/RadioInput'
import TextInput from '../../common/TextInput/TextInput'

export interface FormProps {
  id: string
  price: number
  name: string
  symbol: string
  logo: string
}

export default function Form({ price, symbol }: FormProps) {
  const [coinAmount, setCoinAmount] = useState(1)
  const [coinPrice, setCoinPrice] = useState(price)
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        onSubmit={methods.handleSubmit((data) => console.log(data))}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <RadioInput
              groupName="transactionType"
              labels={['deposit', 'withdraw']}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              id="inputAmount"
              adornment=""
              label={`${symbol} quantity`}
              value={coinAmount}
              setValue={setCoinAmount}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              id="inputPrice"
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
    </FormProvider>
  )
}
