import { argbFromRgb } from '@material/material-color-utilities/dist/utils/color_utils'
import { QuantizerCelebi } from '@material/material-color-utilities/dist/quantize/quantizer_celebi'
import { Score } from '@material/material-color-utilities/dist/score/score'

/**
 * 获取图片原始数据
 * @param image img 元素
 * @return 图片原始数据
 */
const getImageData = async (image: HTMLImageElement): Promise<Uint8ClampedArray> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) {
      reject(new Error('Could not get canvas context'))
      return
    }
    // eslint-disable-next-line no-param-reassign
    image.onload = () => {
      canvas.width = image.width
      canvas.height = image.height
      context.drawImage(image, 0, 0)
      resolve(context.getImageData(0, 0, image.width, image.height).data)
    }
  })
}

/**
 * 获取图片像素数据 argb
 * @param imageData 图片原始数据
 * @param quality 采样基数 默认 10（越大越快-精度差、越小越慢-精度高）
 * @return 图片像素数据 argb
 */
const getPixelArray = (imageData: Uint8ClampedArray, quality: number): number[] => {
  const pixels = []
  for (let i = 0; i < imageData.length; i += i + quality) {
    const offset = i * 4
    const r = imageData[offset]
    const g = imageData[offset + 1]
    const b = imageData[offset + 2]
    const a = imageData[offset + 3]

    if (typeof a === 'undefined' || a >= 125) {
      if (!(r > 250 && g > 250 && b > 250)) {
        const argb = argbFromRgb(r, g, b)
        pixels.push(argb)
      }
    }
  }
  return pixels
}
/**
 * 从图片获取主色
 * @param image img 元素
 * @param quality 采样基数 默认 10（越大越快-精度差、越小越慢-精度高）
 * @return 图片主色
 */
export async function sourceColorFromImage(image: HTMLImageElement, quality = 10): Promise<number> {
  // 获取图片数据
  const imageData = await getImageData(image)
  // 获取图片像素数据 argb
  const pixelArray = getPixelArray(imageData, quality)
  // 获取主色
  const result = QuantizerCelebi.quantize(pixelArray, 128)
  const ranked = Score.score(result)
  return ranked[0]
}
