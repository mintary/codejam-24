import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site" || ""));

  const navigate = useNavigate();

  // data: {"username": "...", "password": "..."}
  const loginAction = async (data) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res["message"] == "Login Success") {
        setUsername(data.username);
        setToken(res["access_token"]);
        console.log("logged in");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUsername(null);
    setToken("");
    localStorage.removeItem("site");
    console.log("logged out");
  };

  return (
    <AuthContext.Provider value={{ username, token, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
