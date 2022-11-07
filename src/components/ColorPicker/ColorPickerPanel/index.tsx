import { memo, useMemo, useState } from 'react'
import { argbFromHex, CorePalette, Hct, hexFromArgb } from '@material/material-color-utilities'
import Slider from '@/components/Slider'
import styles from './style.module.less'
import { IHctValue } from '@/components/ColorPicker'
import RgbInput from '@/components/ColorPicker/RgbInput'
import { hexToHct, hexToRgb, rgbToHex } from '@/utils/color_utils'

interface IColorPickerPanelProps {
  value: string
  onChange?: (hex: string) => void
}
const hexReg = /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i

const ColorPickerPanel = (props: IColorPickerPanelProps) => {
  const { value, onChange } = props

  const defaultValue = useMemo(() => {
    if (value) {
      const hct = hexToHct(value)
      const rgb = hexToRgb(value)
      return {
        hct: { hue: Math.round(hct.hue), chroma: Math.round(hct.chroma), tone: Math.round(hct.tone) },
        rgb
      }
    }
    return {
      hct: { hue: 290, chroma: 48, tone: 40 },
      rgb: [0, 0, 0]
    }
  }, [value])

  const [hctValue, setHctValue] = useState<IHctValue>(defaultValue.hct)
  const [hexValue, setHexValue] = useState<string>(value)
  const [rgbValue, setRgbValue] = useState<number[]>(defaultValue.rgb)

  const inputChange = (v: string | number[], t: 'hex' | 'rgb') => {
    if (t === 'hex') {
      if (v === '') {
        setHexValue('#')
        return
      }
      setHexValue(v as string)
    }
    if (t === 'rgb') {
      setRgbValue(v as number[])
    }
  }

  const inputBlur = (t: 'hex' | 'rgb') => {
    if (t === 'hex') {
      if (hexReg.test(hexValue)) {
        setHctValue(hexToHct(hexValue))
        setRgbValue(hexToRgb(hexValue as string))
        onChange?.(hexValue)
      }
    }
    if (t === 'rgb') {
      const hex = rgbToHex(rgbValue as number[])
      setHctValue(hexToHct(hex))
      setHexValue(hex)
      onChange?.(hex)
    }
  }

  const hctChange = (v: IHctValue) => {
    const hct = Hct.from(v.hue, v.chroma, v.tone)
    const hex = hexFromArgb(hct.toInt())
    const rgb = hexToRgb(hex)
    setHctValue(v)
    setHexValue(hex)
    setRgbValue(rgb)
    onChange?.(hex)
  }

  const toneBg = useMemo(() => {
    const palette = CorePalette.of(argbFromHex(hexValue))
    const tones = Array.from(new Array(100).keys())
    return {
      tone: tones
        .map((tone) => {
          const rgb = hexToRgb(hexFromArgb(palette.a1.tone(tone)))
          return `rgb(${rgb[0]},${rgb[1]},${rgb[2]}) ${tone}%`
        })
        .join(','),
      chroma: `rgb(119, 119, 119) 0%, rgb(${hexToRgb(hexFromArgb(palette.a1.tone(50))).join(',')}) 70%`
    }
  }, [hctValue.hue])

  return (
    <div>
      <div className={styles.colorViewBox} style={{ backgroundColor: hexValue }} />
      <div className={styles.colorValueInput}>
        <div className={styles.colorValueInputItem}>
          <div className={styles.colorValueInputLabel}>HEX</div>
          <input
            type="text"
            value={hexValue}
            maxLength={7}
            minLength={4}
            onChange={(e) => inputChange(e.target.value, 'hex')}
            onBlur={() => inputBlur('hex')}
          />
        </div>
        <div className={styles.colorValueInputItem}>
          <div className={styles.colorValueInputLabel}>RGB</div>
          <RgbInput value={rgbValue} onChange={(v) => inputChange(v, 'rgb')} onBlur={() => inputBlur('rgb')} />
        </div>
      </div>
      <Slider
        label="Hue"
        min="0"
        max="360"
        className={styles.sliderItem}
        bg="linear-gradient(to right, rgb(231, 0, 125) 0%, rgb(216, 66, 0) 10%, rgb(165, 106, 0) 20%, rgb(127, 122, 0) 30%, rgb(0, 139, 24) 40%, rgb(0, 134, 115) 50%, rgb(0, 131, 152) 60%, rgb(0, 123, 200) 70%, rgb(105, 95, 255) 80%, rgb(196, 0, 246) 90%, rgb(230, 0, 128) 99.7222%)"
        value={`${hctValue.hue}`}
        onChange={(h) => hctChange({ ...hctValue, hue: Number(h) })}
      />
      <Slider
        label="Chroma"
        min="0"
        max="150"
        bg={`linear-gradient(to right, ${toneBg.chroma})`}
        className={styles.sliderItem}
        value={`${hctValue.chroma}`}
        onChange={(c) => hctChange({ ...hctValue, chroma: Number(c) })}
      />
      <Slider
        label="Tone"
        min="0"
        max="100"
        bg={`linear-gradient(to right, ${toneBg.tone})`}
        className={styles.sliderItem}
        value={`${hctValue.tone}`}
        onChange={(t) => hctChange({ ...hctValue, tone: Number(t) })}
      />
    </div>
  )
}

export default memo(ColorPickerPanel)
