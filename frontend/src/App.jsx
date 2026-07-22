import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Upload from "./pages/Upload";
import ScanHistory from "./pages/ScanHistory";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BackgroundNotifications from "./components/system/BackgroundNotifications";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring";
import ThreatInvestigation from "./pages/ThreatInvestigation";
import IncidentResponse from "./pages/IncidentResponse";
import Reports from "./pages/Reports";
import Copilot from "./pages/Copilot";
import Settings from "./pages/Settings";

export default function App() {

  useEffect(() => {

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

  }, []);

  return (
    <>
      <BackgroundNotifications />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route
            path="monitoring"
            element={<Monitoring />}
          />

          <Route
            path="upload"
            element={<Upload />}
          />

          <Route
            path="threat-investigation"
            element={<ThreatInvestigation />}
          />

          <Route
            path="incident-response"
            element={<IncidentResponse />}
          />

          <Route
            path="scan-history"
            element={<ScanHistory />}
          />

          <Route
            path="reports"
            element={<Reports />}
          />

          <Route
            path="copilot"
            element={<Copilot />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>
      </Routes>
    </>
  );
}