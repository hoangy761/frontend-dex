import React from 'react';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';

export const WalletList = () => {
  const { wallets, connectWallet } = useWalletProvider();
  return (
    <>
      <h2>Wallets Detected:</h2>
      <div>
        {Object.keys(wallets).length > 0 ? (
          Object.values(wallets).map((provider: EIP6963ProviderDetail) => (
            <button key={provider.info.uuid} onClick={() => connectWallet(provider.info.rdns)}>
              <img src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </button>
          ))
        ) : (
          <div>there are no Announced Providers</div>
        )}
      </div>
    </>
  );
};
