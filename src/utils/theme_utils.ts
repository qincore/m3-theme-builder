import {
  argbFromHex,
  themeFromSourceColor,
  Theme,
  redFromArgb,
  greenFromArgb,
  blueFromArgb
} from '@material/material-color-utilities'
import { ISurfaceProps, Surface } from '@/utils/surface_scheme'
import { hexFromArgb } from '@/utils/color_utils'

interface ISchemeProps {
  primary: number
  onPrimary: number
  primaryContainer: number
  onPrimaryContainer: number
  secondary: number
  onSecondary: number
  secondaryContainer: number
  onSecondaryContainer: number
  tertiary: number
  onTertiary: number
  tertiaryContainer: number
  onTertiaryContainer: number
  error: number
  onError: number
  errorContainer: number
  onErrorContainer: number
  background: number
  onBackground: number
  surface: number
  onSurface: number
  surfaceVariant: number
  onSurfaceVariant: number
  outline: number
  outlineVariant: number
  shadow: number
  scrim: number
  inverseSurface: number
  inverseOnSurface: number
  inversePrimary: number
}

/**
 * @description 删除所有子节点
 * @param parent 需要删除子节点的 html 元素
 */
const removeAllChild = (parent: HTMLElement) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

/**
 * @description css 注入 dom
 * @param id style 标签 id
 * @param content style 内容
 */
const setStyle = (id: string, content: string) => {
  const styleId = `material-${id}`
  let style = document.getElementById(styleId) as HTMLStyleElement | null
  if (style == null) {
    style = document.createElement('style')
    style.id = styleId
    style.type = 'text/css'
    document.head.appendChild(style)
  }

  if (style.hasChildNodes()) {
    removeAllChild(style)
  }

  style.appendChild(document.createTextNode(content))
}

/**
 * @description 主题 token 生成 css
 * @param scheme 主题方案 json
 * @param type 主题标识
 */
const addToken = (scheme: ISchemeProps | ISurfaceProps, type: string): string => {
  let css = ''
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(scheme)) {
    const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    const colorHex = hexFromArgb(value)
    const r = redFromArgb(value)
    const g = greenFromArgb(value)
    const b = blueFromArgb(value)
    css += `--md-${type}-color-${token}-rgb: ${r},${g},${b};\n--md-${type}-color-${token}: ${colorHex};\n`
  }

  return css
}

/**
 * @description 主题方案生成 css
 * @param theme 主题方案
 */
const applySchemes = (theme: Theme) => {
  const light = `:root, .light-theme {\n color-scheme: light;\n${addToken(theme.schemes.light.toJSON(), 'sys')}}\n`
  const dark = `.dark-theme {\n color-scheme: dark;\n${addToken(theme.schemes.dark.toJSON(), 'sys')}}`
  setStyle('theme', `${light}${dark}`)
}

/**
 * @description 主题应用
 * @param source 来源颜色 hex
 * @param options 主题可选配置 surface（生成高程面色值）、paletteTones（生成色板色调组）
 */
export const applyTheme = (source: string, options?: { surface?: boolean; paletteTones?: number[] }) => {
  const theme = themeFromSourceColor(argbFromHex(source))

  // palettes 色板应用
  if (options?.paletteTones) {
    const tones = options?.paletteTones ?? []
    let token = ''
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, palette] of Object.entries(theme.palettes)) {
      const paletteKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
      // eslint-disable-next-line no-restricted-syntax
      for (const tone of tones) {
        const color = hexFromArgb(palette.tone(tone))
        token += `--md-ref-palette-${paletteKey}-${tone}: ${color};\n`
      }
    }
    setStyle('palettes', `:root{\n${token}}`)
  }

  // surface 面色值应用
  if (options?.surface) {
    const surfaceLight = addToken(Surface.light(argbFromHex(source)).toJSON(), 'sys')
    const surfaceDark = addToken(Surface.dark(argbFromHex(source)).toJSON(), 'sys')
    setStyle('surface', `:root, .light-theme {\n${surfaceLight}}\n.dark-theme {\n${surfaceDark}}`)
  }

  // theme 主题插入
  applySchemes(theme)
}
