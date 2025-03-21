import React from 'react';
import Box from '~/components/Box';
import ModalWalletConnect from '~/components/Modal/ModalWalletConnect';
import { Sidebar } from '~/components/Sidebar';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <div className="w-full h-full flex-1 flex">
        <Box className="ml-1 h-screen">
          <Sidebar />
        </Box>
        <main className="flex-1 h-screen overflow-y-scroll">{children}</main>
      </div>
      <ModalWalletConnect />
    </div>
  );
};

export default DashboardLayout;
