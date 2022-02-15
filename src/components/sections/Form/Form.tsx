import { useState } from 'react'
import * as yup from 'yup'
import { Box, Button, Grid } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import RadioInput from '../../common/RadioInput/RadioInput'
import TextInput from '../../common/TextInput/TextInput'

export interface IFormProps {
  id: string
  price: number
  name: string
  symbol: string
  logo: string
}

interface IFormInputs {
  pricePerCoin: number
  coinQuantity: number
  transactionType: string
}

const validationSchema = yup.object().shape({
  pricePerCoin: yup.number().positive().required(),
  coinQuantity: yup.number().positive().required(),
  transactionType: yup.string().required()
})

export default function Form({ price, symbol }: IFormProps) {
  const [coinAmount, setCoinAmount] = useState(1)
  const [coinPrice, setCoinPrice] = useState(price)
  const methods = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema)
  })

  console.log('errors: ', methods.formState.errors)

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
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
              id="coinQuantity"
              adornment=""
              label={`${symbol} quantity`}
              value={coinAmount}
              setValue={setCoinAmount}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              id="pricePerCoin"
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
