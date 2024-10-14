import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
;``
// Custom hook for handling login functionality
export const useLogin = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // State to manage loading status
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Function to handle login form submission
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Attempt to sign in with credentials
    await signIn('credentials', {
      redirect: false,
      ...formData
    })
      .then(response => {
        // Redirect to tasks page on successful login
        if (response?.ok) router.push('/tasks')
        else toast.error('Invalid Email/Password')
      })
      .catch(() => {
        toast.error('Error Signing in')
      })
      .finally(() => setLoading(false)) // Reset loading state
  }

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  // Check if the form is valid
  const isFormValid = Object.values(formData).every(value => value.trim() !== '')

  // Expose necessary properties and functions
  return {
    router,
    handleChange,
    handleLogin,
    isFormValid,
    isLoading: loading
  }
}
