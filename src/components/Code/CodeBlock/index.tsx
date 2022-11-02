import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import styles from './style.module.less'
import Clipboard from '@/components/Clipboard'
import { codeTheme } from '@/constants'

interface ICodeBlockProps {
  code: string
  language: Language
  copyButton?: boolean
}

const CodeBlock = (props: ICodeBlockProps) => {
  const { code, language, copyButton } = props
  return (
    <div className={styles.codeBlock}>
      {copyButton && <Clipboard text={code} className={styles.copyBtn} />}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Highlight {...defaultProps} theme={codeTheme} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <div {...getLineProps({ line, key: i })} style={{ marginLeft: '12px' }}>
                {line.map((token, key) => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default CodeBlock
