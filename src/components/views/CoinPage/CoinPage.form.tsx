import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Box, Button, Grid } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Typography from '@mui/material/Typography'
import RadioInput from '../../common/RadioInput/RadioInput'
import TextInput from '../../common/TextInput/TextInput'
import { usePostTransactionMutation } from '../../../services/local'
import { getUserId } from '../../../redux/userSlice'
import { useAppSelector } from '../../../redux/hooks'
import { RootState } from '../../../redux/store'
import FeedbackAlert, {
  IFeedbackAlertProps
} from '../../common/FeedbackAlert/FeedbackAlert'
import isResponseError from '../../../services/local.helpers'

export interface IFormProps {
  originalId: string
  price: number
  ticker: string
  name: string
  logo: string
}

const validationSchema = yup.object().shape({
  pricePerCoin: yup.number().positive().required(),
  coinQuantity: yup.number().positive().required(),
  type: yup.string().required()
})

export interface ITransactionInput {
  pricePerCoin: number
  coinQuantity: number
  type: string
}

export default function Form({
  originalId,
  ticker,
  logo,
  price,
  name
}: IFormProps) {
  const [postTransaction] = usePostTransactionMutation()
  const userId = useAppSelector((state: RootState) => getUserId(state))
  const [coinAmount, setCoinAmount] = useState(1)
  const [coinPrice, setCoinPrice] = useState(price)
  const methods = useForm<ITransactionInput>({
    resolver: yupResolver(validationSchema)
  })

  const [feedbackData, setFeedbackData] = useState<IFeedbackAlertProps>({
    message: '',
    open: false,
    type: 'error'
  })

  const submitForm = async (formData: ITransactionInput) => {
    try {
      const inputData = {
        ...formData,
        userId,
        coin: { originalId, name, ticker, logo },
        timestamp: Date.now()
      }
      const { message } = await postTransaction(inputData).unwrap()
      setFeedbackData({ message, type: 'success', open: true })
    } catch (error) {
      if (isResponseError(error))
        setFeedbackData({ message: error.data, type: 'error', open: true })
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setFeedbackData({ ...feedbackData, open: false })
    }, 4000)
    return () => clearTimeout(timer)
  }, [feedbackData.open])

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        onSubmit={methods.handleSubmit(submitForm)}
      >
        {!userId && (
          <Typography variant="h5" sx={{ margin: 'auto' }}>
            Login to add transaction
          </Typography>
        )}
        {!!userId && (
          <Grid container spacing={2} sx={{ px: { xs: 2, sm: 12, md: 8 } }}>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <RadioInput groupName="type" labels={['deposit', 'withdraw']} />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                id="coinQuantity"
                adornment=""
                label={`${ticker} quantity`}
                value={coinAmount}
                setValue={setCoinAmount}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                id="pricePerCoin"
                adornment="$"
                label="Price per coin"
                value={coinPrice}
                setValue={setCoinPrice}
              />
            </Grid>
            <Grid item xs={12} sx={{ fontWeight: 'bold' }}>
              Total: ${(coinAmount * coinPrice).toLocaleString('en-us')}
            </Grid>
            <Grid item sx={{ margin: 'auto' }}>
              <Button type="submit" variant="contained">
                Add transaction
              </Button>
            </Grid>
          </Grid>
        )}
        <FeedbackAlert
          open={feedbackData.open}
          message={feedbackData.message}
          type={feedbackData.type}
        />
      </Box>
    </FormProvider>
  )
}
