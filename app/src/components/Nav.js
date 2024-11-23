import React, { useState } from 'react';

const Nav = () => {
  const currentUser = {
    displayName: "Brianna Fan",
    avatarUrl: "/path-to-avatar.jpg", // replace 
  };

  return (
    <nav className="text-white bg-card p-4 drop-shadow-sm">
      <div className="flex justify-between items-center px-10">
        <div className="flex items-center right-200">
          <img src="../assets/testlogo.png" alt="Logo" width={230} height={50} />
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center rounded-full bg-background px-4 py-3 space-x-4 relative">
            {/* Avatar */}
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
              <img src={currentUser?.avatarUrl} alt={currentUser?.displayName} className="w-full h-full object-cover" />
            </div>
            {/* Display Name */}
            <p className="text-base text-black">{currentUser?.displayName}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;