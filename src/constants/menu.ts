import { IMenuConstants } from '@/types/constants'

export const MENU: IMenuConstants[] = [
  {
    name: '动态颜色页',
    path: '/dynamic',
    icon: 'auto_awesome',
    children: [
      {
        name: '色板',
        path: '/dynamic',
        icon: 'palette'
      },
      {
        name: 'CSS代码',
        path: '/dynamic/code',
        icon: 'code'
      }
    ]
  },
  {
    name: '自定义',
    path: '/custom',
    icon: 'tune',
    children: [
      {
        name: '色板',
        path: '/custom',
        icon: 'palette'
      },
      {
        name: 'CSS代码',
        path: '/custom/code',
        icon: 'code'
      }
    ]
  }
]
