import React, { useState, useEffect } from "react";
import styles from "./BookingForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addBooking } from "../../redux/features/bookingSlice";
import { useTranslation } from "react-i18next";
import { loadStripe } from "@stripe/stripe-js";

export default function BookingForm({
  basePrice,
  youthPrice,
  childPrice,
  extras,
  availableFrom,
  availableTo,
  tourId,
  discount = 0,
}) {
  const { t } = useTranslation();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [tickets, setTickets] = useState({ adult: 0, youth: 0, child: 0 });
  const [chosenExtras, setChosenExtras] = useState({
    serviceBooking: false,
    servicePerson: false,
  });
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [disabledDays, setDisabledDays] = useState([]);
  const stripePromise = loadStripe(
    "pk_test_51Rh3h3HDv8wA16hg12jogLpQ6nQZqqWNXLa2XN7Ujxjjy4jJOVuhPR6kWHExKe801SI1SuWe9AODADXftBJ3sIgZ00aXZJY5zP"
  );
  useEffect(() => {
    if (date) {
      axios
        .get(`/api/tours/${tourId}/slots`, { params: { date } })
        .then((res) => setSlots(res.data))
        .catch((err) => console.error("Time slots alınmadı:", err));
    }
  }, [date, tourId]);

  useEffect(() => {
    axios
      .get(`/api/tours/${tourId}`)
      .then((res) => {
        const tour = res.data;
        if (tour.disabledDays) {
          const dayMap = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
          };
          const mapped = tour.disabledDays.map((day) => dayMap[day]);
          setDisabledDays(mapped);
        }
      })
      .catch((err) => console.error("Tur məlumatı alınmadı:", err));
  }, [tourId]);

  const handleTicketsChange = (type, value) => {
    setTickets((prev) => ({ ...prev, [type]: +value }));
  };

  const toggleExtra = (key) => {
    setChosenExtras((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateTotal = () => {
    const { adult, youth, child } = tickets;
    const effectiveBase = basePrice - (basePrice * discount) / 100;
    const effectiveYouth = youthPrice - (youthPrice * discount) / 100;
    const effectiveChild = childPrice - (childPrice * discount) / 100;

    let total =
      adult * effectiveBase + youth * effectiveYouth + child * effectiveChild;

    if (chosenExtras.serviceBooking) total += extras.serviceBooking.price;
    if (chosenExtras.servicePerson) {
      total += extras.servicePerson.price * (adult + youth + child);
    }

    return total.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const selectedSlot = slots.find((s) => s.time === time);
    if (!selectedSlot || selectedSlot.remaining <= 0) {
      setError(t("booking.timeSlotFull"));
      return;
    }

    const guestCount = tickets.adult + tickets.youth + tickets.child;
    if (guestCount === 0) {
      toast.error(t("booking.noGuest"));
      return;
    }

    const stripe = await stripePromise;

    try {
      const total = calculateTotal();
      const res = await axios.post(
        "http://localhost:5000/api/payments/create-checkout-session",
        {
          totalAmount: total,
          metadata: {
            tourId,
            userId: user._id,
            date,
            time,
            guestCount,
          },
        }
      );

      await stripe.redirectToCheckout({
        sessionId: res.data.id,
      });
    } catch (err) {
      console.error("Ödəniş səhvi:", err);
      setError(t("booking.paymentError"));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>{t("booking.title")}</h3>

      <label>
        <DatePicker
          selected={date ? new Date(date) : null}
          onChange={(d) => {
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            setDate(`${year}-${month}-${day}`);
          }}
          filterDate={(d) => !disabledDays.includes(d.getDay())}
          minDate={new Date(Math.max(new Date(availableFrom), new Date()))}
          maxDate={new Date(availableTo)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select date"
          className={styles.input}
        />
      </label>

      <fieldset className={styles.timeField}>
        <legend>{t("booking.time")}</legend>
        <div className={styles.time}>
          {slots.map((slot) => (
            <label key={slot.time}>
              <input
                type="radio"
                name="time"
                value={slot.time}
                checked={time === slot.time}
                onChange={(e) => setTime(e.target.value)}
                disabled={slot.remaining <= 0}
              />
              {slot.time}{" "}
              {slot.remaining <= 0
                ? t("booking.full")
                : `(${slot.remaining} ${t("booking.left")})`}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.tickets}>
        <h4>{t("booking.tickets")}</h4>

        {["adult", "youth", "child"].map((type) => {
          let price = 0;
          if (type === "adult") {
            price = basePrice - (basePrice * discount) / 100;
          } else if (type === "youth") {
            price = youthPrice - (youthPrice * discount) / 100;
          } else if (type === "child") {
            price = childPrice - (childPrice * discount) / 100;
          }

          return (
            <label key={type}>
              {t(`booking.${type}Price`, { price: price.toFixed(2) })}
              {discount > 0 && (
                <div className={styles.discountNote}>
                  {t("booking.discount", { discount })}
                </div>
              )}
              <div className={styles.select}>
                <select
                  value={tickets[type]}
                  onChange={(e) => handleTicketsChange(type, e.target.value)}
                >
                  {[...Array(10).keys()].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          );
        })}
      </div>

      <div className={styles.extrasBox}>
        <details>
          <summary className={styles.extrasTitle}>
            <span>➕ {t("booking.addExtra")}</span>
          </summary>

          <div className={styles.extrasOptions}>
            {/* Service Booking Extra */}
            <label>
              <input
                type="checkbox"
                checked={chosenExtras.serviceBooking}
                onChange={() => toggleExtra("serviceBooking")}
              />
              🧳 {extras.serviceBooking.label} – $
              {extras.serviceBooking.price.toFixed(2)}
              <div className={styles.extraNote}>
                {t("booking.extraLuggageDescription")}
              </div>
            </label>

            {/* Service Per Person Extra */}
            <label>
              <input
                type="checkbox"
                checked={chosenExtras.servicePerson}
                onChange={() => toggleExtra("servicePerson")}
              />
              👤 {extras.servicePerson.label} – $
              {extras.servicePerson.price.toFixed(2)} {t("booking.perPerson")}
              <div className={styles.extraNote}>
                {t("booking.personalServiceDescription")}
              </div>
            </label>
          </div>
        </details>
      </div>

      <div className={styles.total}>
        <strong>{t("booking.total")}</strong> ${calculateTotal()}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <button
        type="submit"
        className={styles.button}
        disabled={!user}
        onClick={() => {
          if (!user) navigate("/login");
        }}
      >
        {user ? t("booking.bookNow") : t("booking.loginToBook")}
      </button>
    </form>
  );
}
