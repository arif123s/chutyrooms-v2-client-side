import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  otpInfo:{}
};

const userSlice = createSlice({
  name: "user",
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

export const {registerUser,otpInfo} = userSlice.actions;

export default userSlice.reducer;
