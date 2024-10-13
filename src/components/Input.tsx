import React from 'react'

interface Props {
  className?: string
  placeholder?: string
  required?: boolean
  type: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  label: string
  value?: string
  disabled?: boolean
  autoComplete?: string
  error?: string
  dataTestId?: string
}

const Input: React.FC<Props> = ({
  placeholder,
  required,
  onChange: handleChange,
  label,
  name,
  type,
  value,
  disabled,
  autoComplete = 'on',
  error,
  dataTestId
}: Props): JSX.Element => {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          onChange={handleChange}
          value={value}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          placeholder={placeholder}
          data-testid={dataTestId}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2"
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  )
}

export default Input
