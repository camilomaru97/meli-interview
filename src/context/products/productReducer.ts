import { Product } from '../../types'

interface ProductState {
  addProduct: Product[]
}

type ProductActions = 
  { type: 'addingProduct', payload: Product } |
  { type: 'deleteProduct', payload: Product }


export const productReducer = (state: ProductState, action: ProductActions) =>  {
  switch (action.type) {
  case 'addingProduct': {
    const validRepeatLikeProduct = state.addProduct.some(product => product.id === action.payload.id)
    const validated =  validRepeatLikeProduct
      ? [...state.addProduct]
      : [...state.addProduct, action.payload]
  
    return {
      ...state,
      addProduct: validated
    }
  }
  case 'deleteProduct': 
    return {
      ...state,
      addProduct: [...state.addProduct.filter(product => product.id !== action.payload.id)]
    }

  default: 
    return state   
  }
}