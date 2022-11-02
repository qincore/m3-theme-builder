import { useContext } from 'react'
import { ThemeContext } from '@/stores/theme'
import CodeBlock from '@/components/Code/CodeBlock'
import styles from './style.module.less'

const Code = () => {
  const { css } = useContext(ThemeContext)
  return (
    <div className={styles.code}>
      {css.map((item) => (
        <>
          <h2>{item.type}</h2>
          <CodeBlock code={item.css} language="css" copyButton />
        </>
      ))}
    </div>
  )
}
export default Code
