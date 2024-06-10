import React, { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import { AuthProvider } from './context/AuthContext'
import { CategoryProvider } from './context/CategoryContext'

function App() {
  return (
    <>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
            <Outlet />
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </>
  )
}

export default App
