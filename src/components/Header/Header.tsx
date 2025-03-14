import React from 'react';
import Navbar from './Navbar';
import User from './User';

const Header = () => {
  return (
    <div className="w-auto sticky top-0 backdrop-blur-md bg-black m-1 rounded-b-md">
      <div className="flex justify-between container mx-auto p-2">
        <Navbar />
        <User />
      </div>
    </div>
  );
};
export default Header;
