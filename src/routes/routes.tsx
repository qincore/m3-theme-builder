import Index from '@/pages'
import About from '@/pages/About'

const routes = [
  {
    name: 'index',
    path: '/',
    element: <Index />
  },
  {
    name: 'about',
    path: '/about',
    element: <About />
  }
]

export default routes
