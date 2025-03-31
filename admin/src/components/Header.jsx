import React from 'react';

const Header = ({ userType = 'hr' }) => {
  return (
    <header className="hidden md:flex bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10 items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-800">
        {userType === 'admin' ? 'Admin Dashboard' : 'HR Dashboard'}
      </h2>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
            {userType === 'admin' ? 'A' : 'H'}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">
              {userType === 'admin' ? 'Admin User' : 'HR User'}
            </p>
            <p className="text-xs text-gray-500">
              {userType === 'admin' ? 'admin@cliffservices.com' : 'hr@cliffservices.com'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;