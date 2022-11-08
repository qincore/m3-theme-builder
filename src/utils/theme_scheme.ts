import { CorePalette } from '@material/material-color-utilities'

export interface IThemeSchemeProps {
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

export interface ISourceParams {
  primary: number
  secondary?: number
  tertiary?: number
  neutral?: number
}

export class ThemeScheme {
  private static mergeCorePalette = ({ primary, secondary, tertiary, neutral }: ISourceParams) => {
    const pCore = CorePalette.of(primary)
    return {
      pCore,
      sCore: secondary ? CorePalette.of(secondary) : pCore,
      tCore: tertiary ? CorePalette.of(tertiary) : pCore,
      nCore: neutral ? CorePalette.of(neutral) : pCore
    }
  }

  private static mergeTonal = ({
    secondary,
    tertiary
  }: ISourceParams): { sTonal: 'a2' | 'a1'; tTonal: 'a3' | 'a1' } => {
    return {
      sTonal: secondary ? 'a1' : 'a2',
      tTonal: tertiary ? 'a1' : 'a3'
    }
  }

  static sourceToLight = (source: ISourceParams) => {
    const { pCore, sCore, tCore, nCore } = this.mergeCorePalette(source)
    const { sTonal, tTonal } = this.mergeTonal(source)
    return new ThemeScheme({
      primary: pCore.a1.tone(40),
      onPrimary: pCore.a1.tone(100),
      primaryContainer: pCore.a1.tone(90),
      onPrimaryContainer: pCore.a1.tone(10),
      secondary: sCore[sTonal].tone(40),
      onSecondary: sCore[sTonal].tone(100),
      secondaryContainer: sCore[sTonal].tone(90),
      onSecondaryContainer: sCore[sTonal].tone(10),
      tertiary: tCore[tTonal].tone(40),
      onTertiary: tCore[tTonal].tone(100),
      tertiaryContainer: tCore[tTonal].tone(90),
      onTertiaryContainer: tCore[tTonal].tone(10),
      error: pCore.error.tone(40),
      onError: pCore.error.tone(100),
      errorContainer: pCore.error.tone(90),
      onErrorContainer: pCore.error.tone(10),
      background: nCore.n1.tone(99),
      onBackground: nCore.n1.tone(10),
      surface: nCore.n1.tone(99),
      onSurface: nCore.n1.tone(10),
      surfaceVariant: pCore.n2.tone(90),
      onSurfaceVariant: pCore.n2.tone(30),
      outline: pCore.n2.tone(50),
      outlineVariant: pCore.n2.tone(80),
      shadow: pCore.n1.tone(0),
      scrim: pCore.n1.tone(0),
      inverseSurface: pCore.n1.tone(20),
      inverseOnSurface: pCore.n1.tone(95),
      inversePrimary: pCore.a1.tone(80)
    })
  }

  static sourceToDark = (source: ISourceParams) => {
    const { pCore, sCore, tCore, nCore } = this.mergeCorePalette(source)
    const { sTonal, tTonal } = this.mergeTonal(source)

    return new ThemeScheme({
      primary: pCore.a1.tone(80),
      onPrimary: pCore.a1.tone(20),
      primaryContainer: pCore.a1.tone(30),
      onPrimaryContainer: pCore.a1.tone(90),
      secondary: sCore[sTonal].tone(80),
      onSecondary: sCore[sTonal].tone(20),
      secondaryContainer: sCore[sTonal].tone(30),
      onSecondaryContainer: sCore[sTonal].tone(90),
      tertiary: tCore[tTonal].tone(80),
      onTertiary: tCore[tTonal].tone(20),
      tertiaryContainer: tCore[tTonal].tone(30),
      onTertiaryContainer: tCore[tTonal].tone(90),
      error: pCore.error.tone(80),
      onError: pCore.error.tone(20),
      errorContainer: pCore.error.tone(30),
      onErrorContainer: pCore.error.tone(80),
      background: nCore.n1.tone(10),
      onBackground: nCore.n1.tone(90),
      surface: nCore.n1.tone(10),
      onSurface: nCore.n1.tone(90),
      surfaceVariant: pCore.n2.tone(30),
      onSurfaceVariant: pCore.n2.tone(80),
      outline: pCore.n2.tone(60),
      outlineVariant: pCore.n2.tone(30),
      shadow: pCore.n1.tone(0),
      scrim: pCore.n1.tone(0),
      inverseSurface: pCore.n1.tone(90),
      inverseOnSurface: pCore.n1.tone(20),
      inversePrimary: pCore.a1.tone(40)
    })
  }

  private constructor(private readonly props: IThemeSchemeProps) {}

  public toJSON = () => ({ ...this.props })
}
