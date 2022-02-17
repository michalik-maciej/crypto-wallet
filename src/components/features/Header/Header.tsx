import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import Container from '@mui/material/Container'
import bgImg from '../../../assets/hero-bg.jpg'
import MenuButton from '../../common/MenuButton/MenuButton'

export default function Header() {
  const StyledTopbar = styled('div')({
    display: 'flex',
    padding: '1rem',
    backgroundImage: `url(${bgImg})`,
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    zIndex: -100
  })

  return (
    <StyledTopbar>
      <Container maxWidth="md">
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            md: { marginRight: 1, marginLeft: 1 }
          }}
        >
          <MenuButton href="/" label="back to homepage">
            <HomeOutlinedIcon fontSize="inherit" />
          </MenuButton>
          <Stack
            spacing={1}
            direction="row"
            sx={{ justifyContent: 'space-between' }}
          >
            <MenuButton href="/user" label="user portfolio">
              <AccountBalanceWalletRoundedIcon fontSize="inherit" />
            </MenuButton>
            <MenuButton href="/login" label="login form">
              <LockOpenOutlinedIcon fontSize="inherit" />
            </MenuButton>
          </Stack>
        </Stack>
      </Container>
    </StyledTopbar>
  )
}
