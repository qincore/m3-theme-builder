import styles from './style.module.less'
import PageTitleCard from '@/components/PageTitleCard'

const Custom = () => {
  const description = '您能够输入自定义主色等，根据输入的颜色将自动自动分配一组互补色调'
  return (
    <div className={styles['app-custom']}>
      <PageTitleCard pageTitle="自定义" pageDescription={description} />
    </div>
  )
}

export default Custom
