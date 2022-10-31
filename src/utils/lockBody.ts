export const lockBody = (sw: boolean) => {
  const scrollBarWidth = window.innerWidth - document.body.clientWidth
  if (sw) {
    document.body.style.height = '100%'
    document.body.style.paddingRight = `${scrollBarWidth}px`
    document.body.style.overflow = 'hidden'
  } else {
    // @ts-ignore
    document.body.style.height = null
    // @ts-ignore
    document.body.style.paddingRight = null
    // @ts-ignore
    document.body.style.overflow = null
  }
}
