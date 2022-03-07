import { useLayoutEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'

export interface IChartProps {
  chartData: {
    time: string
    open: number
    high: number
    low: number
    close: number
  }[]
}

export default function CoinChart({ chartData }: IChartProps) {
  const chartContainerRef: any = useRef()
  const chart: any = useRef()
  const resizeObserver: any = useRef()

  useLayoutEffect(() => {
    if (chartData) {
      chart.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
          backgroundColor: '#253248',
          textColor: 'rgba(255, 255, 255, 0.9)'
        },
        grid: {
          vertLines: {
            color: '#334158'
          },
          horzLines: {
            color: '#334158'
          }
        }
      })

      const candleSeries = chart.current.addCandlestickSeries({
        upColor: '#4bffb5',
        downColor: '#ff4976',
        borderDownColor: '#ff4976',
        borderUpColor: '#4bffb5',
        wickDownColor: '#838ca1',
        wickUpColor: '#838ca1'
      })

      candleSeries.setData(chartData)
    }
  }, [])

  // Resize chart on container resizes.
  /*   useLayoutEffect(() => {
    if (chartData) {
      resizeObserver.current = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect
        chart.current.applyOptions({ width, height })
        setTimeout(() => {
          chart.current.timeScale().fitContent()
        }, 0)
      })

      resizeObserver.current.observe(chartContainerRef.current)

      return () => resizeObserver.current.disconnect()
    }
    return undefined
  }, [chartData]) */

  return <div ref={chartContainerRef} />
}
