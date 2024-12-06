import { renderHook, act } from '@testing-library/react'
import { useModal } from '../../src/hooks/useModal'

describe('Pruebas del hook useModal', () => {
  
  test('debe estar cerrado por defecto', () => {
    const { result } = renderHook(() => useModal())
    expect(result.current.isModalOpen).toBe(false)
  })

  test('debe abrir el modal cuando se llame handleModalOpen', () => {
    const { result } = renderHook(() => useModal())

    act(() => {
      result.current.handleModalOpen()
    })
    expect(result.current.isModalOpen).toBe(true)
  })

  test('debe cerrar el modal cuando se llame handleModalClose', () => {
    const { result } = renderHook(() => useModal())

    act(() => {
      result.current.handleModalOpen()
    })
    expect(result.current.isModalOpen).toBe(true)
    
    act(() => {
      result.current.handleModalClose()
    })
    expect(result.current.isModalOpen).toBe(false)
  })
})
