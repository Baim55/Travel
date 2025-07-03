// redux/features/tourSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000/api/tours";

const initialState = {
  tours: [],
  allTours: [],
  loading: false,
  error: null,
};

// ✅ GET ALL TOURS
export const getTours = createAsyncThunk("tour/getTours", async () => {
  const { data } = await axios.get(baseURL);
  return data;
});

// ✅ ADD TOUR
export const addTour = createAsyncThunk(
  "tour/addTour",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(baseURL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ DELETE TOUR
export const deleteTour = createAsyncThunk("tour/deleteTour", async (id) => {
  await axios.delete(`${baseURL}/${id}`);
  return id;
});

// ✅ UPDATE TOUR
export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, formData }) => {
    const { data } = await axios.put(`${baseURL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  }
);

// ✅ SEARCH TOUR
export const searchTour = createAsyncThunk(
  "tour/searchTour",
  async (search, { getState }) => {
    if (search === "") {
      return getState().tour.allTours;
    }
    const { data } = await axios.get(`${baseURL}/search/${search}`);
    return data;
  }
);

// ✅ SLICE
const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    sortTourLowest: (state) => {
      state.tours = state.tours.slice().sort((a, b) => a.price - b.price);
    },
    sortTourHigest: (state) => {
      state.tours = state.tours.slice().sort((a, b) => b.price - a.price);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTours.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
        state.allTours = action.payload;
      })
      .addCase(getTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(addTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tours.push(action.payload);
      })
      .addCase(addTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder.addCase(deleteTour.fulfilled, (state, action) => {
      state.tours = state.tours.filter((t) => t._id !== action.payload);
    });

    builder.addCase(updateTour.fulfilled, (state, { payload }) => {
      state.tours = state.tours.map((t) => (t._id === payload._id ? payload : t));
    });

    builder.addCase(searchTour.fulfilled, (state, action) => {
      state.tours = action.payload;
    });

    // ✅ AZ & ZA sort (manual action dispatch)
    builder.addCase("tour/sortTourAZ", (state) => {
      state.tours = state.tours.slice().sort((a, b) => a.name.localeCompare(b.name));
    });

    builder.addCase("tour/sortTourZA", (state) => {
      state.tours = state.tours.slice().sort((a, b) => b.name.localeCompare(a.name));
    });
  },
});

// ✅ Manual actions for AZ-ZA
export const sortTourAZ = () => ({ type: "tour/sortTourAZ" });
export const sortTourZA = () => ({ type: "tour/sortTourZA" });

// ✅ Normal reducers
export const { sortTourLowest, sortTourHigest } = tourSlice.actions;

export default tourSlice.reducer;
