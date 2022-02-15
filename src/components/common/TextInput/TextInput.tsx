import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { useFormContext } from 'react-hook-form'

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
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        {...register(id)}
        id={id}
        type="number"
        inputProps={{ min: 0 }}
        value={value}
        error={!!errors[id]}
        onChange={(event) =>
          setValue(
            parseFloat(event.target.value) > 0
              ? parseFloat(event.target.value)
              : 0
          )
        }
        startAdornment={
          <InputAdornment position="start">{adornment}</InputAdornment>
        }
        label={label}
      />
    </FormControl>
  )
}
