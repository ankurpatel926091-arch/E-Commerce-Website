import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SearchProvider } from "./Context/SearchContext";
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Redux/Store.js'
import { CartProvider } from './Context/CartContext.jsx'
createRoot(document.getElementById('root')).render(
   <StrictMode>
    <Provider store={store}>
      <SearchProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </SearchProvider>
    </Provider>
  </StrictMode>,
)
