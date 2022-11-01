import { useLayoutEffect, createContext, useMemo, useEffect } from 'react'
import { useLocalStorageState } from 'ahooks'
import { applyTheme } from '@/utils/theme_utils'

interface IThemeLocalStorage {
  dark: boolean
  color: {
    primary: string
  }
  css: string
}

interface IThemeContext {
  isDark: boolean
  css: string
  toggle: () => void
  setThemeColor: (color: { primary: string }) => void
}

interface IThemeContextProviderProps {
  children: JSX.Element
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

export const ThemeContextProvider = ({ children }: IThemeContextProviderProps) => {
  const [theme, setTheme] = useLocalStorageState<IThemeLocalStorage>('theme', {
    defaultValue: {
      dark: false,
      color: {
        primary: '#1677ff'
      },
      css: ''
    }
  })

  const isDark = useMemo(() => theme.dark, [theme.dark])

  const toggleClass = (dark: boolean) => {
    if (dark) {
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
    }
    setTheme({ ...theme, dark })
  }

  const toggle = () => {
    const dark = document.body.classList.contains('dark-theme')
    toggleClass(!dark)
  }

  const updateTheme = () => {
    const Tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]
    const themeCss = applyTheme(theme.color.primary, { surface: true, paletteTones: Tones })

    setTheme({ ...theme, css: themeCss })
  }

  useEffect(() => {
    updateTheme()
  }, [theme.color])

  useLayoutEffect(() => {
    updateTheme()
    const systemMode = window.matchMedia('(prefers-color-scheme: dark)')
    toggleClass(theme.dark || systemMode.matches)
    systemMode.addEventListener('change', (e) => {
      toggleClass(e.matches)
    })
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggle,
        css: theme.css,
        setThemeColor: (color) => {
          setTheme({ ...theme, color })
        }
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
