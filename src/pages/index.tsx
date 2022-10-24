import styles from './style.module.less'
import PageTitleCard from '@/components/PageTitleCard'

const Index = () => {
  const description = '通过获取图片主色调自动生成主题方案'
  return (
    <div className={styles.index}>
      <PageTitleCard pageTitle="动态颜色" pageDescription={description} />
    </div>
  )
}

export default Index
