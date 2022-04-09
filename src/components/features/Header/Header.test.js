/* eslint-disable no-undef */
import userEvent from '@testing-library/user-event'
import { render, screen } from '../../../utils/test-utils'
import Header from './Header'

it('should display Home and Login buttons', () => {
  render(<Header />)

  const homeButtonElement = screen.getByRole('button', {
    name: /back to homepage/i
  })
  const loginButtonElement = screen.getByRole('button', { name: /login form/i })

  expect(homeButtonElement).toBeInTheDocument()
  expect(loginButtonElement).toBeInTheDocument()
})

it('should display Wallet button when user is logged', () => {
  render(<Header />, { preloadedState: { user: { logged: true } } })

  const userButtonElement = screen.getByRole('button', {
    name: /user portfolio/i
  })

  expect(userButtonElement).toBeInTheDocument()
})

it('should display sign in form when the Login button is clicked', () => {
  render(<Header />)

  const loginButtonElement = screen.getByRole('button', { name: /login form/i })
  userEvent.click(loginButtonElement)

  const headingElement = screen.getByRole('heading', {
    name: /sign in/i
  })
  expect(headingElement).toBeInTheDocument()
})
