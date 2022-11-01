export interface IThemeConstants {
  token: string
  hex: string
  rgb: string
  content: string
}

export interface ITonalPaletteConstants {
  token: string
  hex: string
  tonals: number[]
}

export interface IMenuConstants {
  name: string
  path: string
  icon: string
  children?: IMenuConstants[]
}
