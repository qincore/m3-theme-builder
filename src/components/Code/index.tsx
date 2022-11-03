import { useContext } from 'react'
import { motion } from 'framer-motion'
import { ThemeContext } from '@/stores/theme'
import CodeBlock from '@/components/Code/CodeBlock'
import styles from './style.module.less'

const Code = () => {
  const { css } = useContext(ThemeContext)
  return (
    <motion.div
      className={styles.code}
      initial={{ opacity: 0, x: '10%' }}
      animate={{ opacity: 1, x: '0' }}
      exit={{ opacity: 0, x: '10%' }}
      transition={{ ease: [0.2, 0, 0, 1] }}
    >
      {css.map((item) => (
        <div key={item.type}>
          <h2>{item.type}</h2>
          <CodeBlock code={item.css} language="css" copyButton />
        </div>
      ))}
    </motion.div>
  )
}
export default Code
