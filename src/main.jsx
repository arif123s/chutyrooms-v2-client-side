import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "./customStyle.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route.jsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store, { persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <ToastContainer autoClose={1500} />
    </Provider>
  </React.StrictMode>
);
