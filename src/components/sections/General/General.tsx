import React from 'react'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'

interface GeneralProps {
  data: any
}

export default function General({ data }: GeneralProps) {
  const { logo, name, symbol } = data

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar
        src={logo}
        sx={{ height: '3rem', width: '3rem' }}
        alt={`${name} logo`}
      />
      <Box>{name}</Box>
      <Box>{symbol}</Box>
    </Stack>
  )
}
