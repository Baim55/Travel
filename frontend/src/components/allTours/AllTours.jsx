// src/components/AllTours.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../container/Container";
import ToursList from "../tours/ToursList";
import { getTours } from "../../redux/features/tourSlice";

export default function AllTours() {
  const dispatch = useDispatch();
  const { tours } = useSelector(state => state.tour); 
  const loading = useSelector(state => state.tour.status) === "loading";

  useEffect(() => {
    dispatch(getTours());
  }, [dispatch]);

  return (
    <Container>
      <h2 style={{ margin: "2rem 0 1rem", textAlign: "center" }}>
        All Available Tours
      </h2>
      {loading
        ? <p>Loading tours…</p>
        : <ToursList tours={tours} />
      }
    </Container>
  );
}
