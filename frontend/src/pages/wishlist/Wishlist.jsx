import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import styles from "./Wishlist.module.css";
import {
  setWishlist,
  removeWishlist,
} from "../../redux/features/wishlistSlice";
import Container from "../../components/container/Container";
import axios from "axios";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/pageHeader/PageHeader";
import { Helmet } from "react-helmet";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/wishlist?userId=${user._id}`)
        .then((res) => dispatch(setWishlist(res.data)))
        .catch((err) => console.error("Fetch wishlist error:", err));
    }
  }, [user]);

  const handleRemove = async (tourId) => {
    try {
      await axios.post("http://localhost:5000/api/wishlist/toggle", {
        tourId,
        userId: user._id,
      });
      dispatch(removeWishlist(tourId));
    } catch (err) {
      console.error("Remove from wishlist error:", err);
    }
  };

  return (
    <>
     <Helmet>
            <title> Wishlist | NeoTravel</title>
          </Helmet>
      <PageHeader title={t("wishlist.title")} />
      <section className={styles.wishlist}>
        <Container>
          {wishlist.length === 0 ? (
            <p className={styles.emptyMessage}>{t("wishlist.empty")}</p>
          ) : (
            <div className={styles.grid}>
              {wishlist.map((item) => (
                <div
                  key={item._id}
                  className={styles.card}
                  onClick={() => navigate(`/detail/${item._id}`)}
                >
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
                    <div
                      className={`${styles.heartIcon} ${styles.active}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item._id);
                      }}
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
                    <div className={styles.meta}>
                      <span>
                        <i className="fas fa-calendar-alt"></i> {item.duration}
                      </span>
                      <span>
                        <i className="fas fa-user"></i> {item.maxGuests}
                      </span>
                    </div>
                    <p className={styles.price}>${item.price}</p>
                    <button className={styles.reserve}>
                      {t("wishlist.reserve")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default Wishlist;
