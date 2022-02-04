import React from 'react'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

test('Hero contains correct title', () => {
  render(<Hero />)
  const title = screen.getByText('Hero')
  expect(title).toBeInTheDocument()
})
