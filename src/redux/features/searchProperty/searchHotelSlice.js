import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchInfo: {},
};

const searchHotelSlice = createSlice({
  name: "searchInfo",
  initialState,
  reducers: {
    setSearchInfo: (state, action) => {
      state.searchInfo = action.payload;
    },
  },
});

export const { setSearchInfo } = searchHotelSlice.actions;
export default searchHotelSlice.reducer;
