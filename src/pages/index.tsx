import { useState } from 'react'
import reactLogo from '@/assets/react.svg'
import eslintLogo from '@/assets/eslint.svg'
import prettierLogo from '@/assets/prettier.svg'
import styles from './style.module.less'

const Index = () => {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.index}>
      <div className={styles['frame-logo']}>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className={styles['frame-item']} alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className={styles['frame-item']} alt="React logo" />
        </a>
      </div>
      <div className={styles['tool-logo']}>
        <a href="https://eslint.org" target="_blank" rel="noreferrer">
          <img src={eslintLogo} className={styles['tool-item']} alt="React logo" />
        </a>
        <a href="https://prettier.io" target="_blank" rel="noreferrer">
          <img src={prettierLogo} className={styles['tool-item']} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>ESLint + StyleLint + Prettier</h2>
      <div className={styles['card']}>
        <button onClick={() => setCount((pre) => pre + 1)}>
          count is
          {count}
        </button>
        <p>
          Edit
          <code> src/pages/index.tsx </code>
          and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  )
}

export default Index
