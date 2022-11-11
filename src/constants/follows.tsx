import { ReactComponent as GitHubIcon } from '@/assets/github-fill.svg'
import { ReactComponent as BiliIcon } from '@/assets/bilibili-fill.svg'
// import { ReactComponent as WeiBoIcon } from '@/assets/weibo-fill.svg'
import { ReactComponent as MyBlog } from '@/assets/global-line.svg'

export const FOLLOWS = [
  {
    name: 'GitHub',
    url: 'https://github.com/qincore/m3-theme-builder',
    icon: <GitHubIcon />
  },
  {
    name: '哔哩哔哩',
    url: 'https://space.bilibili.com/8667132',
    icon: <BiliIcon />
  },
  // {
  //   name: '微博',
  //   url: 'https://space.bilibili.com/8667132',
  //   icon: <WeiBoIcon />
  // },
  {
    name: '个人网站',
    url: 'https://zeir.cc',
    icon: <MyBlog />
  }
]
