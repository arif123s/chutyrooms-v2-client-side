import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../../api/baseApi";
import { BASE_API } from "../../../BaseApi/BaseApi";

const initialState = {
  hotels: [],
  isLoading: false,
  isError: false,
  error: "",
};

// export const popularHotelApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getCountry: builder.query({
//       query: () => "/country",
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     }),
//   }),
// });

export const getPopularHotels = createAsyncThunk(
  "hotels/getPopularHotels",
//   async () => {
//     const res = await popularHotelApi();
//     const data = res.json();
// console.log('popular',data)
//     return data;
//   }
  async () => {
    const res = await fetch(`${BASE_API}/country`, {
    // const res = await fetch("http://127.0.0.1:8000/api/country", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = res.json();

    return data;
  }
);

const popularHotelSlice = createSlice({
  name: "hotels",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPopularHotels.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getPopularHotels.fulfilled, (state, action) => {
        state.hotels = action.payload.data.data;
        state.isLoading = false;
      })
      .addCase(getPopularHotels.rejected, (state, action) => {
        state.hotels = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default popularHotelSlice.reducer;
