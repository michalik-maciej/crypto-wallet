import TableContainer from '@mui/material/TableContainer'
import { styled } from '@mui/material/styles'
import Header from '../../features/Header/Header'
import Hero from '../../features/Hero/Hero'
import MainTable from '../../features/MainTable/MainTable'
import Portfolio from '../Portfolio/Portfolio'

export default function Homepage() {
  const StyledContainer = styled(TableContainer)({
    height: '100vh',
    margin: '2rem auto',
    maxWidth: '900px'
  })

  return (
    <>
      <Hero />
      <StyledContainer>
        {/*         <Header /> */}
        <Portfolio />
        {/*         <MainTable /> */}
      </StyledContainer>
    </>
  )
}
