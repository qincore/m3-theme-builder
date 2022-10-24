import { useEffect, useLayoutEffect, createContext, useMemo } from 'react'
import { useLocalStorageState } from 'ahooks'
import { applyTheme } from '@/utils/theme_utils'

interface IThemeLocalStorage {
  dark: boolean
  color: {
    primary: string
  }
}

interface IThemeContext {
  isDark: boolean
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
      }
    }
  })

  const isDark = useMemo(() => theme.dark, [theme.dark])

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

  const removeAllChild = (parent: HTMLElement) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
  }

  const updateStyle = (id: string, content: string) => {
    const styleId = `generated-material-${id}`
    let style = document.getElementById(styleId) as HTMLStyleElement | null
    if (style == null) {
      style = document.createElement('style')
      style.id = styleId
      style.type = 'text/css'
      document.head.appendChild(style)
    }
    const chunks = content.match(/.{1,500}/g) || []
    removeAllChild(style)
    chunks.forEach((chunk) => style?.appendChild(document.createTextNode(chunk)))
  }

  const updateTheme = () => {
    const Tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]
    applyTheme(theme.color.primary, true, Tones, (_, css) => {
      updateStyle(_, css)
    })
    // toggleClass(theme.mode === 'auto' ? systemMode.matches : theme.mode === 'dark')
  }

  useEffect(() => {
    updateTheme()
  }, [theme.color])

  useLayoutEffect(() => {
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
        setThemeColor: (color) => {
          setTheme({ ...theme, color })
        }
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
