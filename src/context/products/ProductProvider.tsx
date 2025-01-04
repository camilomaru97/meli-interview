import { useReducer } from 'react'
import { productReducer } from './productReducer'
import { ProductContext } from './ProductContext'
import { Product } from '../../types'


const INITIAL_VALUES = {
  addProduct: []
}

interface ProviderProps {
  children: JSX.Element | JSX.Element[]
}

export const ProductProvider = ({ children }: ProviderProps) => {

  const [state, dispatch] = useReducer(productReducer, INITIAL_VALUES)

  const addProductAction = (item: Product):void => {
    dispatch({ type: 'addingProduct', payload: item })
  }

  const deleteProduct = (item: Product) => {
    dispatch({ type: 'deleteProduct', payload: item })
  }
  
  return(
    <ProductContext.Provider value={{
      ...state,
      addProductAction,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  )
}