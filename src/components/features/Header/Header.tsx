import { useState } from 'react'
import Stack from '@mui/material/Stack'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import bgImg from '../../../assets/hero-bg.jpg'
import MenuButton from '../../common/MenuButton/MenuButton'
import { getUserLogged } from '../../../redux/userSlice'
import { useAppSelector } from '../../../redux/hooks'
import SignOutForm from '../SignOutForm/SignOutForm'
import SignInForm from '../SignInForm/SignInForm'
import { RootState } from '../../../redux/store'

export default function Header() {
  const logged = useAppSelector((state: RootState) => getUserLogged(state))
  const [openLogin, setOpenLogin] = useState(false)
  const [openLogout, setOpenLogout] = useState(false)
  const navigate = useNavigate()
  const StyledTopbar = {
    display: 'flex',
    padding: '1rem',
    backgroundImage: `url(${bgImg})`,
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    zIndex: -100
  }

  return (
    <>
      <Box sx={StyledTopbar}>
        <Container maxWidth="md">
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              md: { marginRight: 1, marginLeft: 1 }
            }}
          >
            <MenuButton label="back to homepage" action={() => navigate('/')}>
              <HomeOutlinedIcon fontSize="inherit" />
            </MenuButton>
            <Stack
              spacing={1}
              direction="row"
              sx={{ justifyContent: 'space-between' }}
            >
              {logged && (
                <MenuButton
                  label="user portfolio"
                  action={() => navigate('/user')}
                >
                  <AccountBalanceWalletRoundedIcon fontSize="inherit" />
                </MenuButton>
              )}
              <MenuButton
                label="login form"
                action={() =>
                  logged ? setOpenLogout(true) : setOpenLogin(true)
                }
              >
                <LockOpenOutlinedIcon fontSize="inherit" />
              </MenuButton>
            </Stack>
          </Stack>
        </Container>
      </Box>
      {openLogin && (
        <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
          <SignInForm handleSuccess={() => setOpenLogin(false)} />
        </Dialog>
      )}
      {openLogout && (
        <Dialog open={openLogout} onClose={() => setOpenLogout(false)}>
          <SignOutForm handleSuccess={() => setOpenLogout(false)} />
        </Dialog>
      )}
    </>
  )
}
