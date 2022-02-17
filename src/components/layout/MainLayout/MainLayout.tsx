import Container from '@mui/material/Container'
import Header from '../../features/Header/Header'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <Container maxWidth="md">{children}</Container>
    </>
  )
}
