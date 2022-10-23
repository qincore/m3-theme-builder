import {
  argbFromHex,
  themeFromSourceColor,
  Scheme,
  hexFromArgb,
  // TonalPalette,
  Theme
} from '@material/material-color-utilities'

type StyleCallback = (name: string, css: string) => void

function addToken(sb: string[], token: string, value: number, rgb: boolean) {
  if (rgb) {
    // eslint-disable-next-line no-bitwise
    const [r, g, b] = [(value >> 16) & 255, (value >> 8) & 255, value & 255]
    sb.push(`  ${token}-rgb: ${r}, ${g}, ${b};`)
    sb.push(`  ${token}: rgba(var(${token}-rgb), 1);`)
  } else {
    sb.push(`  ${token}: ${hexFromArgb(value)};`)
  }
}

export function applySchemes(theme: Theme, source: string, rgb: boolean, setStyle: StyleCallback) {
  const sb: string[] = []
  sb.push(`:root {`)
  sb.push(`  --md-source: ${source};`)

  // Schemes
  const applyScheme = (
    scheme: Scheme,
    options?: {
      suffix?: string
    }
  ) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, color] of Object.entries(scheme.toJSON())) {
      const token = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
      const tokenName = `--md-sys-color-${token}${options?.suffix ?? ''}`
      addToken(sb, tokenName, color, rgb)
    }
  }

  // Light theme
  applyScheme(theme.schemes.light, { suffix: '-light' })

  // Dark theme
  applyScheme(theme.schemes.dark, { suffix: '-dark' })

  sb.push(`}`)

  // Apply light theme
  sb.push(`:root, .light-theme {`)
  sb.push(`  color-scheme: light;`)
  applyScheme(theme.schemes.light)
  sb.push(`}`)

  // Set dark theme
  sb.push(`.dark-theme {`)
  sb.push(`  color-scheme: dark;`)
  applyScheme(theme.schemes.dark)
  sb.push(`}`)

  setStyle('theme', sb.join('\n'))
}

// function applyPalettes(theme: Theme, tones: number[], rgb: boolean, setStyle: StyleCallback) {
//   // Palettes
//   const applyPalette = (palette: TonalPalette, group: string, tones: number[]) => {
//     const sb: string[] = []
//     sb.push(`:root {`)
//     for (const tone of tones) {
//       const color = palette.tone(tone)
//       const tokenName = `--md-ref-palette-${group}${tone}`
//       addToken(sb, tokenName, color, rgb)
//     }
//     sb.push(`}`)
//     return sb.join('\n')
//   }
//
//   // Primary
//   const primaryPalette = applyPalette(theme.palettes.primary, 'primary', tones)
//   setStyle('palette-primary', primaryPalette)
//
//   // Secondary
//   const secondaryPalette = applyPalette(theme.palettes.secondary, 'secondary', tones)
//   setStyle('palette-secondary', secondaryPalette)
//
//   // Tertiary
//   const tertiaryPalette = applyPalette(theme.palettes.tertiary, 'tertiary', tones)
//   setStyle('palette-tertiary', tertiaryPalette)
//
//   // Error
//   const errorPalette = applyPalette(theme.palettes.error, 'error', tones)
//   setStyle('palette-error', errorPalette)
//
//   // Neutral
//   const neutralPalette = applyPalette(theme.palettes.neutral, 'neutral', tones)
//   setStyle('palette-neutral', neutralPalette)
//
//   // Neutral Variant
//   const neutralVariantPalette = applyPalette(theme.palettes.neutralVariant, 'neutral-variant', tones)
//   setStyle('palette-neutral-variant', neutralVariantPalette)
// }

export function applyTheme(source: string, rgb: boolean, tones: number[], setStyle: StyleCallback) {
  const theme = themeFromSourceColor(argbFromHex(source))
  applySchemes(theme, source, rgb, setStyle)
  // applyPalettes(theme, tones, rgb, setStyle);
}
