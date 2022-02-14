import React from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import ConnectForm from '../../features/ConnectForm/ConnectForm'
import capitalize from '../../../utils/capitalize'

interface RadioInputProps {
  groupName: string
  labels: string[]
}

export default function RadioInput({ groupName, labels }: RadioInputProps) {
  return (
    <ConnectForm>
      {({ register }: any) => (
        <FormControl>
          <RadioGroup
            row
            defaultValue={labels[0].toLowerCase()}
            name={groupName}
          >
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
      )}
    </ConnectForm>
  )
}
