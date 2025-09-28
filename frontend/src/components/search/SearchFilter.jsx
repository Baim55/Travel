// src/components/SearchFilter.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./SearchFilter.module.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { MdOutlineLocalActivity } from "react-icons/md";
import Container from "../container/Container";
import ToursList from "../tours/ToursList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

export default function SearchFilter() {
  const [destinations, setDestinations] = useState([]); // [{ city, country }]
  const [activities, setActivities] = useState([]); // ["Beaches", ...]
  const [open, setOpen] = useState(null); // which dropdown is open
  const { t } = useTranslation();

  const [isSearched, setIsSearched] = useState(false);

  const [selection, setSelection] = useState({
    country: "",
    city: "",
    act: "",
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });
  const [tours, setTours] = useState([]);
  const ref = useRef();

  // fetch countries/cities and activities
  useEffect(() => {
    async function load() {
      const [locRes, actRes] = await Promise.all([
        axios.get("/api/locations"), // returns [{ city, country }]
        axios.get("/api/tours/activities"), // returns ["Beaches", ...]
      ]);
      setDestinations(locRes.data);
      setActivities(actRes.data);
    }
    load();
  }, []);

  // click outside to close any dropdown
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // handle Search button
  const handleSearch = async () => {
    const params = {};
    if (selection.country) params.country = selection.country;
    if (selection.city) params.city = selection.city;
    if (selection.act) params.activity = selection.act;
    if (selection.dateFrom) params.dateFrom = selection.dateFrom;
    if (selection.guests) params.guests = selection.guests;

    try {
      const res = await axios.get("/api/tours", { params });
      setTours(res.data);
    } catch {
      setTours([]);
    }
    setIsSearched(true);
  };

  // unique list of all countries
  const allCountries = Array.from(
    new Set(destinations.map((d) => d.country))
  ).sort();

  // once a country is picked, get its cities
  const countryCities = selection.country
    ? Array.from(
        new Set(
          destinations
            .filter((d) => d.country === selection.country)
            .map((d) => d.city)
        )
      ).sort()
    : [];

  return (
    <>
      <Container>
        <div className={styles.searchFilter} ref={ref}>
          <div
            className={styles.field}
            onClick={() => setOpen(open === "dest" ? null : "dest")}
          >
            <FaMapMarkerAlt className={styles.icon} />
            <div className={styles.label}>
              <span>{t("search.destination")}</span>
              <p>
                {selection.country
                  ? selection.city
                    ? `${selection.country}, ${selection.city}`
                    : selection.country
                  : t("search.where")}
              </p>
            </div>
            <i className={styles.chevron} />

            {open === "dest" && (
              <ul className={styles.dropdown}>
                {!selection.country
                  ? allCountries.map((country) => (
                      <li
                        key={country}
                        onClick={() => {
                          setSelection((s) => ({
                            ...s,
                            country,
                            city: "", // sıfırlayıb yenidən şəhər seçimi açılacaq
                          }));
                          setOpen(null);
                        }}
                      >
                        {country}
                      </li>
                    ))
                  : countryCities.map((city) => (
                      <li
                        key={city}
                        onClick={() => {
                          setSelection((s) => ({
                            ...s,
                            city,
                          }));
                          setOpen(null);
                        }}
                      >
                        {city}
                      </li>
                    ))}
              </ul>
            )}
          </div>

          <div
            className={styles.field}
            onClick={() => setOpen(open === "act" ? null : "act")}
          >
            <MdOutlineLocalActivity className={styles.icon} />
            <div className={styles.label}>
              <span>{t("search.activity")}</span>
              <p>{selection.act || t("search.allActivities")}</p>
            </div>
            <i className={styles.chevron} />
            {open === "act" && (
              <ul className={styles.dropdown}>
                {activities.map((a) => (
                  <li
                    key={a}
                    onClick={() => {
                      setSelection((s) => ({ ...s, act: a }));
                      setOpen(null);
                    }}
                  >
                    {a}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className={styles.field}
            onClick={() => setOpen(open === "date" ? null : "date")}
          >
            <FaCalendarAlt className={styles.icon} />
            <div className={styles.label}>
              <span>{t("search.when")}</span>
              <p>{selection.dateFrom || t("search.selectDate")}</p>
            </div>
            <i className={styles.chevron} />
            {open === "date" && (
              <div
                className={styles.dateRange}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <DatePicker
                  selected={
                    selection.dateFrom ? new Date(selection.dateFrom) : null
                  }
                  onChange={(date) =>
                    setSelection((s) => ({
                      ...s,
                      dateFrom: date.toISOString().split("T")[0],
                    }))
                  }
                  placeholderText="Start date"
                  className={styles.input}
                />
              </div>
            )}
          </div>

          <div
            className={styles.field}
            onClick={() => setOpen(open === "guests" ? null : "guests")}
          >
            <FaUserAlt className={styles.icon} />
            <div className={styles.label}>
              <span>{t("search.guests")}</span>
              <p>{selection.guests}</p>
            </div>
            <i className={styles.chevron} />
            {open === "guests" && (
              <div className={styles.guestPicker}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelection((s) => ({
                      ...s,
                      guests: Math.max(1, s.guests - 1),
                    }));
                  }}
                >
                  −
                </button>
                <span>{selection.guests}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelection((s) => ({
                      ...s,
                      guests: s.guests + 1,
                    }));
                  }}
                >
                  +
                </button>
              </div>
            )}
          </div>

          <button className={styles.searchBtn} onClick={handleSearch}>
            {t("search.button")}
          </button>
        </div>
      </Container>

      <ToursList tours={tours}isSearch={isSearched} />
    </>
  );
}
