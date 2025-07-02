// src/pages/tours/TourDetail.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./TourDetail.module.css";
import Container from "../../components/container/Container";
import ReviewForm from "../../components/reviews/ReviewForm";
import ReviewList from "../../components/reviews/ReviewList";
import BookingForm from "../../components/bookingForm/BookingForm";

import { addBooking } from "../../redux/features/bookingSlice";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function TourDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tours } = useSelector((state) => state.tour);
  const tour = tours.find((t) => t._id === id);
  const user = useSelector((state) => state.user.user);

  const [counts, setCounts] = useState({ adult: 1, youth: 0, child: 0 });
  const [refresh, setRefresh] = useState(false);

  if (!tour) {
    return <p className={styles.notFound}>Tour not found.</p>;
  }

  const availableFrom = new Date(tour.availableDateRange.startDate)
    .toISOString()
    .slice(0, 10);
  const availableTo = new Date(tour.availableDateRange.endDate)
    .toISOString()
    .slice(0, 10);

  const handleReviewSubmit = () => setRefresh((r) => !r);

  const handleAddToBooking = () => {
    const guestCount = counts.adult + counts.youth + counts.child;
    dispatch(
      addBooking({
        _id: tour._id,
        name: tour.name,
        price: tour.price,
        city: tour.city,
        country: tour.country,
        duration: tour.duration,
        maxGuests: tour.maxGuests,
        images: tour.images,
        dateFrom: availableFrom,
        dateTo: availableTo,
        guestCount,
        breakdown: { ...counts },
      })
    );
  };

  return (
    <section className={styles.tourdetail}>
      <Container>
        <div className={styles.detail}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>{tour.name}</h1>
            <div className={styles.location}>
              <i className="fas fa-map-marker-alt" /> {tour.city},{" "}
              {tour.country}
            </div>
          </div>

          {/* Image carousel */}
          <div className={styles.carouselWrapper}>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={2}
              loop
            >
              {tour.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={`http://localhost:5000/${img}`}
                    alt={`${tour.name} ${idx + 1}`}
                    className={styles.carouselImage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Meta grid */}
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <h4>Price</h4>
              <div className={styles.metaValue}>
                From <strong>${tour.price.toLocaleString()}</strong>
              </div>
            </div>
            <div className={styles.metaItem}>
              <h4>Duration</h4>
              <div className={styles.metaValue}>
                <i className="fas fa-clock" /> {tour.duration}
              </div>
            </div>
            <div className={styles.metaItem}>
              <h4>Max Guests</h4>
              <div className={styles.metaValue}>
                <i className="fas fa-user-friends" /> {tour.maxGuests}
              </div>
            </div>
            <div className={styles.metaItem}>
              <h4>Tour Type</h4>
              <div className={styles.metaValue}>
                <i className="fas fa-tags" /> {tour.activity}
              </div>
            </div>
          </div>

          {/* Main content + sidebar */}
          <div className={styles.detailGrid}>
            {/* Left side */}
            <div className={styles.content}>
              <div className={styles.description}>
                <p>{tour.description || "No description available."}</p>
              </div>

              {/* Nearby restaurants & hotels */}
              <div className={styles.near}>
                <div className={styles.nearbyGrid}>
                  {tour.nearby.restaurants.map((r, i) => (
                    <div key={i} className={styles.nearbyCard}>
                      <div className={styles.icon}>
                        <i className="fas fa-utensils" />
                      </div>
                      <div className={styles.info}>
                        <a
                          href={r.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.name}
                        >
                          {r.name}
                        </a>
                        <span className={styles.distance}>{r.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.nearbyGrid}>
                  {tour.nearby.hotels.map((h, i) => (
                    <div key={i} className={styles.nearbyCard}>
                      <div className={styles.icon}>
                        <i className="fas fa-bed" />
                      </div>
                      <div className={styles.info}>
                        <a
                          href={h.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.name}
                        >
                          {h.name}
                        </a>
                        <span className={styles.distance}>{h.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className={styles.mapSection}>
                <h3>Location on Map</h3>
                <div className={styles.mapWrapper}>
                  <iframe
                    width="100%"
                    height="300"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&zoom=14&q=${tour.location.lat},${tour.location.lng}`}
                  />
                </div>
              </div>

              {/* Reviews */}
              <ReviewForm
                tourId={id}
                user={user}
                onReviewSubmit={handleReviewSubmit}
              />
              <ReviewList tourId={id} refreshTrigger={refresh} />
            </div>

            {/* Right sidebar */}
            <aside className={styles.sidebar}>
              <BookingForm
                tourId={tour._id}
                discount={tour.discount}
                basePrice={tour.price}
                youthPrice={tour.price - 10}
                childPrice={0}
                extras={{
                  serviceBooking: {
                    label: "Add Service per booking",
                    price: 30,
                  },
                  servicePerson: {
                    label: "Add Service per person",
                    price: 17,
                  },
                }}
                availableFrom={availableFrom}
                availableTo={availableTo}
                counts={counts}
                setCounts={setCounts}
                handleAddToBooking={handleAddToBooking}
              />
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
