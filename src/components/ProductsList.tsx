import React from 'react'
import { memo } from 'react'
import { type Product } from '../types'
import { ProductItem } from './ProductItem'
import '../styles/components/product_list.css'

interface Props {
  items: Product[]
  lastProductDivElement: React.Ref<HTMLDivElement>
  isPaginating: boolean
}

export const ProductsList = memo(({ items, lastProductDivElement, isPaginating }: Props) => {
  const shouldShowPaginationMessage = items.length >= 10 && isPaginating

  return (
    <section className="products-list">
      { items.length > 0
        ? items.map((item, i) => {
          return (
            <div className="products-list__item-wrapper" key={item.id}>
              <ProductItem
                ref={items.length === i + 1 ? lastProductDivElement : null}
                items={item}
              />
            </div>
          )
        })
        : <p className="products-list__empty-message">No hay productos...</p>
      }
      {shouldShowPaginationMessage && 
        <section className="products-list__pagination-message">
          Cargando mas productos...
        </section>}
    </section>
  )

})