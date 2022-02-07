import React from 'react'
import TableCell from '@mui/material/TableCell'
import Avatar from '@mui/material/Avatar'
import { CoinNameDataType } from '../CoinDataFormatter/CoinDataFormatter'

interface CoinDataTableCellProps {
  value: number | string | CoinNameDataType
}

function CoinDataTableCell({ value }: CoinDataTableCellProps) {
  if (typeof value === 'string' || typeof value === 'number') {
    return <TableCell>{value}</TableCell>
  }
  if (typeof value === 'object') {
    return (
      <TableCell>
        <Avatar
          src={value.image}
          sx={{ height: '1.5rem', width: '1.5rem' }}
          alt={`${value.name} logo`}
        />
        <p>{value.name}</p>
        <p>{value.symbol.toUpperCase()}</p>
      </TableCell>
    )
  }
  return null
}

export default CoinDataTableCell
