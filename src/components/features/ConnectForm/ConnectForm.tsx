import {
  SubmitHandler,
  UseFormReturn,
  useForm,
  useFormContext
} from 'react-hook-form'

interface ConnectFormProps<TFormValues> {
  children: (methods: UseFormReturn<TFormValues>) => React.ReactElement
}

export default function ConnectForm({ children }: any) {
  const methods = useFormContext()
  return children({ ...methods })
}

type FormProps<TFormValues> = {
  onSubmit: SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
}

function Form<TFormValues extends Record<string, any> = Record<string, any>>({
  onSubmit,
  children
}: FormProps<TFormValues>) {
  const methods = useForm<TFormValues>()
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
  )
}
