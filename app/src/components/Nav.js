import React, { useState } from "react";
import testlogo from "../assets/testlogo.png";
import { useAuth } from "../components/AuthProvider";
import Hamburger from "./Hamburger";

const Nav = () => {
  const currentUser = {
    displayName: "Brianna Fan",
    avatarUrl: "/path-to-avatar.jpg", // replace
  };
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <nav className="bg-white bg-card drop-shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center ml-4">
          <Hamburger onClick={toggleHamburger} />
          <div
            className={`navigation fixed top-0 left-0 w-[25vw] h-screen bg-white text-grey transform transition-transform duration-300 ease-in-out ${
              hamburgerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 mt-12">
              <p>Home</p>
              <p>Dashboard</p>
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full">
                Log out
              </button>
            </div>
          </div>
        </div>
        <img src={testlogo} alt="Logo" width={230} height={30} />

        <div className="flex items-center space-x-3">
          <div className="flex items-center rounded-md bg-background px-4 py-2 space-x-4 relative border-2 border-black">
            <p className="text-base text-black">{currentUser?.displayName}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
