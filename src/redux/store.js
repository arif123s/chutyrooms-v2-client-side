import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./features/property/propertySlice";
import userReducer from "./features/user/userSlice";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import membershipCardReducer from "./features/membershipCard/membershipCardSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import popularHotelReducer from "./features/popularHotels/popularHotelSlice";


const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  // devTools:false,
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    user: userReducer,
    property: propertyReducer,
    popularHotel: popularHotelReducer,
    membershipCard : membershipCardReducer,
    
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store)
export default store;

