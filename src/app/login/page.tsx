"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const {router, handleChange, handleLogin, isFormValid, isLoading } = useLogin()

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6" onSubmit={handleLogin}>
          <Input
            name="email"
            type="email"
            onChange={handleChange}
            required
            label="Email Address"
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />

          <Input
            name="password"
            type="password"
            onChange={handleChange}
            required
            label="Password"
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
          />

          <div>
            <Button type="submit" disabled={!isFormValid} loading={isLoading}>
              Sign in
            </Button>
          </div>
        </form>

        <div className="text-sm mt-1.5">
          <a href="#" className="font-semibold text-orange-600 hover:text-orange-500">
            Forgot password?
          </a>
        </div>

        <p className="mt-5 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a
            onClick={() => router.push('/signup')}
            className="font-semibold leading-6 text-orange-600 hover:text-orange-500 hover:underline cursor-pointer"
          >
            Sign Up Here
          </a>
        </p>
      </div>
    </div>
  )
}
