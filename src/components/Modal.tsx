import React from 'react'
import { type Detail } from '../types'
import '../styles/components/modal.css'


interface Props {
  onClose: () => void;
  content: Detail;
}

export const Modal = ({ onClose, content }: Props) => {
  const { info, address } = content

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content">
        <header className="modal__header">
          <h2 className="modal__title">Detalles del Producto</h2>
          <button onClick={onClose} className="modal__close-button">
            x
          </button>
        </header>
        <div className="modal__body">
          <p className="modal__info">{info}</p>
          <p className="modal__address"><span>Ubicación producto: </span>{address}</p>
        </div>
      </div>
    </div>
  )
}

