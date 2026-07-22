import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { DashboardProvider } from "./context/DashboardContext";
import { MonitoringProvider } from "./context/MonitoringContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DashboardProvider>
          <MonitoringProvider>
            <App />

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable
              theme="dark"
            />
          </MonitoringProvider>
        </DashboardProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);