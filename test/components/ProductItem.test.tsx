import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { useModal } from '../../src/hooks/useModal'
import { formatToCOP } from '../../src/utilities'
import { ProductItem } from '../../src/components'
import { productsMock } from '../mocks/productsMock'

jest.mock('../../src/hooks/useModal', () => ({
  useModal: jest.fn(),
}))

jest.mock('../../src/utilities', () => ({
  formatToCOP: jest.fn(),
}))

describe('Pruebas en componente <ProductItem />', () => {
  const mockUseModal = useModal as jest.Mock
  const mockFormatToCOP = formatToCOP as jest.Mock

  beforeEach(() => {
    mockUseModal.mockReturnValue({
      isModalOpen: false,
      handleModalOpen: jest.fn(),
      handleModalClose: jest.fn(),
    })
    mockFormatToCOP.mockImplementation((value) => `COP ${value.toFixed(2)}`)
  })

  test('renderiza los detalles del producto correctamente', () => {
    render(
      <ProductItem 
        ref={null} 
        items={productsMock[0]} 
      />
    )

    expect( productsMock[0] ).toEqual({
      id: expect.any( String ),
      title: expect.any( String ),
      image: expect.any( String ),
      description: expect.any( String ),
      detail: {
        info: expect.any( String ),
        price: expect.any( String ),
        address: expect.any( String )
      }
    })
  })

  test('abre el modal cuando se hace clic en el botón "Ver más"', () => {
    const handleModalOpenMock = jest.fn()
    mockUseModal.mockReturnValue({
      isModalOpen: false,
      handleModalOpen: handleModalOpenMock,
      handleModalClose: jest.fn(),
    })

    render(
      <ProductItem 
        ref={null} 
        items={productsMock[0]} 
      />
    )

    const button = screen.getByText('Ver más')
    fireEvent.click(button)
    expect(handleModalOpenMock).toHaveBeenCalledTimes(1)
  })

  test('no muestra el modal si isModalOpen es falso', () => {
    render(
      <ProductItem 
        ref={null} 
        items={productsMock[0]} 
      />
    )

    expect(screen.queryByText(productsMock[0].detail.price)).not.toBeInTheDocument()
  })

  test('muestra el contenido del modal cuando isModalOpen es verdadero', () => {
    mockUseModal.mockReturnValueOnce({
      isModalOpen: true,
      handleModalOpen: jest.fn(),
      handleModalClose: jest.fn(),
    })
  
    render(
      <ProductItem 
        ref={null} 
        items={productsMock[0]} 
      />
    )
  
    const button = screen.getByText('Ver más')
    fireEvent.click(button)
  
    const modalContent = screen.queryAllByText((content, element) =>
      element && element.textContent ? element.textContent.includes('Detalles del Producto') : false
    )
    
    expect(Array.isArray(modalContent)).toBe(true)
    expect(modalContent[0]).toBeInTheDocument()
  
    expect(screen.getByText(productsMock[0].detail.info)).toBeInTheDocument()
  })

  test('llama a handleModalClose cuando el modal se cierra', () => {
    const mockHandleModalClose = jest.fn()
    

    mockUseModal.mockReturnValue({
      isModalOpen: true,
      handleModalOpen: jest.fn(),
      handleModalClose: mockHandleModalClose,
    })
  
    render(
      <ProductItem 
        ref={null} 
        items={productsMock[0]} 
      />
    )
  
    const button = screen.getByText('Ver más')
    fireEvent.click(button)
    fireEvent.click(screen.getByText('x'))  
    expect(mockHandleModalClose).toHaveBeenCalledTimes(1)
  })
})
