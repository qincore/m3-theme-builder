import { argbFromHex, themeFromSourceColor, applyTheme } from '@material/material-color-utilities'

const updateTheme = (hex: string) => {
  const theme = themeFromSourceColor(argbFromHex(hex))
  // console.log(JSON.stringify(theme, null, 2))
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(theme, { target: document.body, dark: systemDark })
}

export default updateTheme
