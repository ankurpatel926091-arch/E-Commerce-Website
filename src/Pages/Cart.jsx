import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cart,setCart, increaseQty, removeItem, decreaseQty } = useCart();
  const api_url = import.meta.env.VITE_API_URL
  const Total = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0
  );

  const getImageUrl = (image) => {
    if (!image) return 'https://via.placeholder.com/140x140?text=No+Image'

    if (typeof image === 'string') {
      return image.startsWith('http') || image.startsWith('data:')
        ? image
        : `${api_url}${image}`
    }

    const url = image.url || image
    if (!url) return 'https://via.placeholder.com/140x140?text=No+Image'

    return url.startsWith('http') || url.startsWith('data:')
      ? url
      : `${api_url}${url}`
  }

  const token = localStorage.getItem('token')
  const [address,setAddres] = useState('')
  const navigate = useNavigate()
  const hanldePlceOrder=async()=>{
    console.log("hit");
    
    if(!token){
      alert("Login First")
      navigate('/lofin')
    }else{
      const orderData ={
        items:cart.map((item)=>({
          productId:item._id,
          qty:item.qty,
          price:item.price 
        })),
        totalAmount:Total,
        address,
        paymentType:"COD"
      };

      try {
        const res = await axios.post(`${api_url}/api/order/create-order`,orderData,{
          headers:{
            Authorization:token
          }
        });
        alert(res.data.message)
        setCart([])
      } catch (error) {
        console.log(error);
        
      }




    }
    
    
  }

  return (
    <div className="cart-container">
      {cart.map((item) => (
        <div className="cart-card" key={item._id}>
          <img
            src={getImageUrl(item.images?.[0])}
            alt={item.productName}
            className="cart-image"
          />

          <div className="cart-details">
            <h3 className="cart-title">{item.productName}</h3>
            <p>Price: ₹{Number(item.price)}</p>
            <p>Qty: {item.qty}</p>

            <div className="cart-quantity-box">
              <button
                className="cart-btn"
                onClick={() => decreaseQty(item._id)}
              >
                -
              </button>

              <button
                className="cart-btn"
                onClick={() => increaseQty(item._id)}
              >
                +
              </button>
            </div>

            <button
              className="cart-remove-btn"
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h1>Total :- ₹{Total}</h1>

      <input type="Address" className="address" onChange={(e)=>setAddres(e.target.value)}/>
      <button onClick={hanldePlceOrder} className="place-order">Place Order</button>
    </div>
  );
};

export default Cart;