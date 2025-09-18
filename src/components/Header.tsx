import { Lock, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import WalletConnect from "./WalletConnect";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="VaultLend" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold text-foreground">VaultLend</h1>
              <p className="text-xs text-muted-foreground">Encrypted P2P Lending</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/borrow" 
              className={`text-foreground hover:text-accent transition-colors ${location.pathname === '/borrow' ? 'text-accent' : ''}`}
            >
              Borrow
            </Link>
            <Link 
              to="/lend" 
              className={`text-foreground hover:text-accent transition-colors ${location.pathname === '/lend' ? 'text-accent' : ''}`}
            >
              Lend
            </Link>
            <Link 
              to="/#security" 
              className="text-foreground hover:text-accent transition-colors"
            >
              Security
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4 text-accent" />
              <span>FHE Encrypted</span>
            </div>
            <div className="hidden md:flex">
              <WalletConnect />
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <Link 
                to="/borrow" 
                className="block text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Borrow
              </Link>
              <Link 
                to="/lend" 
                className="block text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Lend
              </Link>
              <Link 
                to="/#security" 
                className="block text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Security
              </Link>
              <div className="pt-4 border-t border-border">
                <WalletConnect />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;