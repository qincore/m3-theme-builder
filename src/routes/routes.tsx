import { Navigate, RouteObject } from 'react-router-dom'
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

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dynamic/palette" />
  },

  // 动态颜色页路由
  {
    path: '/dynamic',
    element: <Navigate to="/dynamic/palette" />
  },
  {
    path: '/dynamic',
    element: <Dynamic />,
    children: [
      {
        path: '/dynamic/palette',
        element: <Palette />
      },
      {
        path: '/dynamic/code',
        element: <Code />
      }
    ]
  },

  // 自定义页路由
  {
    path: '/custom',
    element: <Navigate to="/custom/palette" />
  },
  {
    path: '/custom',
    element: <Custom />,
    children: [
      {
        path: '/custom/palette',
        element: <Palette />
      },
      {
        path: '/custom/code',
        element: <Code />
      }
    ]
  }
]

export default routes
