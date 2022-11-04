import { useEffect, useState } from 'react'
import { Hct, hexFromArgb } from '@material/material-color-utilities'
import Slider from '@/components/Slider'
import styles from './style.module.less'

interface IHctValue {
  h?: number
  c?: number
  t?: number
}

interface IColorPickerProps {
  onChange?: (hex: string) => void
}

const ColorPicker = (props: IColorPickerProps) => {
  const { onChange } = props
  const [hctValue, setHctValue] = useState<IHctValue>({ h: 290, c: 48, t: 40 })
  const [sColor, setSColor] = useState<string>()
  const sliderChange = (v: IHctValue) => {
    setHctValue((pre) => ({ ...pre, ...v }))
  }
  useEffect(() => {
    if (hctValue.h && hctValue.c && hctValue.t) {
      const sHct = Hct.from(hctValue.h, hctValue.c, hctValue.t)
      const sHex = hexFromArgb(sHct.toInt())
      setSColor(sHex)
      onChange?.(sHex)
    }
  }, [hctValue])
  return (
    <div>
      <div className={styles.colorViewBox} style={{ backgroundColor: sColor }} />
      <Slider
        label="Hue"
        min="0"
        max="360"
        bg="linear-gradient(to right, rgb(231, 0, 125) 0%, rgb(216, 66, 0) 10%, rgb(165, 106, 0) 20%, rgb(127, 122, 0) 30%, rgb(0, 139, 24) 40%, rgb(0, 134, 115) 50%, rgb(0, 131, 152) 60%, rgb(0, 123, 200) 70%, rgb(105, 95, 255) 80%, rgb(196, 0, 246) 90%, rgb(230, 0, 128) 99.7222%)"
        defaultValue={`${hctValue.h}`}
        onChange={(h) => sliderChange({ h: Number(h) })}
      />
      <Slider
        label="Chroma"
        min="0"
        max="150"
        defaultValue={`${hctValue.c}`}
        onChange={(c) => sliderChange({ c: Number(c) })}
      />
      <Slider
        label="Tone"
        min="0"
        max="100"
        defaultValue={`${hctValue.t}`}
        onChange={(t) => sliderChange({ t: Number(t) })}
      />
    </div>
  )
}

export default ColorPicker
