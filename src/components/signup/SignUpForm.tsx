'use client'

import { useSignUp } from '@/hooks/useSignUp'

import React from 'react'
import Button from '../Button'
import Input from '../Input'

const SignUpForm = ({ dict }: { dict: any }) => {
  const { handleChange, handleSubmit, isFormValid, router, errors, loading } = useSignUp()
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" className="space-y-3" onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          onChange={handleChange}
          required
          label={dict.email}
          autoComplete="email"
          error={errors.email}
        />

        <Input
          name="password"
          type="password"
          onChange={handleChange}
          required
          label={dict.password}
          autoComplete="current-password"
          error={errors.password}
        />

        <Input
          name="name"
          type="name"
          onChange={handleChange}
          required
          label={dict.fullName}
          autoComplete="name"
          error={errors.name}
        />

        <div>
          <Button type="submit" disabled={!isFormValid} loading={loading} className="mt-10">
            {dict.signup}
          </Button>
        </div>
      </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        {dict.haveAnAccount}
        <a
          onClick={() => router.push('/login')}
          className="font-semibold leading-6 text-orange-600 hover:text-orange-500 hover:underline cursor-pointer"
        >
          {dict.loginHere}
        </a>
      </p>
    </div>
  )
}

export default SignUpForm
