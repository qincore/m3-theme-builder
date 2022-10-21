import Index from '@/pages'
import About from '@/pages/About'

const routes = [
  {
    name: '动态颜色',
    path: '/',
    icon: 'auto_awesome',
    element: <Index />
  },
  {
    name: '自定义',
    path: '/about',
    icon: 'palette',
    element: <About />
  }
]

export default routes
