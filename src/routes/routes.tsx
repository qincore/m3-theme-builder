import { Navigate } from 'react-router-dom'
import Dynamic from '@/pages/Dynamic'
import Palette from '@/components/Palette'
import Custom from '@/pages/Custom'
import Code from '@/components/Code'

export interface IRoutes {
  name?: string
  path: string
  icon?: string
  element: JSX.Element
  children?: IRoutes[]
}

const routes: IRoutes[] = [
  {
    name: '首页',
    path: '/',
    element: <Navigate to="/dynamic" />
  },
  {
    name: '动态颜色页',
    path: '/dynamic',
    icon: 'auto_awesome',
    element: <Dynamic />,
    children: [
      {
        name: '动态颜色色板',
        path: '/dynamic',
        icon: 'palette',
        element: <Palette />
      },
      {
        name: '动态颜色代码',
        path: '/dynamic/code',
        icon: 'code',
        element: <Code />
      }
    ]
  },
  {
    name: '自定义',
    path: '/custom',
    icon: 'tune',
    element: <Custom />,
    children: [
      {
        name: '动态颜色色板',
        path: '/custom',
        icon: 'palette',
        element: <Palette />
      },
      {
        name: '动态颜色代码',
        path: '/custom/code',
        icon: 'code',
        element: <Code />
      }
    ]
  }
]

export default routes
