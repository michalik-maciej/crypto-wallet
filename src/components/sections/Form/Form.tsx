import { useState } from 'react'
import * as yup from 'yup'
import { Box, Button, Grid } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import RadioInput from '../../common/RadioInput/RadioInput'
import TextInput from '../../common/TextInput/TextInput'
import { usePostTransactionMutation } from '../../../services/local'
import { selectUserId } from '../../../redux/user/userSlice'
import { useAppSelector } from '../../../redux/hooks'

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
  type: string
}

const validationSchema = yup.object().shape({
  pricePerCoin: yup.number().positive().required(),
  coinQuantity: yup.number().positive().required(),
  type: yup.string().required()
})

export default function Form({ id, price, symbol }: IFormProps) {
  const [postTransaction, postTransactionResult] = usePostTransactionMutation()
  const user = useAppSelector((state) => selectUserId(state))
  const [coinAmount, setCoinAmount] = useState(1)
  const [coinPrice, setCoinPrice] = useState(price)
  const methods = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema)
  })

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        onSubmit={methods.handleSubmit((formData) => {
          if (!user) {
            console.log('need to login to add transaction!')
            return
          }
          const payload = {
            ...formData,
            userId: user,
            coinId: id,
            timestamp: Date.now()
          }
          postTransaction(payload)
        })}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <RadioInput groupName="type" labels={['deposit', 'withdraw']} />
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
