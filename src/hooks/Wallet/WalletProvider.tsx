import { ethers } from 'ethers';
import { StreamProvider } from '@metamask/providers';
import React, { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';
import { LOGIN_MESSAGE } from '~/constants/string';
import { getNonce, web3Sign } from '~/api/developer/auth.developer';
import { removeAccessTokenAndRefreshToken } from '~/common/cookies';

type SelectedAccountByWallet = Record<string, string | null>;

interface WalletProviderContext {
  wallets: Record<string, EIP6963ProviderDetail>; // Record of wallets by UUID
  selectedWallet: EIP6963ProviderDetail | null; // Currently selected wallet
  selectedAccount: string | null; // Account address of selected wallet
  errorMessage: string | null; // Error message
  isPending: boolean; // Flag to indicate if a wallet connection is pending
  chainId: string | null; // Chain ID
  provider: ethers.BrowserProvider | null | ethers.AbstractProvider; // Provider
  signer: ethers.JsonRpcSigner | null; // Signer
  isLogin: boolean;
  // eslint-disable-next-line no-unused-vars
  login: (signer: ethers.JsonRpcSigner | null) => Promise<void>; // Function to trigger login
  // eslint-disable-next-line no-unused-vars
  connectWallet: (walletUuid: string) => Promise<void>; // Function to trigger wallet connection
  disconnectWallet: () => void; // Function to trigger wallet disconnection
  clearError: () => void; // Function to clear error message
}

declare global {
  interface WindowEventMap {
    'eip6963:announceProvider': CustomEvent;
  }
}
declare global {
  interface Window {
    ethereum?: StreamProvider;
  }
}

const defaultContextValue: WalletProviderContext = {
  wallets: {},
  selectedWallet: null,
  selectedAccount: null,
  errorMessage: null,
  isPending: false,
  chainId: null,
  provider: null,
  signer: null,
  isLogin: false,
  login: async () => {},
  connectWallet: async () => {},
  disconnectWallet: () => {},
  clearError: () => {},
};

export const WalletProviderContext = createContext<WalletProviderContext>(defaultContextValue);

// eslint-disable-next-line react/prop-types
export const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [wallets, setWallets] = useState<Record<string, EIP6963ProviderDetail>>({});
  const [selectedWalletRdns, setSelectedWalletRdns] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [selectedAccountByWalletRdns, setSelectedAccountByWalletRdns] = useState<SelectedAccountByWallet>({});
  const [chainId, setChainId] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [provider, setProvider] = useState<ethers.BrowserProvider | null | ethers.AbstractProvider>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const clearError = () => setErrorMessage('');
  const setError = (error: string) => setErrorMessage(error);

  useEffect(() => {
    const savedSelectedWalletRdns = localStorage.getItem('selectedWalletRdns');
    const savedSelectedAccountByWalletRdns = localStorage.getItem('selectedAccountByWalletRdns');
    const savedChainId = localStorage.getItem('chainId');
    const savedAddress = localStorage.getItem('address');
    const saveIsLogin = localStorage.getItem('isLogin');

    if (savedSelectedAccountByWalletRdns) {
      setSelectedAccountByWalletRdns(JSON.parse(savedSelectedAccountByWalletRdns));
    }
    if (savedChainId) {
      setChainId(savedChainId);
    }
    if (savedAddress) {
      // setProvider(JSON.parse(savedAddress));
      if (typeof window !== 'undefined' && window.ethereum) {
        const _provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(_provider);
        getSigner(_provider).then(setSigner);
      } else {
        const _provider = ethers.getDefaultProvider();
        setProvider(_provider);
      }
    }
    if (saveIsLogin) {
      try {
        setIsLogin(Boolean(saveIsLogin));
      } catch (error) {
        console.log('error: ', error);
        setIsLogin(false);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    async function getSigner(_provider: ethers.BrowserProvider): Promise<ethers.JsonRpcSigner | null> {
      const _signer = _provider ? await _provider.getSigner() : null;
      return _signer;
    }
    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      setWallets((currentWallets) => ({
        ...currentWallets,
        [event.detail.info.rdns]: event.detail,
      }));

      if (savedSelectedWalletRdns && event.detail.info.rdns === savedSelectedWalletRdns) {
        setSelectedWalletRdns(savedSelectedWalletRdns);
      }
    }

    window.addEventListener('eip6963:announceProvider', onAnnouncement);
    window.dispatchEvent(new Event('eip6963:requestProvider'));

    return () => window.removeEventListener('eip6963:announceProvider', onAnnouncement);
  }, []);

  const connectWallet = useCallback(
    async (walletRdns: string) => {
      try {
        clearError();
        setIsPending(true);
        const wallet = wallets[walletRdns];
        const accounts = (await wallet.provider.request({ method: 'eth_requestAccounts' })) as string[];
        const _chainId = ((await wallet.provider.request({ method: 'eth_chainId' })) as string) || null;

        if (accounts?.[0]) {
          setSelectedWalletRdns(wallet.info.rdns);
          setSelectedAccountByWalletRdns((currentAccounts) => ({
            ...currentAccounts,
            [wallet.info.rdns]: accounts[0],
          }));

          localStorage.setItem('selectedWalletRdns', wallet.info.rdns);
          localStorage.setItem(
            'selectedAccountByWalletRdns',
            JSON.stringify({
              ...selectedAccountByWalletRdns,
              [wallet.info.rdns]: accounts[0],
            }),
          );
          setChainId(_chainId);
          if (_chainId) {
            localStorage.setItem('chainId', _chainId);
          }
          if (typeof window !== 'undefined' && window.ethereum) {
            const _provider = new ethers.BrowserProvider(window.ethereum);
            if (_provider) {
              setProvider(_provider);
              const _signer = await _provider.getSigner();

              if (_signer) {
                const _address = await _signer.getAddress();
                if (_address) {
                  localStorage.setItem('address', JSON.stringify(_address));
                }
                setSigner(_signer);

                await login(_signer);
              }
            }
          } else {
            const _provider = ethers.getDefaultProvider();
            setProvider(_provider);
          }
        }
        setIsPending(false);
      } catch (error) {
        console.error('Failed to connect to provider:', error);
        const walletError: WalletError = error as WalletError;
        setError(`Code: ${walletError.code} \nError Message: ${walletError.message}`);
        setIsPending(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wallets, selectedAccountByWalletRdns],
  );

  const login = useCallback(
    async (_signer: ethers.JsonRpcSigner | null) => {
      if (!isLogin && _signer) {
        try {
          const _address = await _signer.getAddress();
          const nonce = await getNonce(_address);
          const message = LOGIN_MESSAGE(nonce);

          const signature = await _signer.signMessage(message);
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const res = await web3Sign(_address, signature);
          setIsLogin(true);
          localStorage.setItem('isLogin', 'true');
        } catch (error) {
          console.log('error: ', error);
        }
      }
    },
    [isLogin],
  );

  const disconnectWallet = useCallback(async () => {
    if (selectedWalletRdns) {
      setIsPending(true);
      setSelectedAccountByWalletRdns((currentAccounts) => ({
        ...currentAccounts,
        [selectedWalletRdns]: null,
      }));

      const wallet = wallets[selectedWalletRdns];
      setSelectedWalletRdns(null);
      localStorage.removeItem('selectedWalletRdns');
      localStorage.removeItem('chainId');
      localStorage.removeItem('provider');
      localStorage.removeItem('signer');
      localStorage.removeItem('isLogin');
      removeAccessTokenAndRefreshToken();
      setIsLogin(false);
      try {
        await wallet.provider.request({
          method: 'wallet_revokePermissions',
          params: [{ eth_accounts: {} }],
        });
        setIsPending(false);
      } catch (error) {
        console.error('Failed to revoke permissions: ', error);
        setIsPending(false);
      }
    }
  }, [selectedWalletRdns, wallets]);

  const contextValue: WalletProviderContext = {
    wallets,
    selectedWallet: selectedWalletRdns === null ? null : wallets[selectedWalletRdns],
    selectedAccount: selectedWalletRdns === null ? null : selectedAccountByWalletRdns[selectedWalletRdns],
    errorMessage,
    isPending,
    chainId,
    provider,
    signer,
    isLogin,
    login,
    connectWallet,
    disconnectWallet,
    clearError,
  };

  return <WalletProviderContext.Provider value={contextValue}>{children}</WalletProviderContext.Provider>;
};
