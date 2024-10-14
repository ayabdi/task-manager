import SignUpForm from '@/app/components/signup/SignUpForm'
import { getDictionary } from '../dictonaries'
import Image from 'next/image'

export default async function SignUpPage({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang)

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Your Company"
          src="/icons/logo.svg"
          className="mx-auto h-14 w-auto"
          width={56}
          height={56}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {dict.signup.header}
        </h2>
      </div>

      <SignUpForm dict={dict.signup} />
    </div>
  )
}
