import { CorePalette } from '@material/material-color-utilities'
import { argbAddAlpha, blendColors } from '@/utils/color_utils'

export interface ISurfaceProps {
  'surface-0': number
  'surface-1': number
  'surface-2': number
  'surface-3': number
  'surface-4': number
  'surface-5': number
}

export class Surface {
  /**
   * @param argb ARGB 原色
   * @return 亮色 surface scheme
   */
  static light(argb: number): Surface {
    return Surface.lightFromCorePalette(CorePalette.of(argb))
  }

  /**
   * @param argb ARGB 原色
   * @return 暗黑 surface scheme
   */
  static dark(argb: number): Surface {
    return Surface.darkFromCorePalette(CorePalette.of(argb))
  }

  /**
   * @param surface ARGB 背景
   * @param primary ARGB 前景
   * @return 混合后的 surface 方案
   */
  static blendSurface(surface: number, primary: number): Surface {
    return new Surface({
      'surface-0': surface,
      'surface-1': blendColors(surface, argbAddAlpha(primary, 0.05), 'argb') as number,
      'surface-2': blendColors(surface, argbAddAlpha(primary, 0.08), 'argb') as number,
      'surface-3': blendColors(surface, argbAddAlpha(primary, 0.11), 'argb') as number,
      'surface-4': blendColors(surface, argbAddAlpha(primary, 0.12), 'argb') as number,
      'surface-5': blendColors(surface, argbAddAlpha(primary, 0.14), 'argb') as number
    })
  }

  /**
   * 亮色
   */
  static lightFromCorePalette(core: CorePalette): Surface {
    const primaryFore = core.a1.tone(40)
    const surfaceBack = core.n1.tone(99)
    return this.blendSurface(surfaceBack, primaryFore)
  }

  /**
   * 暗色
   */
  static darkFromCorePalette(core: CorePalette): Surface {
    const primaryFore = core.a1.tone(80)
    const surfaceBack = core.n1.tone(10)
    return this.blendSurface(surfaceBack, primaryFore)
  }

  private constructor(private readonly props: ISurfaceProps) {}

  toJSON() {
    return {
      ...this.props
    }
  }
}
