import { RouteObject } from 'react-router-dom'
import Dynamic from '@/pages/Dynamic'
import Palette from '@/components/Palette'
import Custom from '@/pages/Custom'
import Code from '@/components/Code'
import Layout from '@/layout'

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
    element: <Layout />,
    children: [
      {
        path: '/dynamic',
        element: <Dynamic />,
        children: [
          {
            path: '/dynamic',
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
            path: '/custom',
            element: <Palette />
          },
          {
            path: '/custom/code',
            element: <Code />
          }
        ]
      }
    ]
  }
]

export default routes
