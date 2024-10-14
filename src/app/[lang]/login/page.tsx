import LoginForm from '@/app/components/login/LoginForm'
import { getDictionary } from '../dictonaries'
import Image from 'next/image'
import logo from '@/app/icons/logo.svg'

export default async function LoginPage({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang)

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Your Company"
          src={logo}
          className="mx-auto"
          width={56}
          height={56}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {dict.login.header}
        </h2>
      </div>

      <LoginForm dict={dict.login} />
    </div>
  )
}
