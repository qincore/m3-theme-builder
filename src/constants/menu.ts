import { IMenuConstants } from '@/types/constants'

export const MENU: IMenuConstants[] = [
  {
    name: '动态颜色',
    path: '/dynamic/palette',
    icon: 'auto_awesome',
    children: [
      {
        name: '色板',
        path: '/dynamic/palette',
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
    path: '/custom/palette',
    icon: 'tune',
    children: [
      {
        name: '色板',
        path: '/custom/palette',
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
