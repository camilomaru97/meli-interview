import { renderHook, act } from '@testing-library/react'
import { useProducts } from '../../src/hooks/useProducts'
import { getProductsApi } from '../../src/services'
import { productsMock } from '../mocks/productsMock'

jest.mock('../../src/services', () => ({
  getProductsApi: jest.fn()
}))

describe('Pruebas del hook useProducts', () => {
  beforeEach(() => {
    (getProductsApi as jest.Mock).mockResolvedValue(productsMock)
  })
  test('debe manejar el cambio del valor para el filtrar', () => {
    const { result } = renderHook(() => useProducts())
  
    const inputEvent = {
      target: { value: 'Product 1' }
    } as React.ChangeEvent<HTMLInputElement>
  
    act(() => {
      result.current.onInputChange(inputEvent)
    })
  
    expect(result.current.filterValue).toBe('Product 1')
  })
})







  
