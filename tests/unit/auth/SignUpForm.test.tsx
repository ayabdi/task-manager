import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SignUpForm from '@/components/signup/SignUpForm'
import { useSignUp } from '@/hooks/useSignUp'

// Mock the useSignUp hook
jest.mock('@/hooks/useSignUp', () => ({
  useSignUp: jest.fn(),
}))

describe('SignUpForm Component - Basic Render', () => {
  beforeEach(() => {
    // Mock implementation of useSignUp
    (useSignUp as jest.Mock).mockReturnValue({
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      isFormValid: true,
      router: { push: jest.fn() },
      errors: {},
      loading: false,
    })

    // Mock dictionary
    const dict = {
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      signup: 'Sign Up',
      haveAnAccount: 'Already have an account?',
      loginHere: 'Login here',
    }

    render(<SignUpForm dict={dict} />)
  })

  it('renders email, password, and name input fields', () => {
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument()
  })

  it('renders the login prompt', () => {
    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument()
    expect(screen.getByText(/Login here/i)).toBeInTheDocument()
  })
})