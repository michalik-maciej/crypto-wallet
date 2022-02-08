import React from 'react'

interface ChartProps {
  children: React.ReactNode
}

function Chart({ children }: ChartProps) {
  return <div>{children}</div>
}

export default Chart
