import { createContext, useContext, useState } from "react";
import Spinner from "../components/ui/Spinner/Spinner";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Logout failed:", data.message);
      }
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setUser(null);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <AuthContext value={{ user, setUser, logout }}>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        children
      )}
    </AuthContext>
  );
};

export const useAuth = () => useContext(AuthContext);
