import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import styles from "./Wishlist.module.css";
import { addWishlist } from "../../redux/features/wishlistSlice";
import Container from "../../components/container/Container";
import { addBasket } from "../../redux/features/basketSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const handleToggleWishlist = (item) => {
    dispatch(addWishlist(item)); // toggle kimi işləyir
  };

  const handleAddToBasket = (item) => {
    dispatch(addBasket(item));
  };

  return (
    <Container>
      <h2 className={styles.heading}>İstək Siyahısı</h2>

      {wishlist.length === 0 ? (
        <p className={styles.emptyMessage}>İstək siyahısında heç nə yoxdur.</p>
      ) : (
        <div className={styles.grid}>
          {wishlist.map((item) => (
            <div key={item._id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Link to={`/detail/${item._id}`}>
                  <img
                    src={
                      item.image ||
                      (item.images?.[0]
                        ? `http://localhost:5000/${item.images[0]}`
                        : "")
                    }
                    alt={item.name}
                    className={styles.image}
                  />
                </Link>
                <div className={styles.overlay}></div>

                {/* X iconu (sil) */}
                <div
                  className={`${styles.heartIcon} ${styles.active}`}
                  onClick={() => handleToggleWishlist(item)}
                >
                  <FaTimes />
                </div>
              </div>

              <div className={styles.content}>
                <h3 className={styles.title}>{item.name}</h3>
                <div className={styles.location}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>
                    {item.city}, {item.country}
                  </span>
                </div>

                {/* Yeni əlavə olunan meta bölməsi duration və guest sayı ilə */}
                <div className={styles.meta}>
                  <span>
                    <i className="fas fa-calendar-alt"></i> {item.duration}
                  </span>
                  <span>
                    <i className="fas fa-user"></i> {item.maxGuests}
                  </span>
                </div>

                <p className={styles.price}>${item.price}</p>

                {/* Add to Basket düyməsi */}
                <button
                  className={styles.addToBasketBtn}
                  onClick={() => handleAddToBasket(item)}
                >
                  Add to Basket
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Wishlist;
