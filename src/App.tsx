import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductProvider } from './context'
import { ShoppingPage } from './pages'
import { LikePage } from './pages/LikePage'

export const App = () => {
  return (

    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShoppingPage />} />
          <Route path="/cart" element={<LikePage />} />
        </Routes>     
      </BrowserRouter>
    </ProductProvider>
  )
}