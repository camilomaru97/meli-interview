import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { productsMock } from '../mocks/productsMock'
import { ShoppingPage } from '../../src/pages/ShoppingPage'
import { useProducts } from '../../src/hooks/useProducts'
import { mockUseProducts } from '../mocks/useProductMock'
import { ProductsList } from '../../src/components'

jest.mock('../../src/services/products-service', () => ({
  getProductsApi: jest.fn(),
}))

jest.mock('../../src/hooks/useProducts', () => ({
  useProducts: jest.fn()
}))

jest.mock('../../src/hooks/useDebounce', () => ({
  useDebounce: jest.fn()
}))

describe('ShoppingPage Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('muestra el loader al inciar el componente', () => {
    (useProducts as jest.Mock).mockReturnValue(
      mockUseProducts({
        isLoading: true,
      })
    )
  
    render(<ShoppingPage />)
  
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  test('si existe un error, muestra mensaje de error', () => {
    (useProducts as jest.Mock).mockReturnValue(
      mockUseProducts({
        error: 'Hubo un error, por favor intenta de nuevo',
        isErrorVisible: true
      })
    )
  
    render(<ShoppingPage />)
    const errorMessage = screen.getByText('Hubo un error, por favor intenta de nuevo')
    expect(errorMessage).toBeInTheDocument()

  })

  test('muestra los productos cuando hay items', async () => {
    (useProducts as jest.Mock).mockReturnValue(
      mockUseProducts({
        filteredProducts: productsMock,
        isLoading: false,
      })
    )

    render(<ShoppingPage />)
    
    for (const product of productsMock) {
      const productElement = await screen.findByText(product.title)
      expect(productElement).toBeInTheDocument()
    }
  })

  test('muestra mensaje cuando no hay items para mostrar', async () => {  
    (useProducts as jest.Mock).mockReturnValue(
      mockUseProducts({
        filteredProducts:  [],
        isLoading: false,
      })
    )

    render(<ShoppingPage />)

    const emptyMessage = screen.queryByText('No hay productos...')
    expect(emptyMessage).toBeInTheDocument()
   
  })

  test('debe de mostrar mensaje de cargar mas productos cuando llegue al final de 10 items', async () => {
    const mockFilteredProducts = productsMock.slice(0, 10);
    (useProducts as jest.Mock).mockReturnValue(
      mockUseProducts({
        filteredProducts: mockFilteredProducts,
        isPaginating: true,
        isLoading: false,
        lastItemRef: jest.fn(),
        filterValue: '',
        onInputChange: jest.fn(),
        isErrorVisible: false,
        handleCloseError: jest.fn(),
        error: null
      })
    )
  
    render(<ProductsList items={mockFilteredProducts} lastProductDivElement={jest.fn()} isPaginating={true} />)
  
    const loadingMessage = screen.getByText(/Cargando mas productos.../)
    expect(loadingMessage).toBeInTheDocument()
  })
  

  test('debe de filtrar los productos', async () => { 
  
    (useProducts as jest.Mock).mockReturnValue({
      filteredProducts: productsMock.filter((product) =>
        product.title.toLowerCase().includes('PS5')
      ),
      isPaginating: false,
      isLoading: false,
      filterValue: 'PS5',
      lastItemRef: jest.fn(),
      onInputChange: jest.fn(),
      isErrorVisible: false,
      handleCloseError: jest.fn(),
      error: null,
    })
  
    render(<ShoppingPage />)
  
    await waitFor(() => {
      productsMock.forEach((product) => {
        const productElement = screen.queryByText(product.title)
        if (product.title.toLowerCase().includes('PS5')) {
          expect(productElement).toBeInTheDocument() 
        } else {
          expect(productElement).not.toBeInTheDocument() 
        }
      })
    })
  })
})
