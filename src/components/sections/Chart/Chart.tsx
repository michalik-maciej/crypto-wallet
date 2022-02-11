import React from 'react'

interface ChartProps {
  children: React.ReactNode
}

export default function Chart({ children }: ChartProps) {
  return <div>{children}</div>
}
