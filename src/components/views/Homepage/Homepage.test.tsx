import { render, screen } from '@testing-library/react'

import Homepage from './Homepage'

test('Homepage contains correct title', () => {
  render(<Homepage />)
  const title = screen.getByText('Homepage')
  expect(title).toBeInTheDocument()
})
