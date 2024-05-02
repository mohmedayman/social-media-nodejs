// UserDropdownMenu.js
import React from 'react';

const UserDropdownMenu = ({ isOpen }) => {
  return (
    <div className={`z-50 absolute mt-2 py-1 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800 ${isOpen ? 'block' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
    </div>
  );
};

export default UserDropdownMenu;
