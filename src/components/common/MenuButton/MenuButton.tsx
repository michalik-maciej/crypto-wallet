import IconButton from '@mui/material/IconButton'

interface IMenuButtonProps {
  children: React.ReactNode
  label: string
  action: () => void
}

export default function MenuButton({
  children,
  label,
  action
}: IMenuButtonProps) {
  return (
    <IconButton
      aria-label={label}
      size="large"
      onClick={action}
      sx={{
        color: 'primary.contrastText',
        '&:hover': {
          backgroundColor: 'rgba(0,0,0,.4)'
        }
      }}
    >
      {children}
    </IconButton>
  )
}
