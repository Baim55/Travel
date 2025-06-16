import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./SearchFilter.module.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { MdOutlineLocalActivity } from "react-icons/md";
import Container from "../container/Container";

export default function SearchFilter() {
  const [destinations, setDestinations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(null); // "dest" | "act" | "date" | "guests" | null
  const [selection, setSelection] = useState({
    dest: null,
    act: null,
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });
  const ref = useRef();

  useEffect(() => {
    async function load() {
      const [dRes, aRes] = await Promise.all([
        axios.get("/api/destinations"),
        axios.get("/api/activities"),
      ]);
      setDestinations(dRes.data);
      setActivities(aRes.data);
    }
    load();
  }, []);

  // xarici kliklə dropdown-u bağla
  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(null);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <Container>
      <div className={styles.searchFilter} ref={ref}>
        {/* Destinations */}
        <div
          className={styles.field}
          onClick={() => setOpen(open === "dest" ? null : "dest")}
        >
          <FaMapMarkerAlt className={styles.icon} />
          <div className={styles.label}>
            <span>Destination</span>
            <p>
              {selection.city?.name ||
                selection.country?.name ||
                "Where to go?"}
            </p>
          </div>
          <i className={styles.chevron} />

          {open === "dest" && (
            <ul className={styles.dropdown}>
              {/* Əgər ölkə seçilməyibsə, ölkə siyahısını göstər */}
              {!selection.country
                ? countries.map((c) => (
                    <li
                      key={c.id}
                      onClick={() => {
                        setSelection((s) => ({
                          ...s,
                          country: c,
                          city: null,
                        }));
                      }}
                    >
                      {c.name}
                    </li>
                  ))
                : /* ölkə seçilibsə, o ölkənin şəhərlərini göstər */
                  cities.map((city) => (
                    <li
                      key={city.id}
                      onClick={() => {
                        setSelection((s) => ({ ...s, city }));
                        setOpen(null);
                      }}
                    >
                      {city.name}
                    </li>
                  ))}
            </ul>
          )}
        </div>

        {/* ————————— Activity ————————— */}
        <div
          className={styles.field}
          onClick={() => setOpen(open === "act" ? null : "act")}
        >
          <MdOutlineLocalActivity className={styles.icon} />
          <div className={styles.label}>
            <span>Activity</span>
            <p>{selection.act?.name || "All Activities"}</p>
          </div>
          <i className={styles.chevron} />
          {open === "act" && (
            <ul className={styles.dropdown}>
              {activities.map((a) => (
                <li
                  key={a.id}
                  onClick={() => {
                    setSelection((s) => ({ ...s, act: a }));
                    setOpen(null);
                  }}
                >
                  {a.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Date From */}
        <div
          className={styles.field}
          onClick={() => setOpen(open === "date" ? null : "date")}
        >
          <FaCalendarAlt className={styles.icon} />
          <div className={styles.label}>
            <span>When</span>
            <p>{selection.dateFrom || "Select dates"}</p>
          </div>
          <i className={styles.chevron} />
          {open === "date" && (
            <div className={styles.dateRange}>
              <input
                type="date"
                value={selection.dateFrom}
                onChange={(e) =>
                  setSelection((s) => ({ ...s, dateFrom: e.target.value }))
                }
              />
              <input
                type="date"
                value={selection.dateTo}
                onChange={(e) =>
                  setSelection((s) => ({ ...s, dateTo: e.target.value }))
                }
              />
            </div>
          )}
        </div>

        {/* Guests */}
        <div
          className={styles.field}
          onClick={() => setOpen(open === "guests" ? null : "guests")}
        >
          <FaUserAlt className={styles.icon} />
          <div className={styles.label}>
            <span>Guests</span>
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
                  setSelection((s) => ({ ...s, guests: s.guests + 1 }));
                }}
              >
                +
              </button>
            </div>
          )}
        </div>

        <button className={styles.searchBtn}>Search</button>
      </div>
    </Container>
  );
}
