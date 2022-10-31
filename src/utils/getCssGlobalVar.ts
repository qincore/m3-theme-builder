export const getCssGlobalVar = (name: string) => {
  return getComputedStyle(document.body).getPropertyValue(name)
}
