import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

const readStored = () => {
  try {
    return localStorage.getItem('lang') === 'en' ? 'en' : 'vi'
  } catch {
    return 'vi'
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStored)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang],
      // pick the current-language value from a { vi, en } object
      pick: (obj) => (obj && typeof obj === 'object' ? obj[lang] ?? obj.vi : obj),
      formatPrice: (n) => n.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US') + '₫',
      formatDate: (d) =>
        new Date(d).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLang = () => useContext(LanguageContext)
