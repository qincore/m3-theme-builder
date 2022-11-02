import Highlight, { defaultProps, PrismTheme } from 'prism-react-renderer'
import { useContext } from 'react'
import { ThemeContext } from '@/stores/theme'
import styles from './style.module.less'
import Clipboard from '@/components/Clipboard'

const theme: PrismTheme = {
  plain: {
    color: 'var(--md-sys-color-on-tertiary-container)',
    backgroundColor: 'var(--md-sys-color-surface1)'
  },
  styles: [
    {
      types: ['prolog'],
      style: {
        color: 'rgb(0, 0, 128)'
      }
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(106, 153, 85)'
      }
    },
    {
      types: ['builtin', 'changed', 'keyword', 'interpolation-punctuation'],
      style: {
        color: 'rgb(86, 156, 214)'
      }
    },
    {
      types: ['number', 'inserted'],
      style: {
        color: 'var(--md-sys-color-on-tertiary-container)'
      }
    },
    {
      types: ['constant'],
      style: {
        color: 'rgb(100, 102, 149)'
      }
    },
    {
      types: ['attr-name', 'variable'],
      style: {
        color: 'var(--md-sys-color-primary)'
      }
    },
    {
      types: ['deleted', 'string', 'attr-value', 'template-punctuation'],
      style: {
        color: 'rgb(206, 145, 120)'
      }
    },
    {
      types: ['selector'],
      style: {
        color: 'rgb(255 173 0)'
      }
    },
    {
      // Fix tag color
      types: ['tag'],
      style: {
        color: 'rgb(78, 201, 176)'
      }
    },
    {
      // Fix tag color for HTML
      types: ['tag'],
      languages: ['markup'],
      style: {
        color: 'rgb(86, 156, 214)'
      }
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: 'rgb(212, 212, 212)'
      }
    },
    {
      // Fix punctuation color for HTML
      types: ['punctuation'],
      languages: ['markup'],
      style: {
        color: '#808080'
      }
    },
    {
      types: ['function'],
      style: {
        color: 'rgb(220, 220, 170)'
      }
    },
    {
      types: ['class-name'],
      style: {
        color: 'rgb(78, 201, 176)'
      }
    },
    {
      types: ['char'],
      style: {
        color: 'rgb(209, 105, 105)'
      }
    }
  ]
}

const Code = () => {
  const { css } = useContext(ThemeContext)
  return (
    <div className={styles.codeBlock}>
      <Clipboard text={css} copyId="all-css" className={styles.copyBtn} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Highlight {...defaultProps} theme={theme} code={css} language="css">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div style={{ display: 'table-row' }}>
                <div
                  style={{
                    display: 'table-cell',
                    textAlign: 'right',
                    padding: '2px 12px',
                    borderRight: '1px solid rgba(var(--md-sys-color-outline-rgb), .35)',
                    userSelect: 'none'
                  }}
                >
                  {i}
                </div>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <div {...getLineProps({ line, key: i })} style={{ marginLeft: '10px' }}>
                  {line.map((token, key) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default Code
