import { ReactNode } from 'react'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'

interface IMenuButtonProps {
  children: ReactNode
  label: string
}

export default function MenuButton({ children, label }: IMenuButtonProps) {
  const theme = useTheme()

  return (
    <IconButton
      aria-label={label}
      size="large"
      sx={{
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,.4)'
        }
      }}
    >
      {children}
    </IconButton>
  )
}
