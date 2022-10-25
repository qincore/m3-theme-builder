import { alphaFromArgb, blueFromArgb, greenFromArgb, redFromArgb } from '@material/material-color-utilities'

/**
 * @param back ARGB 数字.
 * @param fore ARGB 数字.
 * @return 混合后的的 ARGB 数字.
 */
export const blendColors = (back: number, fore: number): { argb: number; rgba: string } => {
  const backArr = [
    redFromArgb(back),
    greenFromArgb(back),
    blueFromArgb(back),
    Number((alphaFromArgb(back) / 255).toFixed(2))
  ]
  const foreArr = [
    redFromArgb(fore),
    greenFromArgb(fore),
    blueFromArgb(fore),
    Number((alphaFromArgb(fore) / 255).toFixed(2))
  ]
  const res = []
  // alpha
  res[3] = 1 - (1 - foreArr[3]) * (1 - backArr[3])

  // red
  res[0] = Math.round((foreArr[0] * foreArr[3]) / res[3] + (backArr[0] * backArr[3] * (1 - foreArr[3])) / res[3])

  // green
  res[1] = Math.round((foreArr[1] * foreArr[3]) / res[3] + (backArr[1] * backArr[3] * (1 - foreArr[3])) / res[3])

  // blue
  res[2] = Math.round((foreArr[2] * foreArr[3]) / res[3] + (backArr[2] * backArr[3] * (1 - foreArr[3])) / res[3])

  console.log(backArr, foreArr, res)

  return {
    // eslint-disable-next-line no-bitwise
    argb: (((res[3] * 255) << 24) | ((res[0] & 255) << 16) | ((res[1] & 255) << 8) | (res[2] & 255)) >>> 0,
    rgba: `rgba(${res[0]}, ${res[1]}, ${res[2]}, ${res[3]})`
  }
}

/**
 * @param argb ARGB 数字.
 * @return Hex 16进制字符串色值, 如：红色 #ff0000.
 */
export const hexFromArgb = (argb: number): string => {
  const a = alphaFromArgb(argb)
  const r = redFromArgb(argb)
  const g = greenFromArgb(argb)
  const b = blueFromArgb(argb)
  const outParts = [r.toString(16), g.toString(16), b.toString(16), a.toString(16)]

  // eslint-disable-next-line no-restricted-syntax
  for (const [i, part] of outParts.entries()) {
    if (part.length === 1) {
      outParts[i] = `0${part}`
    }
  }

  return `#${outParts.join('')}`
}

/**
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
