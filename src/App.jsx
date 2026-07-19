import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App