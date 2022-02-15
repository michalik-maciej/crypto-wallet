import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import TextInput from '../../common/TextInput/TextInput'

export default function FormTest() {
  const [coinAmount, setCoinAmount] = useState(1)
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        <TextInput
          id="testInput"
          adornment=""
          label="test label"
          setValue={setCoinAmount}
          value={coinAmount}
        />
        <button type="submit">test</button>
      </form>
    </FormProvider>
  )
}
