/* eslint-disable no-undef */
import { render, screen, within } from '../../../utils/test-utils'
import inputData from '../../../testData/MainTableInputData.json'
import MainTable from './MainTable'

const expectDataRow = (rowCells, cellsContent) => {
  rowCells.forEach((cell, index) =>
    expect(cell).toHaveTextContent(cellsContent[index])
  )
}

it('should display proper table headings', () => {
  render(<MainTable inputData={inputData} />)

  const headers = screen.getAllByRole('columnheader')
  expectDataRow(headers, [/#/i, /name/i, /price/i, /24h %/i, /market cap/i])
})

it('should display proper input data', () => {
  render(<MainTable inputData={inputData} />)

  const cellsBTC = within(
    screen.getByRole('row', {
      name: /bitcoin/i
    })
  ).getAllByRole('cell')
  expectDataRow(cellsBTC, [
    /1/i,
    /btc/i,
    /\$42,726.00/i,
    /-0.16/i,
    /\$810,761,430,907.00/i
  ])

  const cellsETH = within(
    screen.getByRole('row', {
      name: /ethereum/i
    })
  ).getAllByRole('cell')
  expectDataRow(cellsETH, [
    /2/i,
    /eth/i,
    /\$3,252.31/i,
    /0.97/i,
    /\$391,028,904,503.00/i
  ])
})

it('should display data matching the search id', () => {
  render(<MainTable inputData={inputData} searchId="ethereum" />)

  const rowBTC = screen.queryByRole('row', { name: /bitcoin/i })
  expect(rowBTC).not.toBeInTheDocument()

  const rowETH = screen.getByRole('row', { name: /ethereum/i })
  expect(rowETH).toBeInTheDocument()
})

it('should not display data when the search id is not found in input data', () => {
  render(<MainTable inputData={inputData} searchId="cardano" />)

  const rowBTC = screen.queryByRole('row', { name: /bitcoin/i })
  expect(rowBTC).not.toBeInTheDocument()

  const rowETH = screen.queryByRole('row', { name: /ethereum/i })
  expect(rowETH).not.toBeInTheDocument()
})

it('positive (negative) price change value should be green (red)', () => {
  render(<MainTable inputData={inputData} />)

  const negativeValue = screen.getByText(/-0.16/i)
  expect(negativeValue).toHaveStyle({ color: '#d32f2f' })

  const positiveValue = screen.getByText(/0.97/i)
  expect(positiveValue).toHaveStyle({ color: '#2e7d32' })
})
