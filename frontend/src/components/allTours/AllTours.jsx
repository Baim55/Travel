import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../container/Container";
import ToursList from "../tours/ToursList";
import {
  getTours,
  searchTour,
  sortTourAZ,
  sortTourZA,
  sortTourLowest,
  sortTourHigest,
} from "../../redux/features/tourSlice";
import styles from "./AllTours.module.css";

export default function AllTours() {
  const dispatch = useDispatch();
  const { tours } = useSelector((state) => state.tour);
  const loading = useSelector((state) => state.tour.status) === "loading";

  const [searchTerm, setSearchTerm] = useState("");
  const [nameSort, setNameSort] = useState("");
  const [priceSort, setPriceSort] = useState("");

  useEffect(() => {
    dispatch(getTours());
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(searchTour(value));
  };

  const handleNameSort = (e) => {
    const value = e.target.value;
    setNameSort(value);

    if (value === "az") dispatch(sortTourAZ());
    else if (value === "za") dispatch(sortTourZA());
  };

  const handlePriceSort = (e) => {
    const value = e.target.value;
    setPriceSort(value);

    if (value === "low") dispatch(sortTourLowest());
    else if (value === "high") dispatch(sortTourHigest());
  };

  return (
    <Container>
      <h2 className={styles.title}>All Available Tours</h2>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.input}
        />

        <select
          value={nameSort}
          onChange={handleNameSort}
          className={styles.input}
        >
          <optgroup label="Sort by Name">
            <option value="az">A–Z</option>
            <option value="za">Z–A</option>
          </optgroup>
        </select>

        <select
          value={priceSort}
          onChange={handlePriceSort}
          className={styles.input}
        >
          <optgroup label="Sort by Price">
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </optgroup>
        </select>
      </div>

      {loading ? <p>Loading tours…</p> : <ToursList tours={tours} />}
    </Container>
  );
}
