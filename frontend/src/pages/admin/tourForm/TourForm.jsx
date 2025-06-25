// src/components/admin/TourForm.jsx
import React, { useState, useEffect } from "react";
import styles from "./TourForm.module.css";

export default function TourForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    country: "",
    city: "",
    activity: "Beaches",
    description: "",
    duration: "",
    price: "",
    discount: "",
    startDate: "",
    endDate: "",
    maxGuests: "",
    lat: "",
    lng: "",
  });
  const [images, setImages] = useState([]);
  const [nearbyHotels, setNearbyHotels] = useState(
    initialData.nearby?.hotels || []
  );
  const [nearbyRests, setNearbyRests] = useState(
    initialData.nearby?.restaurants || []
  );

  // Düzəliş zamanı initialData ilə doldur
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
        discount: initialData.discount || "",
        startDate: initialData.availableDateRange.startDate.slice(0, 10),
        endDate: initialData.availableDateRange.endDate.slice(0, 10),
        maxGuests: initialData.maxGuests,
        lat: initialData.location.lat,
        lng: initialData.location.lng,
      });
      setImages([]); // yeni fayl seçimi üçün sıfırla
      setNearbyHotels(initialData.nearby.hotels);
      setNearbyRests(initialData.nearby.restaurants);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    // multiple seçilmiş faylları massivə çevir
    setImages(Array.from(e.target.files));
  };

  const addNearby = (type) => {
    const name = prompt("Name:");
    const distance = prompt("Distance (e.g. 500m):");
    const link = prompt("Link:");
    if (!name) return;
    const item = { name, distance, link };
    if (type === "hotel") setNearbyHotels((h) => [...h, item]);
    else setNearbyRests((r) => [...r, item]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();

    // Sadə sahələr
    Object.entries({
      name: form.name,
      country: form.country,
      city: form.city,
      activity: form.activity,
      description: form.description,
      duration: form.duration,
      price: form.price,
      discount: form.discount,
      maxGuests: form.maxGuests,
    }).forEach(([k, v]) => fd.append(k, v));

    fd.append("availableDateRange[startDate]", form.startDate);
    fd.append("availableDateRange[endDate]", form.endDate);
    fd.append("location[lat]", form.lat);
    fd.append("location[lng]", form.lng);

    images.forEach((file) => fd.append("images", file));

    fd.append(
      "nearby",
      JSON.stringify({
        hotels: nearbyHotels,
        restaurants: nearbyRests,
      })
    );

    onSubmit(fd);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        {initialData._id ? "Edit Tour" : "New Tour"}
      </h2>

      {[
        { label: "Name", name: "name", type: "text" },
        { label: "Country", name: "country", type: "text" },
        { label: "City", name: "city", type: "text" },
        { label: "Duration", name: "duration", type: "text" },
        { label: "Price", name: "price", type: "number" },
        { label: "Discount (%)", name: "discount", type: "number" },
        { label: "Max Guests", name: "maxGuests", type: "number" },
        { label: "Latitude", name: "lat", type: "number" },
        { label: "Longitude", name: "lng", type: "number" },
      ].map((field) => (
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

      <div className={styles.field}>
        <label className={styles.label}>
          Activity:
          <select
            name="activity"
            className={styles.select}
            value={form.activity}
            onChange={handleChange}
          >
            {[
              "Beaches",
              "City Tours",
              "Cruises",
              "Hiking",
              "Historical",
              "Museum Tours",
            ].map((act) => (
              <option key={act} value={act}>
                {act}
              </option>
            ))}
          </select>
        </label>
      </div>

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

      <div className={styles.fieldRow}>
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
        {images.length > 0 && (
          <ul className={styles.selectedList}>
            {images.map((f, i) => (
              <li key={i} className={styles.selectedItem}>
                {f.name} ({(f.size / 1024).toFixed(1)} KB)
              </li>
            ))}
          </ul>
        )}
      </div>

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
                  setNearbyHotels((n) => n.filter((_, j) => j !== i))
                }
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

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
                  setNearbyRests((rlist) => rlist.filter((_, j) => j !== i))
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
