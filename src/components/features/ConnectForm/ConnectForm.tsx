import React from 'react'
import { useFormContext } from 'react-hook-form'

interface ConnectFormProps {
  children: React.ReactNode
}

export default function ConnectForm({ children }: any) {
  const methods = useFormContext()
  return children({ ...methods })
}
