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
import { useTranslation } from "react-i18next";

export default function AllTours() {
  const { t } = useTranslation();
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
      <div className={styles.controls}>
        <input
          type="text"
          placeholder={t("alltours.searchPlaceholder")}
          value={searchTerm}
          onChange={handleSearch}
          className={styles.input}
        />

        <select
          value={nameSort}
          onChange={handleNameSort}
          className={styles.input}
        >
          <optgroup label={t("alltours.sortByName")}>
            <option value="az">{t("alltours.az")}</option>
            <option value="za">{t("alltours.za")}</option>
          </optgroup>
        </select>

        <select
          value={priceSort}
          onChange={handlePriceSort}
          className={styles.input}
        >
          <optgroup label={t("alltours.sortByPrice")}>
            <option value="low">{t("alltours.lowToHigh")}</option>
            <option value="high">{t("alltours.highToLow")}</option>
          </optgroup>
        </select>
      </div>

      {loading ? <p>{t("alltours.loading")}</p> : <ToursList tours={tours} />}
    </Container>
  );
}
