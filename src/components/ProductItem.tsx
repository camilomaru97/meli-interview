import React, { useContext } from 'react'
import { forwardRef } from 'react'
import { type Product } from '../types'
import ReactDOM from 'react-dom'
import { Modal } from './Modal'
import { useModal } from '../hooks'
import '../styles/components/product_item.css'
import { formatToCOP } from '../utilities/formatNumber'
import { ProductContext } from '../context'

interface Props {
  items: Product
  isFavoritePage?: boolean
}

export const ProductItem = forwardRef<HTMLDivElement, Props>(({ items, isFavoritePage }, ref) => {

  const { addProductAction, deleteProduct } = useContext(ProductContext)

  const onhandleAdd = (items: Product) => {
    if(isFavoritePage){
      deleteProduct(items)
    }else{
      addProductAction(items)
    }
  }

  const { isModalOpen, handleModalOpen, handleModalClose } = useModal()
  const { 
    id, 
    image, 
    description, 
    title, 
    detail,
    detail: { price }
  } = items

  return (
    <>
      <article 
        ref={ref}
        className="product-item"
        key={id}
      >
        <img 
          src={image} 
          alt={`Imagen de ${title}`} 
          className="product-item__image" 
        />
        <div className="product-item__details">
          <h2 className="product-item__title">
            {title}
          </h2>
          <p className="product-item__description">
            {description}
          </p>
          <p className="product-item_price">
            {formatToCOP(+price)} <span>13% OFF</span> 
          </p>
          <p className='product-item_fee'>
            en <span className="product-item_fee"> 12 coutas de {formatToCOP(+price/12)} con 0% de interés </span>
          </p>
        </div>
        <section style={{ display: 'flex', flexDirection: 'column', gap:'3.5rem' }} >

          <i onClick={() => onhandleAdd(items)} className='bx  bx-like  bx-sm '></i>
          <button 
            onClick={handleModalOpen} 
            className="product-item__button"
          >
          Ver más
          </button>
        </section>
        
      </article>
      {isModalOpen && 
        ReactDOM.createPortal(
          <Modal onClose={handleModalClose} content={detail} />,
          document.body
        )
      }
    </>
  )
})