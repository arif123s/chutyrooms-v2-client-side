import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice';
import propertyReducer from "../features/property/propertySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer,
  },
});

export default store;