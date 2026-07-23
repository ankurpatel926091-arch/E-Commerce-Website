import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useWishlist } from "../Context/WishlistContext";
import WishlistCard from "../Components/WishlistCard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      <div className="wishlist-page">

        {/* Header */}
        <div className="wishlist-header">
          <h1>❤️ My Wishlist</h1>

          <p>
            {wishlist.length}{" "}
            {wishlist.length === 1 ? "Product" : "Products"} Saved
          </p>
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <div className="emptyWishlist">
            <div className="emptyHeart">💔</div>

            <h2>Your Wishlist is Empty</h2>

            <p>
              Save your favourite products and they will appear here.
            </p>

            <button
              className="shopNowBtn"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="wishlist-slider">

            {/* Left Arrow */}
            <button
              className="slider-btn left"
              onClick={scrollLeft}
            >
              <FaChevronLeft />
            </button>

            {/* Products */}
            <div
              className="wishlist-grid"
              ref={scrollRef}
            >
              {wishlist.map((item) => (
                <WishlistCard
                  key={item._id}
                  item={item}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              className="slider-btn right"
              onClick={scrollRight}
            >
              <FaChevronRight />
            </button>

          </div>
        )}

      </div>

      <Footer />
    </>
  );
};

export default Wishlist;