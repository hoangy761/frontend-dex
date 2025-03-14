import React from 'react';
import { createApiKey } from '~/api/developer/apiKey.developer';
import Button from '~/components/Button';
function Header() {
  async function handleCreateApiKey() {
    const res = await createApiKey('test name');
    console.log('res:;;;;;;;;;;;;;', res);
  }
  return (
    <header className="bg-black rounded-md w-auto flex items-center justify-between px-24 py-2">
      <p className="text-xl">API Keys</p>
      <div>
        <Button outline roundedMd onClick={handleCreateApiKey}>
          Create new API Key
        </Button>
      </div>
    </header>
  );
}

export default Header;
