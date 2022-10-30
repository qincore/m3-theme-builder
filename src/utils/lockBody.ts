export const lockBody = (sw: boolean) => {
  if (sw) {
    document.body.style.height = '100%'
    document.body.style.overflow = 'hidden'
  } else {
    // @ts-ignore
    document.body.style.height = null
    // @ts-ignore
    document.body.style.overflow = null
  }
}
