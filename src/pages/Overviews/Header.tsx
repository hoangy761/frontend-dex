import React from 'react';
import CreateApp from './CreateApp';

function Header() {
  return (
    <header className="w-full flex items-center justify-between ">
      <p className="text-xl">API Keys</p>
      <CreateApp />
    </header>
  );
}

export default Header;
