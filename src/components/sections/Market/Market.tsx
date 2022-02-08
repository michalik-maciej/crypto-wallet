import React from 'react'

interface PriceProps {
  children: React.ReactNode
}

function Price({ children }: PriceProps) {
  return <div>{children}</div>
}

export default Price
