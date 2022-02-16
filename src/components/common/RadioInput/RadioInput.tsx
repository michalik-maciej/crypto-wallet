import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { capitalize } from '../../../utils/utils'

interface RadioInputProps {
  groupName: string
  labels: string[]
}

export default function RadioInput({ groupName, labels }: RadioInputProps) {
  const { register } = useFormContext()

  return (
    <FormControl>
      <RadioGroup row defaultValue={labels[0].toLowerCase()} name={groupName}>
        {labels.map((label) => (
          <FormControlLabel
            {...register(groupName)}
            value={label.toLowerCase()}
            control={<Radio />}
            label={capitalize(label)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
