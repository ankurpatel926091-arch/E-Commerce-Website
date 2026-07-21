import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";

const Cart = () => {

  const { cart, setCart, increaseQty, decreaseQty, removeItem } = useCart();

  const api_url = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [address, setAddress] = useState("");

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0
  );

  const deliveryCharge = subtotal > 0 ? 0 : 0;

  const discount = 0;

  const grandTotal = subtotal + deliveryCharge - discount;

  const getImageUrl = (image) => {

    if (!image)
      return "https://via.placeholder.com/150x150?text=No+Image";

    if (typeof image === "string") {
      return image.startsWith("http") || image.startsWith("data:")
        ? image
        : `${api_url}${image}`;
    }

    const url = image.url || image;

    if (!url)
      return "https://via.placeholder.com/150x150?text=No+Image";

    return url.startsWith("http") || url.startsWith("data:")
      ? url
      : `${api_url}${url}`;
  };

  const handlePlaceOrder = async () => {

    if (!token) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    const orderData = {

      items: cart.map((item) => ({
        productId: item._id,
        qty: item.qty,
        price: item.price,
      })),

      totalAmount: grandTotal,

      address,

      paymentType: "COD",

    };

    try {

      const res = await axios.post(
        `${api_url}/api/order/create-order`,
        orderData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert(res.data.message);

      setCart([]);

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  };

  return (

      <div className="cartPage">

    <div className="cartHeader">

      <p className="breadcrumb">
        Home <span>›</span> Cart
      </p>

      <h1 className="cartHeading">
        Shopping Cart
      </h1>

      <p className="cartSubHeading">
        Review your items before placing your order.
      </p>

    </div>

    <div className="cartWrapper">
                {/* =======================
            CART ITEMS
        ======================= */}

        <div className="cartLeft">

          {cart.length === 0 ? (

            <div className="emptyCart">

              <div className="emptyIcon">🛒</div>

              <h2>Your Cart is Empty</h2>

              <p>
                Looks like you haven't added anything yet.
              </p>

              <button
                className="continueShopping"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>

            </div>

          ) : (

            cart.map((item) => (

              <div className="cartCard" key={item._id}>

                <div className="cartImageBox">

                  <img
                    src={getImageUrl(item.images?.[0])}
                    alt={item.productName}
                    className="cartImage"
                  />

                </div>

                <div className="cartDetails">

                  <span className="cartCategory">
                    {item.category?.categoryName || "Category"}
                  </span>

                  <h3>
                    {item.productName}
                  </h3>

                  <p className="cartPrice">
                    ₹{Number(item.price).toLocaleString()}
                  </p>

                  <div className="quantityBox">

                    <button
                      onClick={() => decreaseQty(item._id)}
                    >
                      −
                    </button>

                    <span>
                      {item.qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item._id)}
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="cartRight">

                  <p className="itemTotal">
                    ₹{(Number(item.price) * item.qty).toLocaleString()}
                  </p>

                  <button
                    className="removeBtn"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))

          )}

        </div>
                {/* =======================
            ORDER SUMMARY
        ======================= */}

        <div className="cartSummary">

          <h2>Order Summary</h2>

          <div className="summaryRow">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="summaryRow">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="summaryRow">
            <span>Delivery</span>
            <span className="freeText">
              {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
            </span>
          </div>

          <div className="summaryRow">
            <span>Discount</span>
            <span>₹{discount}</span>
          </div>

          <hr />

          <div className="summaryTotal">
            <span>Grand Total</span>
            <span>₹{grandTotal.toLocaleString()}</span>
          </div>

          <div className="addressSection">

            <label>Delivery Address</label>

            <textarea
              className="addressInput"
              placeholder="Enter your complete delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

          </div>

          <button
            className="placeOrderBtn"
            onClick={handlePlaceOrder}
            disabled={cart.length === 0}
          >
            Place Order
          </button>

        </div>

      </div>

    </div>

  );

};

export default Cart;