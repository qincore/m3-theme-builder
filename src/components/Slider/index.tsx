import { useEffect, useState, ChangeEvent } from 'react'
import styles from './style.module.less'

interface ISliderProps {
  label: string
  bg?: string
  min?: string
  max?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

const Slider = (props: ISliderProps) => {
  const { label, bg, min, max, defaultValue, onChange } = props
  const [value, setValue] = useState<string>(defaultValue ?? '0')

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setValue('0')
      return
    }
    setValue(e.target.value.replace(/^[0]+/, ''))
  }

  const rangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    onChange?.(value)
  }, [value])

  return (
    <div className={styles.slider}>
      <div className={styles.sliderHeader}>
        <div className={styles.sliderLabel}>{label}</div>
        <div className={styles.sliderValue}>
          <input min={min} max={max} className={styles.sliderValueInput} value={value} onChange={inputChange} />
        </div>
      </div>
      <input
        value={value}
        style={{ background: bg ?? 'red' }}
        type="range"
        name="hue"
        min={min}
        max={max}
        onChange={rangeChange}
      />
    </div>
  )
}
export default Slider
