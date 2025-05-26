import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./store/StoreProvider";
import { LoadScript } from "@react-google-maps/api";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <StoreProvider>
    <LoadScript
      googleMapsApiKey={`${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`}
      libraries={["places"]}
    >
      <Elements stripe={stripePromise}>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Elements>
    </LoadScript>
  </StoreProvider>
  // </StrictMode>
);
