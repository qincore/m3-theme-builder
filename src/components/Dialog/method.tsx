import ReactDom from 'react-dom/client'
import Dialog, { IDialogProps } from './Dialog'
import { lockBody } from '@/utils/lockBody'

const defaultProps = {
  okText: '确 定',
  cancelText: '取 消',
  content: '内容'
}

export interface IDialogShowProps extends IDialogProps {
  onClosed?: () => void
}

export const show = (p: IDialogShowProps) => {
  const props = { ...defaultProps, ...p }
  const { onClosed, ...restProps } = props
  const close = () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    container.remove()
    lockBody(false)
    onClosed?.()
  }

  const container = document.createElement('div')
  document.body.appendChild(container)
  lockBody(true)
  // eslint-disable-next-line react/jsx-props-no-spreading
  const element = <Dialog onClose={() => close()} {...restProps} />
  const root = ReactDom.createRoot(container)

  root.render(element)
}
