export interface Pagination<T> {
  items: T[]
  currentPage: number
  pageSize: number
  totalItems: number
  nextPage: () => T[]
  reset: () => void
  hasMorePages: () => boolean
}

export const createPagination = <T>(items: T[], pageSize = 10): Pagination<T> => {
  let currentPage = 0

  const nextPage = (): T[] => {
    const startIndex = currentPage * pageSize
    const endIndex = startIndex + pageSize
    const pageItems = items.slice(startIndex, endIndex)
    currentPage++
    return pageItems
  }

  const reset = () => {
    currentPage = 0
  }

  const hasMorePages = (): boolean => {
    return currentPage * pageSize < items.length
  }

  return {
    items,
    currentPage,
    pageSize,
    hasMorePages,
    totalItems: items.length,
    nextPage,
    reset,
  }
}
