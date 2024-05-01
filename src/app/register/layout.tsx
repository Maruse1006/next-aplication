'use client'
import { FormProvider, useForm } from 'react-hook-form'

type FormValues = {
  name: string
  email: string
  sex:string
  password: string
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const methods = useForm<FormValues>({
    mode: 'onChange',
  });
  //子コンポーネントである確認フォームに遷移パラメーターを渡す。
  return <FormProvider {...methods}>{children}</FormProvider>;
}
