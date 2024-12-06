import React, { memo, useEffect } from 'react'
import '../styles/components/error_message.css'

interface Props {
	message: string
	isVisible: boolean
	onClose: () => void
	duration?: number
}

export const ErrorMessage = memo(({ message, isVisible, onClose, duration }: Props) => {
  useEffect(() => {
    if(isVisible && duration){
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  },[isVisible, duration, onClose])

  return isVisible ? (
    <section
      className="error-message"
    >
      <div className={`error-message__content ${isVisible ? 'error-message__visible' : ''}`}>
        <p className="error-message__text">{message}</p>
        <button 
          className="error-message__close-button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  ) : null 
})