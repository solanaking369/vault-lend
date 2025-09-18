import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/contexts/WalletContext';
import { Wallet, LogOut, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const WalletConnect: React.FC = () => {
  const { 
    account, 
    balance, 
    isConnected, 
    connectWallet, 
    disconnectWallet, 
    chainId, 
    switchNetwork 
  } = useWallet();

  const handleConnect = async () => {
    try {
      await connectWallet();
      toast.success('Wallet connected successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to connect wallet');
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    toast.success('Wallet disconnected');
  };

  const handleSwitchNetwork = async () => {
    try {
      await switchNetwork();
      toast.success('Network switched to Sepolia');
    } catch (error: any) {
      toast.error(error.message || 'Failed to switch network');
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance: string) => {
    return parseFloat(balance).toFixed(4);
  };

  if (!isConnected) {
    return (
      <Button onClick={handleConnect} className="flex items-center gap-2">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Network Status */}
      <Badge 
        variant={chainId === 11155111 ? "default" : "destructive"}
        className="flex items-center gap-1"
      >
        <div className={`w-2 h-2 rounded-full ${chainId === 11155111 ? 'bg-green-500' : 'bg-red-500'}`} />
        {chainId === 11155111 ? 'Sepolia' : 'Wrong Network'}
      </Badge>

      {/* Switch Network Button */}
      {chainId !== 11155111 && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleSwitchNetwork}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Switch Network
        </Button>
      )}

      {/* Account Info */}
      <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
        <div className="text-sm">
          <div className="font-medium">{formatAddress(account!)}</div>
          <div className="text-muted-foreground">{formatBalance(balance)} ETH</div>
        </div>
      </div>

      {/* Disconnect Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleDisconnect}
        className="flex items-center gap-1"
      >
        <LogOut className="h-3 w-3" />
        Disconnect
      </Button>
    </div>
  );
};

export default WalletConnect;
