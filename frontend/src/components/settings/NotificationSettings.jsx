import { useState, useEffect } from "react";
import { showSuccess } from "../../utils/toast";

export default function NotificationSettings() {
  const [browser, setBrowser] = useState(
    JSON.parse(localStorage.getItem("notify_browser") ?? "true")
  );

  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("notify_email") ?? "false")
  );

  const [critical, setCritical] = useState(
    JSON.parse(localStorage.getItem("notify_critical") ?? "true")
  );

  useEffect(() => {
    localStorage.setItem(
      "notify_browser",
      JSON.stringify(browser)
    );
  }, [browser]);

  useEffect(() => {
    localStorage.setItem(
      "notify_email",
      JSON.stringify(email)
    );
  }, [email]);

  useEffect(() => {
    localStorage.setItem(
      "notify_critical",
      JSON.stringify(critical)
    );
  }, [critical]);

  const toggle = (setter, value, label) => {
    setter(!value);
    showSuccess(`${label} ${value ? "disabled" : "enabled"}.`);
  };

  const Row = ({ label, value, onChange }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <span
        style={{
          color: "white",
          fontSize: 16,
        }}
      >
        {label}
      </span>

      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        style={{
          width: 18,
          height: 18,
          cursor: "pointer",
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #24324D",
        borderRadius: 20,
        padding: 30,
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: 25,
        }}
      >
        🔔 Notifications
      </h2>

      <Row
        label="Browser Notifications"
        value={browser}
        onChange={() =>
          toggle(
            setBrowser,
            browser,
            "Browser Notifications"
          )
        }
      />

      <Row
        label="Email Alerts"
        value={email}
        onChange={() =>
          toggle(setEmail, email, "Email Alerts")
        }
      />

      <Row
        label="Critical Alerts Only"
        value={critical}
        onChange={() =>
          toggle(
            setCritical,
            critical,
            "Critical Alerts"
          )
        }
      />
    </div>
  );
}