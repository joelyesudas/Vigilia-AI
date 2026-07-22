import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await loginUser(form);

      localStorage.setItem("token", data.token);

      navigate("/");
      window.location.reload();

    } catch (err) {
      setError(
        err.response?.data?.message || "Login Failed"
      );
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#0B1120",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "420px",
          background: "#111827",
          padding: "40px",
          borderRadius: "18px",
          border: "1px solid #23304d",
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom: "10px",
          }}
        >
          Vigilia AI
        </h1>

        <p
          style={{
            color: "#94A3B8",
            marginBottom: "35px",
          }}
        >
          SOC Analyst Login
        </p>

        {error && (
          <div
            style={{
              color: "#EF4444",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#0F172A",
  color: "white",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  background: "#2563EB",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};