// src/components/testimonials/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/testimonials')
      .then(res => setItems(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading reviews…</p>;
  if (error)   return <p className={styles.error}>Error: {error}</p>;

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.subtitle}>Testimonials</p>
        <h2 className={styles.title}>Customer Reviews</h2>
      </div>
      {items.length > 0 && (
        <div className={styles.carousel}>
          {items.map((t, i) => (
            <div key={t._id} className={styles.slide} style={{ display: i === 0 ? 'block' : 'none' }}>
              <blockquote className={styles.text}>"{t.text}"</blockquote>
              <div className={styles.meta}>
                <img src={t.avatar} alt={t.author} className={styles.avatar}/>
                <div>
                  <div className={styles.author}>{t.author}</div>
                  <div className={styles.location}>{t.location}</div>
                  <div className={styles.rating}>
                    {'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* İstəsəniz burda navigation dotları və ya avtomatik slider da əlavə edə bilərsiniz */}
        </div>
      )}
    </section>
  );
}
