import React from 'react';
import { createApiKey } from '~/api/developer/app.developer';
import { showToast } from '~/common/toastCustom';
import Button from '~/components/Button';

function Header() {
  async function handleCreateApiKey() {
    const _toastId = showToast.loading('loaging');
    try {
      const response = await createApiKey('haha');
      console.log('ress:::::::::', response.data.data._name);
      showToast.updateSucess(_toastId, 'Create app success: ', JSON.stringify(response.data.data._name));
    } catch (error) {
      console.log(error);
      showToast.updateError(_toastId, 'failed');
    }
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
