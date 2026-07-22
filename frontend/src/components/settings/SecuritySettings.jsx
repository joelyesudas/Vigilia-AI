import { useNavigate } from "react-router-dom";
import { showInfo, showSuccess } from "../../utils/toast";

export default function SecuritySettings() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();

    showSuccess("Logged out successfully.");

    setTimeout(() => {
      navigate("/login");
    }, 800);
  };

  const changePassword = () => {
    showInfo("Change Password feature coming soon.");
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
        🔐 Security
      </h2>

      <div
        style={{
          display: "grid",
          gap: 20,
        }}
      >
        <button
          onClick={changePassword}
          style={primaryButton}
        >
          🔑 Change Password
        </button>

        <button
          onClick={logout}
          style={dangerButton}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

const primaryButton = {
  background: "#2563EB",
  color: "white",
  border: "none",
  padding: "16px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: "700",
};

const dangerButton = {
  background: "#DC2626",
  color: "white",
  border: "none",
  padding: "16px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: "700",
};