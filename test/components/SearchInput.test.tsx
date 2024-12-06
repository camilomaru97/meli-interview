import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchInput } from '../../src/components/SearchInput'

describe('Pruebas en componente <SearchInput />', () => {
  test('debe renderizarse correctamente con las props', () => {
    const mockOnChange = jest.fn()
    const placeholderText = 'Buscar productos, marcas y más...'
    const inputValue = 'Laptop'

    render(
      <SearchInput 
        value={inputValue}
        onChange={mockOnChange}
        placeholder={placeholderText}
      />
    )

    const inputElement = screen.getByRole('textbox') as HTMLInputElement
    expect(inputElement).toHaveValue(inputValue)
    expect(inputElement).toHaveAttribute('placeholder', placeholderText)
  })

  test('debería llamar a onChange cuando el valor del input cambie', () => {
    let inputValue = 'Laptop' 
  
    const mockOnChange = jest.fn((e) => {
      inputValue = e.target.value
    })
  
    render(
      <SearchInput
        value={inputValue}
        onChange={mockOnChange}
        placeholder="Buscar productos..."
      />
    )
  
    const inputElement = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.change(inputElement, { target: { value: 'Smartphone' } })
  
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(inputValue).toBe('Smartphone')
  })
  
})
