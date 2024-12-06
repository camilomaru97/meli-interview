import React from 'react'
import { ProductsList, SearchInput, ErrorMessage, Loader } from '../components'
import { useProducts } from '../hooks'


export const ShoppingPage = () => {

  const { 
    filteredProducts, 
    error, 
    isLoading, 
    isPaginating,
    filterValue,
    lastItemRef,  
    onInputChange,
    isErrorVisible,
    handleCloseError  
  } = useProducts()

  if (isLoading) return <Loader />

  return (
    <main>
      <SearchInput
        value={filterValue}
        onChange={onInputChange}
        placeholder="Buscar productos, marcas y más..."
      />
      <ProductsList
        lastProductDivElement={lastItemRef}
        items={filteredProducts} 
        isPaginating={isPaginating}
      />
      <ErrorMessage
        message={error ?? ''}
        isVisible={isErrorVisible}
        onClose={handleCloseError}
        duration={5000}
      />
    </main>
  )
}