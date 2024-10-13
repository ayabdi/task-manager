import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginForm from '@/components/login/LoginForm'
import { useLogin } from '@/hooks/useLogin'

// Mock the useLogin hook
jest.mock('@/hooks/useLogin', () => ({
  useLogin: jest.fn()
}))

describe('LoginForm Component', () => {
  let handleChangeMock, handleLoginMock: any
  beforeEach(() => {
    handleChangeMock = jest.fn()
    handleLoginMock = jest.fn()

    // Mock implementation of useLogin
    useLogin.mockReturnValue({
      router: { push: jest.fn() },
      handleChange: handleChangeMock,
      handleLogin: handleLoginMock,
      isFormValid: true,
      isLoading: false
    })

    render(
      <LoginForm
        dict={{
          email: 'Email',
          password: 'Password',
          signIn: 'Sign In',
          forgotPassword: 'Forgot Password?',
          notAMember: 'Not a member?',
          signUpHere: 'Sign up here'
        }}
      />
    )
  })

  it('renders email and password input fields and a submit button', () => {
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument()
  }),
    it('calls handleLogin on form submit', () => {
      const form = screen.getByRole('form')
      fireEvent.submit(form)
      expect(handleLoginMock).toHaveBeenCalled()
    })
})
