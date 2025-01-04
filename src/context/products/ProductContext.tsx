import { createContext } from 'react'
import { Product } from '../../types'

interface ProductContextProps {
  addProduct: Product[]  
  addProductAction: (items: Product) => void
  deleteProduct: (items: Product) => void
}

export const ProductContext = createContext<ProductContextProps>({} as ProductContextProps)