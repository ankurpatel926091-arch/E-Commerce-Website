import React from "react";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { toast } from "react-toastify";
import "./Wishlist.css";

const WishlistCard = ({ item }) => {
  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();

  const api_url = import.meta.env.VITE_API_URL;

  const getImageUrl = (image) => {
    if (!image)
      return "https://via.placeholder.com/280x220?text=No+Image";

    if (typeof image === "string") {
      return image.startsWith("http") || image.startsWith("data:")
        ? image
        : `${api_url}${image}`;
    }

    const url = image.url || image;

    if (!url)
      return "https://via.placeholder.com/280x220?text=No+Image";

    return url.startsWith("http") || url.startsWith("data:")
      ? url
      : `${api_url}${url}`;
  };

  const handleMoveToCart = () => {
    addToCart(item);
    removeFromWishlist(item._id);
    toast.success(`${item.productName} moved to cart 🛒`);
  };

  const handleRemove = () => {
    removeFromWishlist(item._id);
    toast.info(`${item.productName} removed from wishlist`);
  };

  return (
    <div className="wishlist-card">
      <div className="wishlist-image-box">
        <img
          src={getImageUrl(item.images?.[0])}
          alt={item.productName}
          className="wishlist-image"
        />
      </div>

      <div className="wishlist-content">
        <span className="wishlist-category">
          {item.category?.categoryName || "Category"}
        </span>

        <h3>{item.productName}</h3>

        <p className="wishlist-price">
          ₹{Number(item.price).toLocaleString()}
        </p>

        <div className="wishlist-btns">
          <button
            className="move-cart-btn"
            onClick={handleMoveToCart}
          >
            🛒 Move To Cart
          </button>

          <button
            className="remove-wishlist-btn"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;