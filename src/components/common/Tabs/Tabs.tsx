import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

interface ICustomTabsProps {
  tabConfig: { value: string; label: string }[]
  getValue: string
  setValue: (a: string) => void
}

export default function CustomTabs({
  tabConfig,
  getValue,
  setValue
}: ICustomTabsProps) {
  return (
    <Tabs value={getValue} onChange={(_e, val) => setValue(val)}>
      {tabConfig.map(({ value, label }) => (
        <Tab
          key={value}
          value={label}
          label={label}
          sx={{
            fontWeight: 600,
            color: value,
            borderBottom: `5px solid ${value}`
          }}
        />
      ))}
    </Tabs>
  )
}
