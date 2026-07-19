import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, fetchProduct } from "../Redux/StoreDataSlice";
import "../App.css";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [customerName,setCustomerName] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [selectedCategory,setSelectedCategory] = useState('')
  const categoryData = useSelector(
    (state) => state.storeData.category
  );

  const api_url = import.meta.env.VITE_API_URL

  const getImageUrl = (image) => {
    if (!image) return 'https://via.placeholder.com/280x220?text=No+Image'

    if (typeof image === 'string') {
      return image.startsWith('http') || image.startsWith('data:')
        ? image
        : `${api_url}${image}`
    }

    const url = image.url || image
    if (!url) return 'https://via.placeholder.com/280x220?text=No+Image'

    return url.startsWith('http') || url.startsWith('data:')
      ? url
      : `${api_url}${url}`
  }

  const productData = useSelector(
    (state) => state.storeData.products
  );


  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(()=>{
    
      if(user){
        setCustomerName(user.name)
      }
      else{
        setCustomerName("Guest User")
      }
    
  },[])

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchProduct());
  }, [dispatch]);


  const filterData = selectedCategory
    ? productData.filter((item) => item.category?._id === selectedCategory)
    : productData


  const {addToCart} = useCart()
  const handleAddToCart = (item) => {
    try {
      addToCart(item)
      // brief visual confirmation
      alert(`${item.productName || 'Item'} added to cart`)
    } catch (err) {
      console.error('Add to cart error:', err)
      alert('Unable to add to cart')
    }
  }

  return (
    <div className="container"> 
      <header className="hero">
        <h1>Welcome {customerName}</h1>
        <h1>🛍️ ONLINE Store</h1>
        <p>Explore Categories & Products</p>
       {user ? (
          <>
            <button className="login-btn" onClick={() => navigate('/cart')}>Go to Cart</button>
            <button className="login-btn" onClick={() => localStorage.clear()}>Logout</button>
          </>
        ) : (
          <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        )}
       
        
      </header>

      {/* Categories */}
      <section className="section">
        <div className="sectionHeader">
          <h2>Categories</h2>
        </div>

        <div className="categoryContainer">
          {categoryData?.map((item) => (
            <div className="categoryCard" key={item._id}>
              
              <img
                src={getImageUrl(item.image)}
                alt={item.categoryName}
                className="categoryImage"
              />
              <h4>
                <button key={item._id} onClick={()=>setSelectedCategory(item._id)}>{item.categoryName}</button>
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <div className="sectionHeader">
          <h2>Products</h2>
        </div>

        <div className="productContainer">
          {filterData?.map((item) => (
            <div className="productCard" key={item._id}>
              <div className="imageWrapper">
                <img
                  src={getImageUrl(item.images?.[0])}
                  alt={item.productName}
                  className="productImage"
                />
              </div>

              <div className="productInfo">
                <h3>{item.productName}</h3>

                <p className="price">
                  ₹{item.price?.toLocaleString()}
                </p>

                <button className="buyBtn" onClick={()=>handleAddToCart(item)}>
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Product;