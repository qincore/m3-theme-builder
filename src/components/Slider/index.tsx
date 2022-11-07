import { ChangeEvent, memo } from 'react'
import classnames from 'classnames'
import styles from './style.module.less'

interface ISliderProps {
  label: string
  bg?: string
  min?: string
  max?: string
  value?: string
  className?: string
  onChange?: (value: string) => void
}

const Slider = (props: ISliderProps) => {
  const { label, bg, min, max, value, className, onChange } = props
  // const [value, setValue] = useState<string>('0')

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      onChange?.('0')
      return
    }
    onChange?.(e.target.value.replace(/^[0]+/, ''))
  }

  const rangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={classnames(styles.slider, className)}>
      <div className={styles.sliderHeader}>
        <div className={styles.sliderLabel}>{label}</div>
        <div className={styles.sliderValue}>
          <input
            min={min}
            max={max}
            type="text"
            className={styles.sliderValueInput}
            value={value}
            onChange={inputChange}
          />
        </div>
      </div>
      <input
        value={value}
        style={{ backgroundImage: bg ?? 'red', boxShadow: 'inset 0 0 2px 1px rgba(0,0,0,.2)' }}
        type="range"
        name="hue"
        min={min}
        max={max}
        onChange={rangeChange}
      />
    </div>
  )
}
export default memo(Slider)
