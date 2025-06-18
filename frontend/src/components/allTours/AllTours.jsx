// src/components/AllTours.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../container/Container';
import ToursList from '../tours/ToursList';

export default function AllTours() {
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await axios.get('/api/tours');
        setAllTours(res.data);
      } catch (err) {
        console.error('Cannot fetch all tours', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  return (
    <Container>
      <h2 style={{ margin: '2rem 0 1rem',textAlign:"center" }}>All Available Tours</h2>
      {loading
        ? <p>Loading tours…</p>
        : <ToursList tours={allTours} />
      }
    </Container>
  );
}
