import React from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import ModalWalletConnect from '~/components/Modal/ModalWalletConnect';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-slate-700">
      <Header />
      <main className="w-auto m-1 rounded-md px-16 bg-slate-500">{children}</main>
      <ModalWalletConnect />
      <Footer />
    </div>
  );
};

export default DashboardLayout;
