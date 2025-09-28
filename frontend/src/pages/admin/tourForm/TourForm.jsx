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
    streetViewSrc: "",
    isFeatured: false,
  });

  const [images, setImages] = useState([]);
  const [nearbyHotels, setNearbyHotels] = useState(
    initialData.nearby?.hotels || []
  );
  const [nearbyRests, setNearbyRests] = useState(
    initialData.nearby?.restaurants || []
  );
  const [timeSlots, setTimeSlots] = useState(initialData.timeSlots || []);
  const [disabledDays, setDisabledDays] = useState(
    initialData.disabledDays || []
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // hotel | rest | time
  const [modalData, setModalData] = useState({
    name: "",
    distance: "",
    link: "",
    time: "",
    capacity: "",
  });

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
        streetViewSrc: initialData.streetViewSrc || "",
        isFeatured: initialData.isFeatured === true,
      });
      setImages([]);
      setNearbyHotels(initialData.nearby.hotels);
      setNearbyRests(initialData.nearby.restaurants);
      setTimeSlots(initialData.timeSlots || []);
      setDisabledDays(initialData.disabledDays || []);
    }
  }, [initialData]);
  const openModal = (type) => {
    setModalType(type);
    setModalData({ name: "", distance: "", link: "", time: "", capacity: "" });
    setModalOpen(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = () => {
    if (modalType === "hotel" || modalType === "rest") {
      if (!modalData.name || !modalData.distance) return;
      const item = {
        name: modalData.name,
        distance: modalData.distance,
        link: modalData.link,
      };
      modalType === "hotel"
        ? setNearbyHotels((prev) => [...prev, item])
        : setNearbyRests((prev) => [...prev, item]);
    } else if (modalType === "time") {
      if (!modalData.time || !modalData.capacity) return;
      setTimeSlots((prev) => [
        ...prev,
        { time: modalData.time, capacity: Number(modalData.capacity) },
      ]);
    }
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();

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
      streetViewSrc: form.streetViewSrc,
    }).forEach(([k, v]) => fd.append(k, v));

    fd.append("availableDateRange[startDate]", form.startDate);
    fd.append("availableDateRange[endDate]", form.endDate);
    fd.append("location[lat]", form.lat);
    fd.append("location[lng]", form.lng);
    fd.append("isFeatured", form.isFeatured ? "true" : "false");
    fd.append("timeSlots", JSON.stringify(timeSlots));
    fd.append("disabledDays", JSON.stringify(disabledDays));
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
              {...(field.name !== "discount" && { required: true })}
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

      <div className={styles.field}>
        <label className={styles.label}>
          Street View Src:
          <input
            name="streetViewSrc"
            type="text"
            className={styles.input}
            value={form.streetViewSrc}
            onChange={handleChange}
            placeholder="Google Maps iframe src linki buraya"
          />
        </label>
      </div>

      {form.streetViewSrc && (
        <div className={styles.field}>
          <iframe
            src={form.streetViewSrc}
            width="100%"
            height="400"
            style={{ border: "1px solid #ccc", marginTop: "10px" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      )}

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
        <legend className={styles.legend}>
          Disabled Days (Tur keçirilmir)
        </legend>
        <div className={styles.checkboxGroup}>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <label key={day} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={day}
                checked={disabledDays.includes(day)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setDisabledDays((prev) =>
                    checked ? [...prev, day] : prev.filter((d) => d !== day)
                  );
                }}
              />{" "}
              {day}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Nearby Hotels</legend>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => openModal("hotel")}
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
          onClick={() => openModal("rest")}
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

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Time Slots</legend>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => openModal("time")}
        >
          + Add Time Slot
        </button>
        <ul className={styles.list}>
          {timeSlots.map((slot, i) => (
            <li key={i} className={styles.listItem}>
              {slot.time} — {slot.capacity} nəfər
              <button
                type="button"
                className={styles.removeButton}
                onClick={() =>
                  setTimeSlots((prev) => prev.filter((_, j) => j !== i))
                }
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </fieldset>
      <div className={styles.field}>
        <label className={styles.label}>
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))
            }
          />{" "}
          Is Featured (Seçilmiş tur)
        </label>
      </div>
      <button type="submit" className={styles.submitButton}>
        {initialData._id ? "Update Tour" : "Create Tour"}
      </button>
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>
              {modalType === "time"
                ? "Add Time Slot"
                : `Add ${modalType === "hotel" ? "Hotel" : "Restaurant"}`}
            </h3>

            {modalType === "time" ? (
              <>
                <input
                  name="time"
                  type="text"
                  placeholder="Saat (məs: 11:00)"
                  value={modalData.time}
                  onChange={handleModalChange}
                  className={styles.input}
                />
                <input
                  name="capacity"
                  type="number"
                  placeholder="Tutum (məs: 20)"
                  value={modalData.capacity}
                  onChange={handleModalChange}
                  className={styles.input}
                />
              </>
            ) : (
              <>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={modalData.name}
                  onChange={handleModalChange}
                  className={styles.input}
                />
                <input
                  name="distance"
                  type="text"
                  placeholder="Distance (e.g. 500m)"
                  value={modalData.distance}
                  onChange={handleModalChange}
                  className={styles.input}
                />
                <input
                  name="link"
                  type="text"
                  placeholder="Link (optional)"
                  value={modalData.link}
                  onChange={handleModalChange}
                  className={styles.input}
                />
              </>
            )}

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.submitButton}
                onClick={handleModalSubmit}
              >
                Əlavə et
              </button>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => setModalOpen(false)}
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
