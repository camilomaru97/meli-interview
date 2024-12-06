import React from 'react'
import { forwardRef } from 'react'
import { type Product } from '../types'
import ReactDOM from 'react-dom'
import { Modal } from './Modal'
import { useModal } from '../hooks'
import '../styles/components/product_item.css'
import { formatToCOP } from '../utilities/formatNumber'

interface Props {
  items: Product
}

export const ProductItem = forwardRef<HTMLDivElement, Props>(({ items }, ref) => {

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
        <button 
          onClick={handleModalOpen} 
          className="product-item__button"
        >
          Ver más
        </button>
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