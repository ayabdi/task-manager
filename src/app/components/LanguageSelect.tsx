'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const LanguageSelect: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ar'>('en')

  const router = useRouter()

  useEffect(() => {
    const langCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('language='))
      ?.split('=')[1] as 'en' | 'ar'

    if (langCookie) {
      setCurrentLanguage(langCookie)
      const currentPath = window.location.pathname
      const newPath =
        langCookie === 'en' ? currentPath.replace(/^\/ar/, '/en-US') : currentPath.replace(/^\/en-US/, '/ar')

      if (currentPath !== newPath) {
        router.push(newPath) // Navigate to the new path
      }
    }
  }, [router])

  // ... existing code ...

  const changeLanguageRoute = (lang: 'en' | 'ar') => {
    if (typeof window === 'undefined') {
      return '' // Return an empty string or handle this case appropriately
    }
    const currentPath = window.location.pathname
    if (lang === 'en') {
      return currentPath.replace(/^\/ar/, '/en-US')
    } else {
      return currentPath.replace(/^\/en-US/, '/ar')
    }
  }

  const updateCookie = (lang: 'en' | 'ar') => {
    document.cookie = `language=${lang}; path=/`
    setCurrentLanguage(lang) // Update the state to reflect the change
  }

  return (
    <div className="flex justify-end mt-4 gap-1.5 px-24">
      <a
        href={changeLanguageRoute('en')}
        className={`text-blue-500 cursor-pointer pb-1 hover:underline ${
          currentLanguage === 'en' ? 'font-bold' : ''
        }`}
        onClick={() => updateCookie('en')}
      >
        EN
      </a>
      <span className="text-blue-500">|</span>
      <a
        href={changeLanguageRoute('ar')}
        className={`text-blue-500 cursor-pointer pb-1 hover:underline ${
          currentLanguage === 'ar' ? 'font-bold' : ''
        }`}
        onClick={() => updateCookie('ar')}
      >
        AR
      </a>
    </div>
  )
}

export default LanguageSelect
