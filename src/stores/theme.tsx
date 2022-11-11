import { useLayoutEffect, createContext, useMemo, useEffect } from 'react'
import { useLocalStorageState } from 'ahooks'
import { useLocation } from 'react-router-dom'
import { Hct, hexFromArgb } from '@material/material-color-utilities'
import { applyTheme, ISourceColor, IThemeCss } from '@/utils/theme_utils'

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
  sourceChange: (color: ISourceColor, dynamic?: boolean) => void
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

  const initColor = useMemo(() => (isCustom ? { primary: theme.custom.primary } : theme.dynamic), [isCustom])

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

  const updateTheme = (source: ISourceColor, dynamic?: boolean) => {
    const Tones = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]
    const applyRes = applyTheme(source, { surface: true, paletteTones: Tones })
    if (!dynamic) {
      const color = isCustom ? { custom: { ...theme.custom, ...source } } : { dynamic: source }
      setTheme({ ...theme, ...color, css: applyRes.css })
    }
    if (isCustom && dynamic) {
      const sHct = Hct.fromInt(applyRes.afterColor.secondary)
      const tHct = Hct.fromInt(applyRes.afterColor.tertiary)
      const nHct = Hct.fromInt(applyRes.afterColor.neutral)
      const mColor = {
        ...source,
        secondary: hexFromArgb(Hct.from(sHct.hue, sHct.chroma, 60).toInt()),
        tertiary: hexFromArgb(Hct.from(tHct.hue, tHct.chroma, 60).toInt()),
        neutral: hexFromArgb(Hct.from(nHct.hue, nHct.chroma, 60).toInt())
      }
      setTheme({ ...theme, custom: mColor, css: applyRes.css })
    }
  }

  const sourceChange = (source: ISourceColor, dynamic?: boolean) => {
    if (isCustom) {
      if (dynamic) {
        updateTheme({ primary: source.primary }, true)
        return
      }
      updateTheme(source)
    } else {
      updateTheme(source)
    }
  }

  useLayoutEffect(() => {
    updateTheme(initColor, true)
    const systemMode = window.matchMedia('(prefers-color-scheme: dark)')
    toggleClass(theme.dark || systemMode.matches)
    systemMode.addEventListener('change', (e) => {
      toggleClass(e.matches)
    })
  }, [])

  useEffect(() => {
    updateTheme(initColor, true)
  }, [isCustom])

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggle,
        sourceChange,
        dynamic: theme.dynamic,
        custom: theme.custom,
        css: theme.css
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
