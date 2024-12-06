import React from 'react'
import ReactDOM from 'react-dom'
import '../styles/components/loader.css'

export const Loader = () => {
  return ReactDOM.createPortal(
    <section className='loader' data-testid="loader">
      <div className='loader__spinner'></div>
    </section>,
    document.body
  )
}
