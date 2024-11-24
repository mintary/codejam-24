import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

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
      if (res["message"] === "Login Success") {
        setUsername(data.username);
        localStorage.setItem("site", res["access_token"]);
        console.log("logged in");
        navigate("/", { replace: true });
      } else {
        alert("Incorrect username or password.");
        throw new Error(`${res["message"]}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUsername(null);
    localStorage.removeItem("site");
    console.log("logged out");
  };

  const register = async (data) => {
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res["message"] === "User created successfully") {
        setUsername(data.username);
        localStorage.setItem("site", res["access_token"]);
        console.log("registered and logged in");
        navigate("/", { replace: true });
      } else {
        alert("Error registering: user may already exist.");
        throw new Error(`${res["message"]}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ username, loginAction, logOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
