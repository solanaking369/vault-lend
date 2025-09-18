import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useWallet } from '@/contexts/WalletContext';
import { Wallet, LogOut, RefreshCw, Smartphone, Monitor } from 'lucide-react';
import { toast } from 'sonner';

const WalletConnect: React.FC = () => {
  const { 
    account, 
    balance, 
    isConnected, 
    connectWallet, 
    disconnectWallet, 
    chainId, 
    switchNetwork,
    walletType
  } = useWallet();
  
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);

  const handleConnect = async (walletType: 'metamask' | 'walletconnect') => {
    try {
      await connectWallet(walletType);
      setIsWalletDialogOpen(false);
      toast.success(`${walletType === 'metamask' ? 'MetaMask' : 'WalletConnect'} connected successfully!`);
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
      <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>
              Choose your preferred wallet to connect to VaultLend
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              onClick={() => handleConnect('metamask')}
              className="w-full flex items-center gap-3 h-12"
              variant="outline"
            >
              <Monitor className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">MetaMask</div>
                <div className="text-sm text-muted-foreground">Connect using MetaMask browser extension</div>
              </div>
            </Button>
            
            <Button
              onClick={() => handleConnect('walletconnect')}
              className="w-full flex items-center gap-3 h-12"
              variant="outline"
            >
              <Smartphone className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">WalletConnect</div>
                <div className="text-sm text-muted-foreground">Connect using mobile wallet app</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
          <div className="text-muted-foreground">
            {formatBalance(balance)} ETH • {walletType === 'metamask' ? 'MetaMask' : 'WalletConnect'}
          </div>
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
