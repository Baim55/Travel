// src/components/basket/Basket.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import styles from "./Basket.module.css";
import Container from "../../components/container/Container";
import { removeBasket, updateGuestCount } from "../../redux/features/basketSlice";

export default function Basket() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.basket.items);

  const handleRemove = id => {
    dispatch(removeBasket(id));
  };

  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    dispatch(updateGuestCount({ _id: id, qty }));
  };

  if (items.length === 0) {
    return (
      <Container>
        <h2 className={styles.heading}>Səbət boşdur</h2>
        <p className={styles.emptyMessage}>Səbətinizdə heç bir məhsul yoxdur.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className={styles.heading}>Səbətim</h2>
      <div className={styles.grid}>
        {items.map(item => (
          <div key={item._id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Link to={`/detail/${item._id}`}>
                <img
                  src={
                    item.images?.[0]
                      ? `http://localhost:5000/${item.images[0]}`
                      : item.image || ""
                  }
                  alt={item.name}
                  className={styles.image}
                />
              </Link>
              <div
                className={styles.removeIcon}
                onClick={() => handleRemove(item._id)}
              >
                <FaTimes />
              </div>
            </div>

            <div className={styles.content}>
              <h3 className={styles.title}>{item.name}</h3>
              <div className={styles.location}>
                <i className="fas fa-map-marker-alt" /> {item.city}, {item.country}
              </div>
              <div className={styles.meta}>
                <span><i className="fas fa-calendar-alt" /> {item.duration}</span>
                <span><i className="fas fa-user" /> {item.qty} guest(s)</span>
              </div>
              <p className={styles.price}>${item.price}</p>

              <div className={styles.qtyControls}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => handleQtyChange(item._id, item.qty - 1)}
                >
                  <FaMinus />
                </button>
                <span className={styles.qtyNumber}>{item.qty}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => handleQtyChange(item._id, item.qty + 1)}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
