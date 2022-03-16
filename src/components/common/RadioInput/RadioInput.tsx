import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import { capitalize } from '../../../utils/utils'

interface RadioInputProps {
  groupName: string
  labels: string[]
}

export default function RadioInput({ groupName, labels }: RadioInputProps) {
  const { register } = useFormContext()
  const theme = useTheme()

  return (
    <FormControl>
      <RadioGroup row defaultValue={labels[0].toLowerCase()} name={groupName}>
        {labels.map((label) => (
          <FormControlLabel
            {...register(groupName)}
            key={label}
            value={label.toLowerCase()}
            label={groupName !== 'subWallet' ? capitalize(label) : ''}
            control={
              <Radio
                sx={{
                  color:
                    groupName === 'subWallet'
                      ? label
                      : theme.palette.primary.main,
                  '&.Mui-checked': {
                    color:
                      groupName === 'subWallet'
                        ? label
                        : theme.palette.primary.main
                  }
                }}
              />
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
