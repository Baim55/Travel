import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./BookingForm.module.css";

export default function BookingForm({
  basePrice,
  youthPrice,
  childPrice,
  extras,
  availableFrom, // "YYYY-MM-DD"
  availableTo, // "YYYY-MM-DD"
  tourId, // Turun ID-si
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [tickets, setTickets] = useState({
    adult: 0,
    youth: 0,
    child: 0,
  });
  const [chosenExtras, setChosenExtras] = useState({
    serviceBooking: false,
    servicePerson: false,
  });
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState("");

  // Tarix seçildikdə slotları yükləyirik
  useEffect(() => {
    if (date) {
      axios
        .get(`/api/tours/${tourId}/slots`, { params: { date } })
        .then((res) =>{console.log("Slots", res.data); setSlots(res.data)})
        .catch((err) => console.error(err));
    }
  }, [date, tourId]);

  const handleTicketsChange = (type, value) => {
    setTickets((prev) => ({ ...prev, [type]: +value }));
  };

  const toggleExtra = (key) => {
    setChosenExtras((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateTotal = () => {
    const { adult, youth, child } = tickets;
    let total = adult * basePrice + youth * youthPrice + child * childPrice;
    if (chosenExtras.serviceBooking) total += extras.serviceBooking.price;
    if (chosenExtras.servicePerson) {
      total += extras.servicePerson.price * (adult + youth + child);
    }
    return total.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedSlot = slots.find((s) => s.time === time);
    if (!selectedSlot || selectedSlot.remaining <= 0) {
      setError("This time slot is full. Please choose another.");
      return;
    }

    // Backend-ə rezervasiya göndəririk
    try {
      await axios.post("/api/bookings", {
        tourId,
        date,
        time,
        guestCount: tickets.adult + tickets.youth + tickets.child,
      });
      alert(`Rezervasiya tarixi: ${date}\nTotal: $${calculateTotal()}`);
    } catch (err) {
      console.error(err);
      setError("There was an error with your booking.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Book This Tour</h3>

      <label>
        From:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={availableFrom}
          max={availableTo}
          required
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
              {slot.time} {slot.remaining <= 0 ? "(Full)" : `(${slot.remaining} left)`}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.tickets}>
        <h4>Tickets:</h4>
        <label>
          Adult (18+ years) ${basePrice.toFixed(2)}
          <select
            value={tickets.adult}
            onChange={(e) => handleTicketsChange("adult", e.target.value)}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <label>
          Youth (13–17) ${youthPrice.toFixed(2)}
          <select
            value={tickets.youth}
            onChange={(e) => handleTicketsChange("youth", e.target.value)}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <label>
          Children (0–12) ${childPrice.toFixed(2)}
          <select
            value={tickets.child}
            onChange={(e) => handleTicketsChange("child", e.target.value)}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.extras}>
        <h4>Add Extra</h4>
        <label>
          <input
            type="checkbox"
            checked={chosenExtras.serviceBooking}
            onChange={() => toggleExtra("serviceBooking")}
          />
          {extras.serviceBooking.label} $ {extras.serviceBooking.price.toFixed(2)}
        </label>
        <label>
          <input
            type="checkbox"
            checked={chosenExtras.servicePerson}
            onChange={() => toggleExtra("servicePerson")}
          />
          {extras.servicePerson.label} ${extras.servicePerson.price.toFixed(2)} per person
        </label>
      </div>

      <div className={styles.total}>
        <strong>Total:</strong> ${calculateTotal()}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <button type="submit" className={styles.button}>
        Book Now
      </button>
    </form>
  );
}
