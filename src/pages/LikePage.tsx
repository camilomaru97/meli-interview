import { useContext } from 'react'
import { ProductContext } from '../context'
import { ProductItem } from '../components'

export const LikePage = () => {

  const {addProduct} = useContext(ProductContext)
  return (
    <>
      {
        addProduct.map(product => (
          <ProductItem  
            items={product}
            isFavoritePage={true}
          />
        ))
      }
    </>
  )
}