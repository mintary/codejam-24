import React, { useState } from "react";
import testlogo from "../assets/testlogo.png";
import { useAuth } from "../components/AuthProvider";
import Hamburger from "./Hamburger";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const handleLogin = () => navigate("/login");
  const handleSignUp = () => navigate("/signup");
  const handleLogout = () => auth.logOut();
  const handleNavigateHome = () => navigate("/");

  return (
    <nav className="bg-white bg-card border-b border-gray-500">
      <div className="flex items-center justify-between">
        {/* Left: Hamburger Menu */}
        <div className="flex-1 flex items-center ml-4 relative">
          <Hamburger onClick={toggleHamburger} />
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center flex-1">
          <img src={testlogo} alt="Logo" width={230} height={30} />
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex-1 flex items-center justify-end space-x-3 mr-5">
          {!auth.username ? (
            <div className="flex space-x-4">
              <div className="flex items-center rounded-md bg-black px-4 space-x-4 relative border-2 border-black hover:bg-grey-500">
                <h4
                  onClick={handleSignUp}
                  className="cursor-pointer text-white hover:text-grey-400 transition-colors duration-200"
                >
                  Sign up
                </h4>
              </div>
              <div className="flex items-center rounded-md bg-background px-4 space-x-4 relative border-2 border-black">
                <h4
                  onClick={handleLogin}
                  className="cursor-pointer text-black transition-colors duration-200"
                >
                  Log in
                </h4>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <div className="flex items-center rounded-md bg-black px-4 space-x-4 relative border-2 border-black hover:bg-grey-500">
                <h4
                  onClick={handleLogout}
                  className="cursor-pointer text-white hover:text-grey-400 transition-colors duration-200"
                >
                  Log out
                </h4>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Side Menu */}
      <div
        className={`navigation fixed top-0 left-0 w-60 h-screen bg-white text-grey transform transition-transform duration-300 ease-in-out border-b border-gray-500 z-0 ${
          hamburgerOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col justify-between p-4 border-r border-gray-500`}
      >
        <div className="mt-16">
          <h4
            onClick={handleNavigateHome}
            className="text-black hover:text-blue-500 cursor-pointer transition-colors duration-200"
          >
            Home
          </h4>
          <h4 className="text-black hover:text-blue-500 cursor-pointer transition-colors duration-200">
            Leaderboard
          </h4>
          {auth.username ? (
            <div>
              <h4
                onClick={handleLogout}
                className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-200"
              >
                <strong>Log out</strong>
              </h4>
            </div>
          ) : (
            <div>
              <h4
                onClick={handleLogin}
                className="hover:text-blue-700 cursor-pointer transition-colors duration-200"
              >
                <strong>Log in</strong>
              </h4>
              <h4
                onClick={handleSignUp}
                className="hover:text-blue-700 cursor-pointer transition-colors duration-200"
              >
                <strong>Sign up</strong>
              </h4>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
