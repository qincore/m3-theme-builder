import { alphaFromArgb, blueFromArgb, greenFromArgb, redFromArgb } from '@material/material-color-utilities'

/**
 * @description 将背景色和前景色混合成新的颜色，主要用于计算出surface高程颜色.
 * @param back ARGB 数字.
 * @param fore ARGB 数字.
 * @param colorMode 输出的颜色模式 argb ｜ rgba ｜ hex.
 * @return 混合后 ARGB 数字 ｜ rgba rgba(x,x,x,x) ｜ hex #ff0844.
 */
export const blendColors = (back: number, fore: number, colorMode: 'argb' | 'rgba' | 'hex'): string | number => {
  const backRGBA = {
    r: redFromArgb(back),
    g: greenFromArgb(back),
    b: blueFromArgb(back),
    a: alphaFromArgb(back) / 255
  }
  const foreRGBA = {
    r: redFromArgb(fore),
    g: greenFromArgb(fore),
    b: blueFromArgb(fore),
    a: alphaFromArgb(fore) / 255
  }
  const a = 1 - (1 - foreRGBA.a) * (1 - backRGBA.a)
  const r = Math.round((foreRGBA.r * foreRGBA.a) / a + (backRGBA.r * backRGBA.a * (1 - foreRGBA.a)) / a)
  const g = Math.round((foreRGBA.g * foreRGBA.a) / a + (backRGBA.g * backRGBA.a * (1 - foreRGBA.a)) / a)
  const b = Math.round((foreRGBA.b * foreRGBA.a) / a + (backRGBA.b * backRGBA.a * (1 - foreRGBA.a)) / a)

  if (colorMode === 'hex') {
    const rgbaArr = [r.toString(16), g.toString(16), b.toString(16), (a * 255).toString(16)]
    return `#${rgbaArr.map((item) => (item.length === 1 ? `0${item}` : item)).join('')}`
  }

  if (colorMode === 'rgba') {
    return `rgba(${r},${g},${b},${a})`
  }

  // ARGB
  // eslint-disable-next-line no-bitwise
  return ((a << 24) | ((r & 255) << 16) | ((g & 255) << 8) | (b & 255)) >>> 0
}

/**
 * @description 将 ARGB 转换为 hex WEB颜色字符串.
 * @param argb ARGB 数字.
 * @return Hex 16进制字符串色值, 如：红色 #ff0000.
 */
export const hexFromArgb = (argb: number): string => {
  const a = alphaFromArgb(argb)
  const r = redFromArgb(argb)
  const g = greenFromArgb(argb)
  const b = blueFromArgb(argb)
  const rgbaArr = [r.toString(16), g.toString(16), b.toString(16), a.toString(16)]

  return `#${rgbaArr.map((item) => (item.length === 1 ? `0${item}` : item)).join('')}`
}

/**
 * @description 给 ARGB 添加透明度.
 * @param argb ARGB 数字.
 * @param alpha 需要添加的透明度 0 - 1.
 * @return 加入透明度的 ARGB 数字.
 */
export const argbAddAlpha = (argb: number, alpha: number): number => {
  const a = alpha * 255
  const sr = redFromArgb(argb)
  const sg = greenFromArgb(argb)
  const sb = blueFromArgb(argb)
  // eslint-disable-next-line no-bitwise
  return ((a << 24) | ((sr & 255) << 16) | ((sg & 255) << 8) | (sb & 255)) >>> 0
}
