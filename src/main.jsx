import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SearchProvider } from "./Context/SearchContext";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.js";
import { CartProvider } from "./Context/CartContext.jsx";
import { WishlistProvider } from "./Context/WishlistContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SearchProvider>
        <CartProvider>
          <WishlistProvider>
            <App />

            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable
              theme="colored"
            />
          </WishlistProvider>
        </CartProvider>
      </SearchProvider>
    </Provider>
  </StrictMode>
);