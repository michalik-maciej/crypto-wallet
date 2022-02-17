import { ReactNode } from 'react'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'

interface IMenuButtonProps {
  children: ReactNode
  href: string
  label: string
}

export default function MenuButton({
  children,
  href,
  label
}: IMenuButtonProps) {
  const theme = useTheme()

  return (
    <Link to={href}>
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
    </Link>
  )
}
