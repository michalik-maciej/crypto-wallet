import React from 'react'
import TableCell from '@mui/material/TableCell'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { CoinNameDataType } from './DataFormatter'

interface DataTableCellProps {
  value: number | string | CoinNameDataType
  isHeader: boolean
  isHideable: boolean
  href: string
}

export default function CoinDataTableCell({
  value,
  isHeader,
  isHideable,
  href
}: DataTableCellProps) {
  let customStyle = {}

  if (isHeader) {
    customStyle = { fontWeight: 'bold' }
  }

  if (isHideable) {
    customStyle = { ...customStyle, display: { xs: 'none', sm: 'block' } }
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return <TableCell sx={customStyle}>{value}</TableCell>
  }

  if (typeof value === 'object') {
    const { image, name, symbol } = value
    return (
      <TableCell>
        <Link to={href}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              src={image}
              sx={{ height: '1.5rem', width: '1.5rem' }}
              alt={`${name} logo`}
            />
            <Box sx={{ width: '40%', display: { xs: 'none', md: 'block' } }}>
              {name}
            </Box>
            <Box sx={{ fontWeight: 600 }}>{symbol}</Box>
          </Stack>
        </Link>
      </TableCell>
    )
  }
  return null
}
