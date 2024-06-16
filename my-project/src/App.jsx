import React, { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import { AuthProvider } from './context/AuthContext'
import { CategoryProvider } from './context/CategoryContext'
import { SearchProvider } from './context/SearchContext'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <>
      <AuthProvider>
        <SearchProvider>
          <CategoryProvider>
            <ProductProvider>
              <CartProvider>
                <Outlet />
              </CartProvider>
            </ProductProvider>
          </CategoryProvider>
        </SearchProvider>
      </AuthProvider>
    </>
  )
}

export default App
