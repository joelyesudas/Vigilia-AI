import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile(token);
        setUser(data.user);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
  value={{
    user,
    setUser,
    loading,
    token,
  }}
>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);