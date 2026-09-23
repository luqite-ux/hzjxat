const LOCAL_PRODUCT_PATH = "/images/products/"

export function resolveDisplayImage(src: string | null | undefined) {
  if (!src) return "/placeholder.svg"

  try {
    const url = new URL(src)
    const marker = "/customers/hzjxat/products/"
    const index = url.pathname.indexOf(marker)
    if (index >= 0) {
      return `${LOCAL_PRODUCT_PATH}${url.pathname.slice(index + marker.length)}`
    }
  } catch {
    // Relative paths are already safe for the public site.
  }

  return src
}
