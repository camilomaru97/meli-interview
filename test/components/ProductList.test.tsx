 
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { productsMock } from '../mocks/productsMock'
import { useProducts } from '../../src/hooks/useProducts'
import { ProductsList } from '../../src/components/ProductsList'
import { mockUseProducts } from '../mocks/useProductMock'

jest.mock('../../src/hooks/useProducts', () => ({
  useProducts: jest.fn(),
}))

describe('Pruebas en componente <ProductsList />', () => {
  test('muestra productos cuando hay items', () => {
    (useProducts as jest.Mock).mockReturnValue(
      mockUseProducts({
        filteredProducts: productsMock,
        isPaginating: false,
      })
    )

    render(
      <ProductsList 
        items={productsMock} 
        lastProductDivElement={jest.fn()} 
        isPaginating={false} 
      />
    )

    productsMock.forEach(product => {
      const matchingProducts = screen.getAllByText(product.title)
      expect(matchingProducts.length).toBeGreaterThan(0)
    })
  })

  test('muestra mensaje de "No hay productos..." cuando no hay productos', () => {
    (useProducts as jest.Mock).mockReturnValue(
      mockUseProducts({
        filteredProducts: [],
        isPaginating: false,
      })
    )

    render(
      <ProductsList 
        items={[]} 
        lastProductDivElement={jest.fn()} 
        isPaginating={false} 
      />
    )
    expect(screen.getByText('No hay productos...')).toBeInTheDocument()
  })

  test('muestra el mensaje de "Cargando más productos..." cuando está paginando', () => {
    (useProducts as jest.Mock).mockReturnValue(
      mockUseProducts({
        filteredProducts: productsMock,
        isPaginating: true,
      })
    )

    render(
      <ProductsList 
        items={productsMock} 
        lastProductDivElement={jest.fn()} 
        isPaginating={true} 
      />
    )
    expect(screen.getByText('Cargando mas productos...')).toBeInTheDocument()
  })
})