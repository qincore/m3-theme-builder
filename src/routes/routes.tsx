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
    element: <Navigate to="/dynamic" />
  },
  {
    path: '/dynamic',
    element: <Dynamic />,
    children: [
      {
        index: true,
        element: <Palette />
      },
      {
        path: '/dynamic/code',
        element: <Code />
      }
    ]
  },
  {
    path: '/custom',
    element: <Custom />,
    children: [
      {
        index: true,
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
