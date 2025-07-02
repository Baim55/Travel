import React, { useState, useEffect } from "react";
import styles from "./BookingForm.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [tickets, setTickets] = useState({ adult: 0, youth: 0, child: 0 });
  const [chosenExtras, setChosenExtras] = useState({
    serviceBooking: false,
    servicePerson: false,
  });
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState("");

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const [disabledDays, setDisabledDays] = useState([]);

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

    // Endirimli qiymət
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
      setError("This time slot is full. Please choose another.");
      return;
    }

    try {
      await axios.post("/api/bookings", {
        tourId,
        userId: user._id,
        date,
        time,
        guestCount: tickets.adult + tickets.youth + tickets.child,
      });
      alert(
        `Rezervasiya uğurla tamamlandı!\nTarix: ${date}\nTotal: $${calculateTotal()}`
      );
    } catch (err) {
      console.error(err);
      setError("Booking zamanı xəta baş verdi.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Book This Tour</h3>

      <label>
        <DatePicker
          selected={date ? new Date(date) : null}
          onChange={(d) => setDate(d.toISOString().split("T")[0])}
          filterDate={(d) => {
            const day = d.getDay();
            return !disabledDays.includes(day);
          }}
          minDate={new Date(Math.max(new Date(availableFrom), new Date()))}
          maxDate={new Date(availableTo)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Tarix seçin"
          className={styles.input}
        />
      </label>

      <fieldset className={styles.timeField}>
        <legend>Time:</legend>
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
              {slot.remaining <= 0 ? "(Full)" : `(${slot.remaining} left)`}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.tickets}>
        <h4>Tickets:</h4>

        {["adult", "youth", "child"].map((type) => (
          <label key={type}>
            {type === "adult" &&
              `Adult (18+) $${(
                basePrice -
                (basePrice * discount) / 100
              ).toFixed(2)}`}
            {type === "youth" &&
              `Youth (13–17) $${(
                youthPrice -
                (youthPrice * discount) / 100
              ).toFixed(2)}`}
            {type === "child" &&
              `Children (0–12) $${(
                childPrice -
                (childPrice * discount) / 100
              ).toFixed(2)}`}
            {discount > 0 && (
              <div className={styles.discountNote}>{discount}% endirim</div>
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
        ))}
      </div>

      <div className={styles.extras}>
        <h4>Add Extra</h4>
        <label>
          <input
            type="checkbox"
            checked={chosenExtras.serviceBooking}
            onChange={() => toggleExtra("serviceBooking")}
          />
          {extras.serviceBooking.label} $
          {extras.serviceBooking.price.toFixed(2)}
        </label>
        <label>
          <input
            type="checkbox"
            checked={chosenExtras.servicePerson}
            onChange={() => toggleExtra("servicePerson")}
          />
          {extras.servicePerson.label} ${extras.servicePerson.price.toFixed(2)}{" "}
          per person
        </label>
      </div>

      <div className={styles.total}>
        <strong>Total:</strong> ${calculateTotal()}
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
        {user ? "Book Now" : "Login to Book"}
      </button>
    </form>
  );
}
