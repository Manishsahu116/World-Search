import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const NavBar = ({ theme, toggleTheme }) => {
  return (
    <nav
      className={`${
        theme === 'light' ? 'bg-white text-gray-900' : 'bg-slate-900 text-white'
      } flex justify-between items-center p-6 h-20 shadow-md transition-colors duration-300`}>
      <h1 className="text-3xl font-extrabold">Where in the world?</h1>
      <button
        onClick={toggleTheme}
        className="flex items-center relative cursor-pointer p-2 rounded-full transition-colors duration-300">
        <div
          className={`w-16 h-8 flex items-center rounded-full p-1 transition-transform duration-300 ${
            theme === 'light' ? 'bg-gray-300' : 'bg-gray-800'
          }`}>
          <div
            className={`w-8 h-7 bg-white rounded-full shadow-md transform ${
              theme === 'light' ? 'translate-x-0' : 'translate-x-8'
            } transition-transform duration-300`}/>
        </div>
        <div className="absolute flex items-center inset-0 justify-between px-2">
          <FaMoon size={22} className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'} />
          <FaSun size={22} className={theme === 'light' ? 'text-gray-400' : 'text-gray-600'} />
        </div>
      </button>
    </nav>
  );
};

export default NavBar;
