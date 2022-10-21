import { argbFromHex, themeFromSourceColor, applyTheme } from '@material/material-color-utilities'
import { useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const useTheme = (hex: string) => {
  const theme = themeFromSourceColor(argbFromHex(hex))
  const systemMode = window.matchMedia('(prefers-color-scheme: dark)')
  const [mode, setMode] = useLocalStorage('themeMode', 'auto')

  const systemModeChange = (isDark: boolean) => {
    applyTheme(theme, {
      target: document.body,
      dark: isDark,
      paletteTones: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]
    })
  }

  useEffect(() => {
    if (mode === 'auto') {
      systemModeChange(systemMode.matches)
      systemMode.addEventListener('change', () => systemModeChange(systemMode.matches))
    }
    if (mode !== 'auto') {
      systemModeChange(mode === 'dark')
    }
    return () => {
      systemMode.removeEventListener('change', () => systemModeChange(systemMode.matches))
    }
  }, [hex, mode])

  return [mode === 'auto' ? systemMode.matches : mode === 'dark', setMode]
}

export default useTheme
