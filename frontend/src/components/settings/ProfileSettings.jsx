import { useState } from "react";
import { showSuccess } from "../../utils/toast";

export default function ProfileSettings() {
  const [name, setName] = useState(
    localStorage.getItem("profile_name") || "Joel Yesudas"
  );

  const [email, setEmail] = useState(
    localStorage.getItem("profile_email") || "joel@example.com"
  );

  const [role, setRole] = useState(
    localStorage.getItem("profile_role") || "SOC Analyst"
  );

  const saveProfile = () => {
    localStorage.setItem("profile_name", name);
    localStorage.setItem("profile_email", email);
    localStorage.setItem("profile_role", role);

    showSuccess("Profile updated successfully.");
  };

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
        👤 Profile
      </h2>

      <div
        style={{
          display: "grid",
          gap: 20,
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          style={input}
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          style={input}
        />

        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          style={input}
        />

        <button
          onClick={saveProfile}
          style={button}
        >
          💾 Save Profile
        </button>
      </div>
    </div>
  );
}

const input = {
  background: "#0F172A",
  color: "white",
  border: "1px solid #24324D",
  borderRadius: 12,
  padding: "15px",
  outline: "none",
};

const button = {
  background: "#2563EB",
  color: "white",
  border: "none",
  padding: "15px",
  borderRadius: 12,
  fontWeight: "700",
  cursor: "pointer",
};