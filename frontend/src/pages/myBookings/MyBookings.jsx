import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyBookings.module.css";
import { useSelector } from "react-redux";
import Container from "../../components/container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useDispatch } from "react-redux";
import { addBooking, removeBooking } from "../../redux/features/bookingSlice";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/pageHeader/PageHeader";
import { Helmet } from "react-helmet";

export default function MyBookings() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.user);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete this reservation?")) {
      try {
        await axios.delete(`/api/bookings/${id}`);
        setBookings((prev) => prev.filter((b) => b._id !== id));
        dispatch(removeBooking(id));
      } catch (err) {
        console.error("Silinmə zamanı xəta:", err);
        toast.error(t("reserve.deleteError"));
      }
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      axios
        .get(`/api/bookings/user?userId=${user._id}`)
        .then((res) => {
          setBookings(res.data);
          res.data.forEach((booking) => dispatch(addBooking(booking))); // 🔥 Redux-a yaz
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user, dispatch]);

  if (!user) return <p className={styles.msg}>Zəhmət olmasa daxil olun.</p>;
  if (loading) return <p className={styles.msg}>Yüklənir...</p>;
  if (bookings.length === 0)
    return <p className={styles.msg}>You haven't made a reservation yet.</p>;

  return (
    <div>
       <Helmet>
              <title> My Bookings | NeoTravel</title>
            </Helmet>
      <PageHeader title={t("reserve.title")}/>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.list}>
            {bookings.map((b) => (
              <div key={b._id} className={styles.card}>
                <Swiper
                  modules={[Navigation]}
                  navigation
                  spaceBetween={10}
                  slidesPerView={1}
                  className={styles.slider}
                >
                  {b.tour?.images?.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={`http://localhost:5000/${img}`}
                        alt={`${b.tour?.name} şəkil ${i + 1}`}
                        className={styles.image}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <h4>{b.tour?.name}</h4>
                <p>
                  <strong>Date:</strong> {new Date(b.date).toLocaleDateString()}{" "}
                  <br />
                  <strong>Time:</strong> {b.time} <br />
                  <strong>Guests:</strong> {b.guestCount}
                </p>
                <button
                  onClick={() => handleDelete(b._id)}
                  className={styles.deleteBtn}
                >
                  {t("reserve.remove")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
