import React, { useState } from 'react';
import testlogo from '../assets/testlogo.png'

const Nav = () => {
  const currentUser = {
    displayName: "Brianna Fan",
    avatarUrl: "/path-to-avatar.jpg", // replace 
  };

  return (
    <nav className="bg-white bg-card p-1 drop-shadow-sm">
      <div className="flex justify-between items-center px-10">
        <div className="flex items-center right-200">
          <img src={testlogo} alt="Logo" width={230} height={30} />
        </div>
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