import { memo, useState } from 'react'
import classnames from 'classnames'
import styles from './style.module.less'

interface IRgbInputProps {
  value: number[]
  onBlur: () => void
  onChange: (v: number[]) => void
}

const RgbInput = (props: IRgbInputProps) => {
  const { value, onBlur, onChange } = props
  const [focus, setFocus] = useState(false)
  const inputFocus = () => {
    setFocus(true)
  }
  const inputBlur = () => {
    setFocus(false)
    onBlur()
  }
  const inputChange = (v: number, i: number) => {
    const newRgb = value.map((item, idx) => (idx === i ? v : item))
    onChange(newRgb)
  }
  return (
    <div className={classnames(styles.rgbInput, { [styles.focus]: focus })}>
      <input
        value={value[0]}
        type="text"
        min="0"
        max="255"
        maxLength={3}
        onFocus={inputFocus}
        onBlur={inputBlur}
        onChange={(e) => inputChange(Number(e.target.value), 0)}
      />
      <input
        value={value[1]}
        type="text"
        min="0"
        max="255"
        maxLength={3}
        onFocus={inputFocus}
        onBlur={inputBlur}
        onChange={(e) => inputChange(Number(e.target.value), 1)}
      />
      <input
        value={value[2]}
        type="text"
        min="0"
        max="255"
        maxLength={3}
        onFocus={inputFocus}
        onBlur={inputBlur}
        onChange={(e) => inputChange(Number(e.target.value), 2)}
      />
    </div>
  )
}
export default memo(RgbInput)
