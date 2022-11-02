import { PrismTheme } from 'prism-react-renderer'

export const codeTheme: PrismTheme = {
  plain: {
    color: 'var(--md-sys-color-primary)',
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
        color: 'var(--md-sys-color-primary)'
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
        color: 'var(--md-sys-color-secondary)'
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
        color: 'var(--md-sys-color-primary)'
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
        color: 'var(--md-sys-color-outline)'
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
