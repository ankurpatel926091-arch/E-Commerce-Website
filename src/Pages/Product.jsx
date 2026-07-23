import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, fetchProduct } from "../Redux/StoreDataSlice";
import "../App.css";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useSearch } from "../Context/SearchContext";
import { toast } from "react-toastify";


const Product = () => {
  const [customerName,setCustomerName] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { search } = useSearch();
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


 const filterData = productData.filter((item) => {

  const matchCategory =
    !selectedCategory ||
    item.category?._id === selectedCategory;

  const matchSearch =
    item.productName
      ?.toLowerCase()
      .includes(search.toLowerCase());

  return matchCategory && matchSearch;

});



  const {addToCart} = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist();
  const handleAddToCart = (item) => {
  try {
    addToCart(item);

    // Success Toast
    toast.success(`${item.productName || "Item"} added to cart`);
  } catch (err) {
    console.error("Add to cart error:", err);

    // Error Toast
    toast.error("Unable to add to cart");
  }
};
const handleWishlist = (item) => {
  const alreadyAdded = isInWishlist(item._id);

  toggleWishlist(item);

  if (alreadyAdded) {
    toast.info(`${item.productName} removed from wishlist`);
  } else {
    toast.success(`${item.productName} added to wishlist ❤️`);
  }
};
return (
  <div className="container">

    {/* Navbar */}
    <Navbar />

    {/* Hero */}
    {/* ================= HERO SECTION ================= */}

<header className="hero">

  <div className="hero-content">

    <span className="hero-tag">
      🛒 India's Trusted Online Shopping Store
    </span>

    <h3 className="welcome-text">
      Welcome, <span>{customerName}</span> 👋
    </h3>

    <h1>
      Discover Amazing
      <br />
      Products at
      <span className="highlight"> Best Prices</span>
    </h1>

    <p>
      Shop from hundreds of quality products with secure
      payment, fast delivery and the best shopping
      experience.
    </p>

    <div className="hero-buttons">

      {user ? (
        <>
          <button
            className="primary-btn"
            onClick={() => navigate("/cart")}
          >
            🛒 Go To Cart
          </button>

          <button
            className="secondary-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          className="primary-btn"
          onClick={() => navigate("/login")}
        >
          Login Now
        </button>
      )}

    </div>

    {/* Stats */}

    <div className="hero-stats">

      <div className="stat-box">
        <h2>500+</h2>
        <p>Products</p>
      </div>

      <div className="stat-box">
        <h2>100+</h2>
        <p>Categories</p>
      </div>

      <div className="stat-box">
        <h2>1000+</h2>
        <p>Happy Customers</p>
      </div>

    </div>

  </div>

</header>

    {/* Categories */}
    {/* ================= CATEGORIES ================= */}

<section className="section" id="categories">

  <div className="sectionHeader">

    <span className="section-subtitle">
      Browse Collection
    </span>

    <h2>Shop By Categories</h2>

    <p>
      Choose your favorite category and discover amazing products.
    </p>

  </div>

  <div className="categoryContainer">

    {categoryData?.map((item) => (

      <div
        className="categoryCard"
        key={item._id}
        onClick={() => setSelectedCategory(item._id)}
      >

        <div className="categoryImageBox">

          <img
            src={getImageUrl(item.image)}
            alt={item.categoryName}
            className="categoryImage"
          />

        </div>

        <div className="categoryContent">

          <h3>{item.categoryName}</h3>

          <p>
            Explore the best collection of {item.categoryName}.
          </p>

          <button className="categoryBtn">
            View Products →
          </button>

        </div>

      </div>

    ))}

  </div>

</section>

    {/* Products */}
    {/* ================= PRODUCTS ================= */}

<section className="section" id="products">

  <div className="sectionHeader">

    <span className="section-subtitle">
      Trending Collection
    </span>

    <h2>Featured Products</h2>

    <p>
      Discover our latest and most popular products at affordable prices.
    </p>

  </div>

  <div className="productContainer">

    {filterData?.map((item) => (

      <div className="productCard" key={item._id}>

        {/* Product Image */}

        <div className="imageWrapper">

  <img
    src={getImageUrl(item.images?.[0])}
    alt={item.productName}
    className="productImage"
  />

  <span className="productBadge">
    New
  </span>

  <button
    className="wishlistBtn"
    onClick={() => handleWishlist(item)}
  >
    {isInWishlist(item._id) ? "❤️" : "🤍"}
  </button>

</div>

        {/* Product Details */}

        <div className="productInfo">

          <span className="productCategory">
            {item.category?.categoryName || "Category"}
          </span>

          <h3>
            {item.productName}
          </h3>

          <div className="rating">

            ⭐⭐⭐⭐⭐

            <span>(5.0)</span>

          </div>

          <p className="price">
            ₹{item.price?.toLocaleString()}
          </p>

          <div className="productButtons">

            <button
              className="buyBtn"
              onClick={() => handleAddToCart(item)}
            >
              🛒 Add To Cart
            </button>

            <button
              className="viewBtn"
              onClick={() => navigate("/cart")}
            >
              View Cart
            </button>

          </div>

        </div>

      </div>

    ))}
     {filterData.length === 0 && (
    <div className="noProducts">
      <h2>😔 No Products Found</h2>
      <p>Try searching with another keyword.</p>
    </div>
  )}

  </div>

</section>
    <Footer />

  </div>
);

};

export default Product;