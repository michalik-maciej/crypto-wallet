import React from 'react'
import {
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel
} from '@mui/material'
import ConnectForm from '../../features/ConnectForm/ConnectForm'

interface TextInputProps {
  adornment: string
  id: string
  value: number
  label: string
  setValue: React.Dispatch<React.SetStateAction<number>>
}

export default function TextInput({
  adornment,
  id,
  value,
  label,
  setValue
}: TextInputProps) {
  return (
    <ConnectForm>
      {({ register }: any) => (
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <OutlinedInput
            {...register(id)}
            id={id}
            type="number"
            inputProps={{ min: 0 }}
            value={value}
            onChange={(event) =>
              !Number.isNaN(parseFloat(event.target.value)) &&
              setValue(parseFloat(event.target.value))
            }
            startAdornment={
              <InputAdornment position="start">{adornment}</InputAdornment>
            }
            label={label}
          />
        </FormControl>
      )}
    </ConnectForm>
  )
}
