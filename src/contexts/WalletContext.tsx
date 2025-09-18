import React, { createContext, useContext, useEffect, useState } from 'react';
import { Web3 } from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

interface WalletContextType {
  account: string | null;
  balance: string;
  isConnected: boolean;
  connectWallet: (walletType?: 'metamask' | 'walletconnect') => Promise<void>;
  disconnectWallet: () => void;
  web3: Web3 | null;
  chainId: number | null;
  switchNetwork: () => Promise<void>;
  walletType: 'metamask' | 'walletconnect' | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [isConnected, setIsConnected] = useState(false);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [walletType, setWalletType] = useState<'metamask' | 'walletconnect' | null>(null);
  const [walletConnectProvider, setWalletConnectProvider] = useState<WalletConnectProvider | null>(null);

  const SEPOLIA_CHAIN_ID = 11155111;
  const SEPOLIA_RPC_URL = 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990';

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          
          // Get chain ID
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setChainId(parseInt(chainId, 16));
          
          // Get balance
          const balance = await web3Instance.eth.getBalance(accounts[0]);
          setBalance(web3Instance.utils.fromWei(balance, 'ether'));
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const connectWallet = async (walletType: 'metamask' | 'walletconnect' = 'metamask') => {
    try {
      if (walletType === 'metamask') {
        await connectMetaMask();
      } else if (walletType === 'walletconnect') {
        await connectWalletConnect();
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        setWalletType('metamask');
        
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        
        // Get chain ID
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(parseInt(chainId, 16));
        
        // Get balance
        const balance = await web3Instance.eth.getBalance(accounts[0]);
        setBalance(web3Instance.utils.fromWei(balance, 'ether'));
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            web3Instance.eth.getBalance(accounts[0]).then(balance => {
              setBalance(web3Instance.utils.fromWei(balance, 'ether'));
            });
          } else {
            disconnectWallet();
          }
        });
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', (chainId: string) => {
          setChainId(parseInt(chainId, 16));
          if (parseInt(chainId, 16) !== SEPOLIA_CHAIN_ID) {
            switchNetwork();
          }
        });
      }
    } else {
      throw new Error('MetaMask is not installed');
    }
  };

  const connectWalletConnect = async () => {
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          11155111: SEPOLIA_RPC_URL,
        },
        chainId: SEPOLIA_CHAIN_ID,
        qrcode: true,
      });

      await provider.enable();
      
      const web3Instance = new Web3(provider as any);
      const accounts = await web3Instance.eth.getAccounts();
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        setWalletType('walletconnect');
        setWalletConnectProvider(provider);
        setWeb3(web3Instance);
        setChainId(SEPOLIA_CHAIN_ID);
        
        // Get balance
        const balance = await web3Instance.eth.getBalance(accounts[0]);
        setBalance(web3Instance.utils.fromWei(balance, 'ether'));
        
        // Listen for account changes
        provider.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            web3Instance.eth.getBalance(accounts[0]).then(balance => {
              setBalance(web3Instance.utils.fromWei(balance, 'ether'));
            });
          } else {
            disconnectWallet();
          }
        });
        
        // Listen for chain changes
        provider.on('chainChanged', (chainId: number) => {
          setChainId(chainId);
          if (chainId !== SEPOLIA_CHAIN_ID) {
            switchNetwork();
          }
        });
      }
    } catch (error) {
      console.error('Error connecting WalletConnect:', error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    if (walletConnectProvider) {
      walletConnectProvider.disconnect();
    }
    setAccount(null);
    setBalance('0');
    setIsConnected(false);
    setWeb3(null);
    setChainId(null);
    setWalletType(null);
    setWalletConnectProvider(null);
  };

  const switchNetwork = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}` }],
        });
      } catch (error: any) {
        if (error.code === 4902) {
          // Network not added, add it
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}`,
                chainName: 'Sepolia Test Network',
                nativeCurrency: {
                  name: 'SepoliaETH',
                  symbol: 'SepoliaETH',
                  decimals: 18,
                },
                rpcUrls: [SEPOLIA_RPC_URL],
                blockExplorerUrls: ['https://sepolia.etherscan.io/'],
              }],
            });
          } catch (addError) {
            console.error('Error adding network:', addError);
          }
        } else {
          console.error('Error switching network:', error);
        }
      }
    }
  };

  const value: WalletContextType = {
    account,
    balance,
    isConnected,
    connectWallet,
    disconnectWallet,
    web3,
    chainId,
    switchNetwork,
    walletType,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}
