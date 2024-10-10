'use client'

import { useLogin } from '@/hooks/useLogin'
import React from 'react'
import Button from '../Button'
import Input from '../Input'

const LoginForm = ({ dict }: { dict: any }) => {
  const { router, handleChange, handleLogin, isFormValid, isLoading } = useLogin()
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" className="space-y-6" onSubmit={handleLogin}>
        <Input
          name="email"
          type="email"
          onChange={handleChange}
          required
          label={dict.email}
          autoComplete="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
        />

        <Input
          name="password"
          type="password"
          onChange={handleChange}
          required
          label={dict.password}
          autoComplete="current-password"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
        />

        <div>
          <Button type="submit" disabled={!isFormValid} loading={isLoading}>
            {dict.signIn}
          </Button>
        </div>
      </form>

      <div className="text-sm mt-1.5">
        <a href="#" className="font-semibold text-orange-600 hover:text-orange-500">
          {dict.forgotPassword}
        </a>
      </div>

      <p className="mt-5 text-center text-sm text-gray-500">
       {dict.notAMember}{' '}
        <a
          onClick={() => router.push('/signup')}
          className="font-semibold leading-6 text-orange-600 hover:text-orange-500 hover:underline cursor-pointer"
        >
          {dict.signUpHere}
        </a>
      </p>
    </div>
  )
}

export default LoginForm
