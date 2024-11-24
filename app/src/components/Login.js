import { useState } from "react";
import { useAuth } from "../components/AuthProvider";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    console.log("submitted login");
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
    alert("Fields cannot be empty.");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <p>signup</p>
      <form onSubmit={handleSubmitEvent}>
        <div className="user-form">
          <label>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="john123"
            onChange={handleInput}
          />
        </div>
        <div className="user-form">
          <label>Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Enter a secure password."
            onChange={handleInput}
          />
        </div>
        <button className="btn-submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
