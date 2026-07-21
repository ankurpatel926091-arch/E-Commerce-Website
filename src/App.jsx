import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Register from "./Pages/Register";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App