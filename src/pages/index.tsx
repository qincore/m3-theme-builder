import { useState } from 'react'
import classnames from 'classnames'
import { ReactComponent as ViteLogo } from '@/assets/vite.svg'
import { ReactComponent as ReactLogo } from '@/assets/react.svg'
import { ReactComponent as EslintLogo } from '@/assets/eslint.svg'
import { ReactComponent as StylelintLogo } from '@/assets/stylelint.svg'
import { ReactComponent as PrettierLogo } from '@/assets/prettier.svg'
import styles from './style.module.less'

const Index = () => {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.index}>
      <div className={styles['frame-logo']}>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <ViteLogo className={classnames(styles['frame-item'], styles['vite-logo'])} />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <ReactLogo className={classnames(styles['frame-item'], styles['react-logo'])} />
        </a>
      </div>
      <div className={styles['tool-logo']}>
        <a href="https://eslint.org" target="_blank" rel="noreferrer">
          <EslintLogo className={classnames(styles['tool-item'], styles['eslint-logo'])} />
        </a>
        <a href="https://stylelint.io" target="_blank" rel="noreferrer">
          <StylelintLogo className={classnames(styles['tool-item'], styles['stylelint-logo'])} />
        </a>
        <a href="https://prettier.io" target="_blank" rel="noreferrer">
          <PrettierLogo className={classnames(styles['tool-item'], styles['prettier-logo'])} />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>ESLint + StyleLint + Prettier</h2>
      <div className={styles.card}>
        <button type="button" onClick={() => setCount((pre) => pre + 1)}>
          count is
          {count}
        </button>
        <p>
          Edit
          <code> src/pages/index.tsx </code>
          and save to test HMR
        </p>
      </div>
      {import.meta.env.MODE}
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  )
}

export default Index
