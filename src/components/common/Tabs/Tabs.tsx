import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { IPortfolioSettings } from '../../../settings/settings'

interface ICustomTabsProps {
  tabConfig: IPortfolioSettings[]
  getValue: string
  // eslint-disable-next-line no-unused-vars
  setValue: (a: string) => void
}

export default function CustomTabs({
  tabConfig,
  getValue,
  setValue
}: ICustomTabsProps) {
  return (
    <RadioGroup
      row
      value={getValue}
      onChange={(_e, val) => setValue(val)}
      sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}
    >
      {tabConfig.map(({ color, label }) => (
        <Radio
          key={color}
          value={label}
          sx={{
            mx: 1,
            fontWeight: 600,
            border: `2px solid ${color}`,
            borderRadius: '100%',
            height: '1rem',
            width: '1rem',
            color,
            '&.Mui-checked': { color }
          }}
        />
      ))}
    </RadioGroup>
  )
}
