import { renderHook, act } from '@testing-library/react'
import { useInfiniteScroll } from '../../src/hooks/useInfiniteScroll'

interface SetUpFetch {
  isLoading: boolean
  isPaginating: boolean
  hasMorePages: boolean
}

global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn(() => []),
  root: null,
  rootMargin: '',
  thresholds: [],
})) as unknown as jest.Mock

const setup = ({ isLoading, isPaginating, hasMorePages }: SetUpFetch) => {
  const fetchNextPage = jest.fn()
  const { result } = renderHook(() =>
    useInfiniteScroll({
      isLoading,
      isPaginating,
      hasMorePages,
      fetchNextPage
    })
  )
  return { result, fetchNextPage }
}

describe('Pruebas del hook useInfiniteScroll', () => {
  test('no debe llamar a fetchNextPage si está cargando', () => {
    const { result, fetchNextPage } = setup({ isLoading: true, isPaginating: false, hasMorePages: true })

    const dummyElement = document.createElement('div')
    act(() => {
      result.current.lastItemRef(dummyElement)
    })

    expect(fetchNextPage).not.toHaveBeenCalled()
  })

  test('no debe llamar a fetchNextPage si está paginando', () => {
    const { result, fetchNextPage } = setup({ isLoading: false, isPaginating: true, hasMorePages: true })

    const dummyElement = document.createElement('div')
    act(() => {
      result.current.lastItemRef(dummyElement)
    })

    expect(fetchNextPage).not.toHaveBeenCalled()
  })

  test('no debe llamar a fetchNextPage si no hay más páginas', () => {
    const { result, fetchNextPage } = setup({ isLoading: false, isPaginating: false, hasMorePages: false })

    const dummyElement = document.createElement('div')
    act(() => {
      result.current.lastItemRef(dummyElement)
    })

    expect(fetchNextPage).not.toHaveBeenCalled()
  })

  test('debe llamar a fetchNextPage cuando el elemento es visible y las condiciones son correctas', () => {
    const { result, fetchNextPage } = setup({ isLoading: false, isPaginating: false, hasMorePages: true })

    const dummyElement = document.createElement('div')
    act(() => {
      result.current.lastItemRef(dummyElement)
    })

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        fetchNextPage()
      }
    }

    act(() => {
      observerCallback([{ isIntersecting: true }])
    })

    expect(fetchNextPage).toHaveBeenCalled()
  })
})
