export const getCssGlobalVar = (name: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(name)
}
