import React from 'react';
import CreateApp from './CreateApp';

function Header() {
  return (
    <header className="bg-black rounded-md w-auto flex items-center justify-between px-24 py-2">
      <p className="text-xl">API Keys</p>
      <div>
        <CreateApp />
      </div>
    </header>
  );
}

export default Header;
