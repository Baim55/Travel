import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000/api/tours";
const initialState = {
  tours: [],
  allTours: [],
};

export const getTours = createAsyncThunk("tour/getTours", async () => {
  const { data } = await axios.get(baseURL);
  return data;
});

export const addTour = createAsyncThunk(
  "tour/addTour",
  // burada 'formData' obyektidir, yox JSON
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

export const deleteTour = createAsyncThunk("product/deleteTour", async (id) => {
  await axios.delete(`${baseURL}/${id}`);
  return id;
});

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, formData }) => {
    const { data } = await axios.put(`${baseURL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  }
);

export const searchTour = createAsyncThunk(
  "tour/searchTour",
  async (search, { getState }) => {
    if (search === "") {
      return getState().tours.allTours;
    }
    const { data } = await axios.get(`${baseURL}/search/${search}`);
    return data;
  }
);

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    // searchProduct: (state, action) => {
    //   state.products = state.allProducts.filter((item) =>
    //     item.title.toLowerCase().includes(action.payload.toLowerCase())
    //   );
    // },
    // sortProductAZ: (state) => {
    //   state.products = state.products.sort((a, b) =>
    //     a.title.localeCompare(b.title)
    //   );
    // },
    // sortProductZA: (state) => {
    //   state.products = state.products.sort((a, b) =>
    //     b.title.localeCompare(a.title)
    //   );
    // },

    sortTourLowest: (state) => {
      state.tours = state.tours.sort((a, b) => a.price - b.price);
    },
    sortTourHigest: (state) => {
      state.tours = state.tours.sort((a, b) => b.price - a.price);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTours.fulfilled, (state, action) => {
      state.tours = action.payload;
      state.allTours = action.payload;
    });
    builder
      .addCase(addTour.pending, (state) => {
        state.loading = true;
        state.error = null;
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
      state.tours = state.tours.filter((item) => item._id !== action.payload);
    });
    builder.addCase(updateTour.fulfilled, (state, { payload }) => {
      state.tours = state.tours.map((t) =>
        t._id === payload._id ? payload : t
      );
    });
    builder.addCase(searchTour.fulfilled, (state, action) => {
      state.tours = action.payload;
    });
  },
});

export const { sortTourLowest, sortTourHigest } = tourSlice.actions;

export default tourSlice.reducer;
