import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import bgImg from '../../../assets/hero-bg.jpg'
import MenuButton from '../../common/MenuButton/MenuButton'
import Modal from '../Modal/Modal'
import { getUserLogged } from '../../../redux/userSlice'
import { useAppSelector } from '../../../redux/hooks'
import SignOutForm from '../SignOutForm/SignOutForm'
import SignInForm from '../SignInForm/SignInForm'

export default function Header() {
  const logged = useAppSelector((state) => getUserLogged(state))
  const [openLogin, setOpenLogin] = useState(false)
  const [openLogout, setOpenLogout] = useState(false)
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
    <>
      <StyledTopbar>
        <Container maxWidth="md">
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              md: { marginRight: 1, marginLeft: 1 }
            }}
          >
            <Link to="/">
              <MenuButton label="back to homepage">
                <HomeOutlinedIcon fontSize="inherit" />
              </MenuButton>
            </Link>
            <Stack
              spacing={1}
              direction="row"
              sx={{ justifyContent: 'space-between' }}
            >
              {logged && (
                <Link to="/user">
                  <MenuButton label="user portfolio">
                    <AccountBalanceWalletRoundedIcon fontSize="inherit" />
                  </MenuButton>
                </Link>
              )}
              <Button
                sx={{ p: 0 }}
                onClick={() =>
                  logged ? setOpenLogout(true) : setOpenLogin(true)
                }
              >
                <MenuButton label="login form">
                  <LockOpenOutlinedIcon fontSize="inherit" />
                </MenuButton>
              </Button>
            </Stack>
          </Stack>
        </Container>
      </StyledTopbar>
      {openLogin && (
        <Modal open={openLogin} handleClose={() => setOpenLogin(false)}>
          <SignInForm />
        </Modal>
      )}
      {openLogout && (
        <Modal open={openLogout} handleClose={() => setOpenLogout(false)}>
          <SignOutForm />
        </Modal>
      )}
    </>
  )
}
