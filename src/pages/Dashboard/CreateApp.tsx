import React, { useState } from 'react';
import { createApiKey } from '~/api/developer/app.developer';
import { showToast } from '~/common/toastCustom';
import Button from '~/components/Button';
import CustomModal from '~/components/Modal/Modal';

function CreateApp() {
  const [isModalModal, setIsModalOpen] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>('');
  const [name, setName] = useState<string>('');

  const isValidData = (): boolean => {
    if (!name) {
      setNameError('Name is required!!!');
      return false;
    } else {
      setNameError('');
    }
    return true;
  };
  async function handleCreateApiKey() {
    if (!isValidData()) return;
    const _toastId = showToast.loading('Create app......');
    try {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const response = await createApiKey({ name });
      showToast.updateSucess(_toastId, 'Create app successfully!!!!');
    } catch (error) {
      showToast.updateError(_toastId, 'Create app failed!!!!');
    }
  }
  function handleOpenModal() {
    setIsModalOpen(true);
  }

  return (
    <>
      <Button outline roundedMd onClick={handleOpenModal}>
        Create new API Key
      </Button>
      <CustomModal
        isModalOpen={isModalModal}
        setIsModalOpen={setIsModalOpen}
        title="Create account"
        acctionName="Create"
        handle={handleCreateApiKey}
      >
        <div>
          <div>
            <label htmlFor="name" className="block">
              Name<span className="text-error">*</span>
            </label>
            <input
              id="name"
              className="text-black rounded-md w-full h-10 px-4 focus:outline-none"
              type="text"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <span className="text-error text-sm">{nameError}</span>
          </div>
          <div>
            <label htmlFor="description" className="block">
              Description
            </label>
            <input
              id="description"
              className="text-black rounded-md w-full h-10 px-4 focus:outline-none"
              type="text"
            ></input>
          </div>
        </div>
      </CustomModal>
    </>
  );
}

export default CreateApp;
