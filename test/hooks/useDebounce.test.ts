import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../../src/hooks/useDebounce'

describe('Pruebas del hook useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers() 
  })
  
  afterEach(() => {
    jest.useRealTimers() 
  })

  test('debe devolver el valor del debounce después de la demora especificada', () => {
    const { result } = renderHook(() => useDebounce({ value: 'test', delay: 300 }))
    expect(result.current.debounceValue).toBe('')
    
    act(() => {
      jest.advanceTimersByTime(350)
    })

    expect(result.current.debounceValue).toBe('test')
  })
  
  test('debe actualizar debounceValue cuando el valor cambie', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce({ value, delay }),
      { initialProps: { value: 'test', delay: 300 } }
    )
    expect(result.current.debounceValue).toBe('')
    
    act(() => {
      jest.advanceTimersByTime(350)
    })
    expect(result.current.debounceValue).toBe('test')

    rerender({ value: 'new test', delay: 300 })
    act(() => {
      jest.advanceTimersByTime(350)
    })
    expect(result.current.debounceValue).toBe('new test')
  })
  
  test('debe limpiar el temporizador al desmontar el hook', () => {
    const { result, unmount } = renderHook(() => useDebounce({ value: 'test', delay: 300 }))
    expect(result.current.debounceValue).toBe('')
    
    act(() => {
      jest.advanceTimersByTime(350)
    })
    expect(result.current.debounceValue).toBe('test')
    unmount()
  })
})
