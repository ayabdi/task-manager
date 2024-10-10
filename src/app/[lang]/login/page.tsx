import LoginForm from '@/components/login/LoginForm'
import { getDictionary } from '../dictonaries'

export default async function LoginPage({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang)

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=orange&shade=600"
          className="mx-auto h-14 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {dict.login.header}
        </h2>
      </div>

      <LoginForm dict={dict.login} />
    </div>
  )
}
