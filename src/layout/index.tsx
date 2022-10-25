import { useLocation } from 'react-router-dom'
import { normal } from 'color-blend'
import styles from './style.module.less'
import Navbar from '@/components/Navbar'
import Router from '@/routes'
import routes from '@/routes/routes'
import { argbAddAlpha, blendColors, hexFromArgb } from '@/utils/color_utils'

const Layout = () => {
  const { pathname } = useLocation()
  const fa = argbAddAlpha(4278213063, 0.08)
  const hc = blendColors(4294900735, fa)
  const hex = hexFromArgb(hc.argb)
  const rgba = normal({ r: 254, g: 251, b: 255, a: 1 }, { r: 0, g: 89, b: 199, a: 0.08 })
  return (
    <>
      <Navbar pathname={pathname} menu={routes} />
      <main className={styles['app-main']}>
        <div style={{ width: '200px', height: '200px', backgroundColor: hex }} />
        <div
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
          }}
        />
        <Router />
      </main>
    </>
  )
}

export default Layout
