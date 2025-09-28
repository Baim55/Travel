import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTours, deleteTour } from "../../../redux/features/tourSlice";
import { useNavigate } from "react-router-dom";
import styles from "./AdminTours.module.css";

export default function AdminTours() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tours } = useSelector((state) => state.tour);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getTours());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Silinsin?")) {
      dispatch(deleteTour(id));
    }
  };

  const filteredTours = tours.filter((tour) =>
    tour.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Tours</h2>
        <input
          type="text"
          placeholder="Search tour name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <button
          className={styles.newButton}
          onClick={() => navigate("/admin/tours/new")}
        >
          + New Tour
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>City</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTours.map((t) => (
              <tr key={t._id}>
                <td className={styles.td}>{t.name}</td>
                <td className={styles.td}>{t.city}</td>
                <td className={styles.td}>${t.price}</td>
                <td className={styles.td}>
                  <button
                    className={`${styles.actionButton} ${styles.editButton}`}
                    onClick={() => navigate(`/admin/tours/${t._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
