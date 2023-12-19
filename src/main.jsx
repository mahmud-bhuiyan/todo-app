import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./Context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <HelmetProvider>
        <ToastContainer autoClose={3000} rtl={false} theme="dark" />
        <RouterProvider router={router} />
      </HelmetProvider>
    </UserContextProvider>
  </React.StrictMode>
);
