import { useState } from "react";
import { useAuth } from "../components/AuthProvider";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    setError(""); 
    if (!input.username || !input.password) {
      setError("All fields are required.");
      return;
    }
    auth.loginAction(input); 
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-40 mb-20">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmitEvent}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="john123"
              value={input.username}
              onChange={handleInput}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-blue"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a secure password"
              value={input.password}
              onChange={handleInput}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-blue"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-blue hover:bg-dark-green-blue text-white py-3 rounded-md font-semibold focus:outline-none"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            onClick={() => window.location.href = "/signup"} 
            className="text-green-blue hover:text-dark-green-blue font-semibold"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

