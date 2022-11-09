import { CorePalette, TonalPalette } from '@material/material-color-utilities'
import { ISourceParams } from '@/types/scheme'

export interface IPaletteSchemeProps {
  primary: TonalPalette
  secondary: TonalPalette
  tertiary: TonalPalette
  neutral: TonalPalette
  neutralVariant: TonalPalette
  error: TonalPalette
}

export class PaletteScheme {
  public static mergeCorePalette = ({ primary, secondary, tertiary, neutral }: ISourceParams) => {
    const pCore = CorePalette.of(primary)
    return {
      pCore,
      sCore: secondary ? CorePalette.of(secondary) : pCore,
      tCore: tertiary ? CorePalette.of(tertiary) : pCore,
      nCore: neutral ? CorePalette.of(neutral) : pCore
    }
  }

  public static mergeTonal = ({ secondary, tertiary }: ISourceParams): { sTonal: 'a2' | 'a1'; tTonal: 'a3' | 'a1' } => {
    return {
      sTonal: secondary ? 'a1' : 'a2',
      tTonal: tertiary ? 'a1' : 'a3'
    }
  }

  static sourceToPalette = (source: ISourceParams) => {
    const { pCore, sCore, tCore, nCore } = this.mergeCorePalette(source)
    const { sTonal, tTonal } = this.mergeTonal(source)
    return new PaletteScheme({
      primary: pCore.a1,
      secondary: sCore[sTonal],
      tertiary: tCore[tTonal],
      neutral: nCore.n1,
      neutralVariant: nCore.n2,
      error: pCore.error
    })
  }

  private constructor(private readonly props: IPaletteSchemeProps) {}

  public toJSON = () => ({ ...this.props })
}
