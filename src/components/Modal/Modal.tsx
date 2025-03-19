import { Cancel01Icon } from 'hugeicons-react';
import React from 'react';
import Button from '~/components/Button';
type CustomModalType = {
  title?: string;
  acctionName?: string;
  children?: React.ReactNode;
  isModalOpen: boolean;
  handle?: () => void;
  setIsModalOpen: (_booolean: boolean) => void;
};
const CustomModal: React.FC<CustomModalType> = ({
  title,
  children,
  isModalOpen,
  setIsModalOpen,
  handle,
  acctionName,
}) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black-50 z-20 bg-white bg-opacity-30 w-full">
          <div className="modal-content absolute  bg-black border border-white-1 rounded-md min-w-96">
            <div className="p-5 relative space-y-4 w-full">
              <header className=" w-full flex justify-between items-center">
                <p className="text-lg md:text-2xl ">{title}</p>

                <Button icon={<Cancel01Icon />} error roundedMd onClick={handleCloseModal}></Button>
              </header>
              <div>{children}</div>
              <footer className="flex space-x-4 w-full justify-end">
                {handle ? (
                  <>
                    <Button info roundedMd onClick={handleCloseModal}>
                      Cancle
                    </Button>
                    <Button white roundedMd onClick={handle}>
                      {acctionName ? acctionName : 'Continue'}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button white roundedMd onClick={handleCloseModal} large>
                      Oke
                    </Button>
                  </>
                )}
              </footer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
