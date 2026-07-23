import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Register from "./Pages/Register";
import Wishlist from "./Pages/Wishlist";
const App = () => {
  return (
    <>
       <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
    </>
  )
}

export default App