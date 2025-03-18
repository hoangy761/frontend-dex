import React from 'react';
// import Footer from '~/components/Footer';
import ModalWalletConnect from '~/components/Modal/ModalWalletConnect';
import { Sidebar } from '~/components/Sidebar';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-slate-700 min-h-screen flex flex-col">
      <div className="w-full h-full flex-1 flex">
        <Sidebar />
        <main className="flex-1 m-1 overflow-y-scroll">{children}</main>
      </div>
      <ModalWalletConnect />
      {/* <Footer /> */}
    </div>
  );
};

export default DashboardLayout;
