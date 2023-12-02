import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-8 h-8 mr-2"
            />
            <div className="text-white font-bold font-dancing-script">Speakable English</div>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-white">Home</a>
            <a href="#" className="text-white">About</a>
            <a href="#" className="text-white">Teachers</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
