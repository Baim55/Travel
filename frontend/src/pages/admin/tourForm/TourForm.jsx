import React, { useState, useEffect } from "react";
import styles from "./TourForm.module.css";

export default function TourForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({ /* ... */ });
  const [images, setImages] = useState([]);
  const [nearbyHotels, setNearbyHotels] = useState(initialData.nearby?.hotels || []);
  const [nearbyRests, setNearbyRests] = useState(initialData.nearby?.restaurants || []);

  useEffect(() => {
    if (initialData._id) {
      setForm({
        name: initialData.name,
        country: initialData.country,
        city: initialData.city,
        activity: initialData.activity,
        description: initialData.description,
        duration: initialData.duration,
        price: initialData.price,
        startDate: initialData.availableDateRange.startDate.slice(0,10),
        endDate: initialData.availableDateRange.endDate.slice(0,10),
        maxGuests: initialData.maxGuests,
        lat: initialData.location.lat,
        lng: initialData.location.lng,
      });
      setImages([]);
      setNearbyHotels(initialData.nearby.hotels);
      setNearbyRests(initialData.nearby.restaurants);
    }
  }, [initialData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFileChange = e => setImages(Array.from(e.target.files));
  const addNearby = type => { /* ... */ };
  const handleSubmit = e => { /* ... */ };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        {initialData._id ? "Edit Tour" : "New Tour"}
      </h2>

      {[
        { label: "Name", name: "name", type: "text" },
        /* ... qalan sahələr ... */
      ].map(field => (
        <div key={field.name} className={styles.field}>
          <label className={styles.label}>
            {field.label}:
            <input
              name={field.name}
              type={field.type}
              className={styles.input}
              value={form[field.name]}
              onChange={handleChange}
              required
            />
          </label>
        </div>
      ))}

      {/* Activity */}
      <div className={styles.field}>
        <label className={styles.label}>
          Activity:
          <select
            name="activity"
            className={styles.select}
            value={form.activity}
            onChange={handleChange}
          >
            {["Beaches","City Tours","Cruises","Hiking","Historical","Museum Tours"]
              .map(act => <option key={act} value={act}>{act}</option>)}
          </select>
        </label>
      </div>

      {/* Description */}
      <div className={styles.field}>
        <label className={styles.label}>
          Description:
          <textarea
            name="description"
            className={styles.textarea}
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </label>
      </div>

      {/* Dates */}
      <div className={styles.field} style={{ display: "flex", gap: 8 }}>
        <label className={styles.label}>
          Start Date:
          <input
            name="startDate"
            type="date"
            className={styles.input}
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.label}>
          End Date:
          <input
            name="endDate"
            type="date"
            className={styles.input}
            value={form.endDate}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* Images */}
      <div className={styles.field}>
        <label className={styles.label}>
          Images:
          <input
            name="images"
            type="file"
            multiple
            accept="image/*"
            className={styles.file}
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Nearby Hotels */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Nearby Hotels</legend>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => addNearby("hotel")}
        >
          + Add Hotel
        </button>
        <ul className={styles.list}>
          {nearbyHotels.map((h, i) => (
            <li key={i} className={styles.listItem}>
              {h.name} — {h.distance}
              <button
                type="button"
                className={styles.removeButton}
                onClick={() =>
                  setNearbyHotels(n => n.filter((_, j) => j !== i))
                }
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* Nearby Restaurants */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Nearby Restaurants</legend>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => addNearby("rest")}
        >
          + Add Restaurant
        </button>
        <ul className={styles.list}>
          {nearbyRests.map((r, i) => (
            <li key={i} className={styles.listItem}>
              {r.name} — {r.distance}
              <button
                type="button"
                className={styles.removeButton}
                onClick={() =>
                  setNearbyRests(rlist => rlist.filter((_, j) => j !== i))
                }
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      <button type="submit" className={styles.submitButton}>
        {initialData._id ? "Update Tour" : "Create Tour"}
      </button>
    </form>
  );
}
