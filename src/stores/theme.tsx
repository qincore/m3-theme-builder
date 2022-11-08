import { useLayoutEffect, createContext, useMemo, useEffect } from 'react'
import { useLocalStorageState } from 'ahooks'
import { useLocation } from 'react-router-dom'
import { applyTheme, ISourceColor, IThemeCss } from '@/utils/theme_utils'
// import { ThemeScheme } from '@/utils/theme_scheme'

interface IThemeLocalStorage {
  dark: boolean
  dynamic: ISourceColor
  custom: ISourceColor
  css: IThemeCss[]
}

interface IThemeContext {
  isDark: boolean
  css: IThemeCss[]
  dynamic: ISourceColor
  custom: ISourceColor
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
      dynamic: {
        primary: '#1677ff'
      },
      custom: {
        primary: '#6750A4',
        secondary: '#958DA5',
        tertiary: '#B58392',
        neutral: '#939094'
      },
      css: []
    }
  })

  const { pathname } = useLocation()

  const isDark = useMemo(() => theme.dark, [theme.dark])

  const isCustom = useMemo(() => pathname.includes('/custom'), [pathname])

  const toggleClass = (dark: boolean) => {
    if (dark) {
      document.documentElement.style.colorScheme = 'dark'
      document.body.classList.add('dark-theme')
    } else {
      document.documentElement.style.colorScheme = 'light'
      document.body.classList.remove('dark-theme')
    }
    setTheme({ ...theme, dark })
  }

  const toggle = () => {
    const dark = document.body.classList.contains('dark-theme')
    toggleClass(!dark)
  }

  const updateTheme = (dynamic?: boolean) => {
    const Tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]
    // eslint-disable-next-line no-nested-ternary
    const color = isCustom ? (dynamic ? { primary: theme.custom.primary } : theme.custom) : theme.dynamic
    const themeCss = applyTheme(color, { surface: true, paletteTones: Tones })

    setTheme({ ...theme, css: themeCss })
  }

  useEffect(() => {
    updateTheme()
  }, [theme.custom.secondary, theme.custom.tertiary, theme.custom.neutral])

  useEffect(() => {
    updateTheme(true)
  }, [theme.dynamic, theme.custom.primary, pathname])

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
        dynamic: theme.dynamic,
        custom: theme.custom,
        css: theme.css,
        setThemeColor: (source) => {
          if (isCustom) {
            setTheme({ ...theme, custom: { ...theme.custom, ...source } })
          } else {
            setTheme({ ...theme, dynamic: source })
          }
        }
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
