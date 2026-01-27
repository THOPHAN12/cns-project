import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './component/homepage/Homepage'
import ProductPage from './component/product_page/ProductPage'
import ProductDetail from './component/product_page/ProductDetail'
import CollectionPage from './component/collectionpage/CollectionPage'
import WhatsNewPage from './component/whatsnew/WhatsNewPage'
import AboutUsPage from './component/about_us/AboutUsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/product' element={<ProductPage />} />
        <Route path='/product-detail' element={<ProductDetail />} />
        <Route path='/collection' element={<CollectionPage />} />
        <Route path='/whats-new' element={<WhatsNewPage />} />
        <Route path='/about-us' element={<AboutUsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
