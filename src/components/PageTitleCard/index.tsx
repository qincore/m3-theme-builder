import styles from './style.module.less'

interface IPageTitleCardProps {
  pageTitle: string
  pageDescription: string
}

const PageTitleCard = (props: IPageTitleCardProps) => {
  const { pageTitle, pageDescription } = props
  return (
    <div className={styles.pageTitleCard}>
      <div className={styles.title}>{pageTitle}</div>
      <div className={styles.description}>{pageDescription}</div>
    </div>
  )
}
export default PageTitleCard
