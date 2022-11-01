import Highlight, { defaultProps } from 'prism-react-renderer'
import { useContext } from 'react'
import { ThemeContext } from '@/stores/theme'

const Code = () => {
  const { css } = useContext(ThemeContext)
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Highlight {...defaultProps} code={css} language="css">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default Code
