import { Lock, Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import vaultHero from "@/assets/vault-hero.jpg";

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-security relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Borrow and Lend{" "}
                <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
                  Privately
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Revolutionary P2P lending where loan terms remain encrypted until execution, 
                preventing third-party rate manipulation and ensuring true privacy.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50 border border-border">
                <Lock className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Encrypted Terms</span>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50 border border-border">
                <Shield className="w-5 h-5 text-vault-green" />
                <span className="text-sm font-medium">Zero Manipulation</span>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50 border border-border">
                <EyeOff className="w-5 h-5 text-primary-glow" />
                <span className="text-sm font-medium">Full Privacy</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="banking" size="lg" className="flex-1 sm:flex-none">
                Start Lending
              </Button>
              <Button variant="vault" size="lg" className="flex-1 sm:flex-none">
                Borrow Funds
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-banking border border-border">
              <img 
                src={vaultHero} 
                alt="Secure digital vault representing encrypted P2P lending"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
            
            {/* Floating Security Indicators */}
            <div className="absolute -top-4 -right-4 animate-vault-pulse">
              <div className="w-16 h-16 rounded-full bg-gradient-vault border border-accent/30 flex items-center justify-center shadow-vault">
                <Eye className="w-6 h-6 text-accent" />
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 animate-secure-slide">
              <div className="w-12 h-12 rounded-full bg-gradient-primary border border-primary-glow/30 flex items-center justify-center shadow-glow">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;