import { useCallback, useRef } from 'react'

interface UseInfiniteScrollProps {
  isLoading: boolean
  isPaginating: boolean
  hasMorePages: boolean
  fetchNextPage: () => void
}

export const useInfiniteScroll = ({
  isLoading,
  isPaginating,
  hasMorePages,
  fetchNextPage,
}: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null)

  const lastItemRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (isLoading || isPaginating || !hasMorePages) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('Revisando funcioanlidad observer')
          fetchNextPage()
        }
      })

      if (element) observer.current.observe(element)
    },
    [isLoading, isPaginating, hasMorePages, fetchNextPage]
  )

  return { lastItemRef }
}
