import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

const userSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.user.push(action.payload);
    },
    otpInfo: (state, action) => {
      state.otpInfo = action.payload;
    },
  },
});

export const { registerUser, otpInfo } = userSlice.actions;

export default userSlice.reducer;
