import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { getProductsApi } from '../services'
import { type Product } from '../types'
import { createPagination, Pagination } from '../utilities'
import { useInfiniteScroll } from './useInfiniteScroll'
import { useDebounce } from './useDebounce'

export const useProducts = () => {
  
  const [pagination, setPagination] = useState<Pagination<Product> | null>(null)
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false)
  const [isPaginating, setIsPaginating] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>('')
  const [filterValue, setFilterValue] = useState('')
  const [items, setItems] = useState<Product[]>([])
  
  const { debounceValue } = useDebounce({value: filterValue, delay: 600})

  useEffect(() => {
    setIsLoading(true)
    getProductsApi()
      .then((items) => {
        const newPaginator = createPagination(items, 10)
        setPagination(newPaginator)
        setItems(newPaginator.nextPage())
      })
      .catch((error) => {
        setError(error?.message)
        setIsErrorVisible(true)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const fetchNextPage = useCallback(() => {
    if (pagination && !isPaginating) {
      setIsPaginating(true)
      setTimeout(() => {
        const nextItems = pagination.nextPage()
        setItems((prev) => [...prev, ...nextItems])
        setIsPaginating(false)
      }, 2000)
    }
  }, [pagination, isPaginating])

  const { lastItemRef } = useInfiniteScroll({
    isLoading,
    isPaginating,
    hasMorePages: pagination?.hasMorePages() ?? false,
    fetchNextPage,
  })

  const filteredProducts = useMemo(() => {
    return debounceValue.length > 1
      ? items.filter(
        (item) =>
          item.title.toLocaleLowerCase().includes(debounceValue.toLocaleLowerCase())
      )
      : items
  }, [debounceValue, items])

  const handleCloseError = () => {
    setIsErrorVisible(false)
    setError(null)
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value)
  }

  return {
    error,
    isLoading,
    filterValue,
    isPaginating,
    isErrorVisible,
    filteredProducts,
    lastItemRef,
    onInputChange,
    handleCloseError
  }
}
