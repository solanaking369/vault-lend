import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SecurityFeatures from "@/components/SecurityFeatures";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Encrypted Lending?</h2>
            <p className="text-xl text-muted-foreground">Your financial privacy is our priority</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg border border-border bg-card">
              <div className="w-16 h-16 bg-gradient-vault rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">End-to-End Encryption</h3>
              <p className="text-muted-foreground">All loan terms remain encrypted until execution, preventing manipulation</p>
            </div>
            
            <div className="text-center p-8 rounded-lg border border-border bg-card">
              <div className="w-16 h-16 bg-gradient-vault rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Zero Manipulation</h3>
              <p className="text-muted-foreground">Protected from third-party rate manipulation and interference</p>
            </div>
            
            <div className="text-center p-8 rounded-lg border border-border bg-card">
              <div className="w-16 h-16 bg-gradient-vault rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Instant Execution</h3>
              <p className="text-muted-foreground">Smart contracts execute immediately upon agreement</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-vault">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Start?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8">Choose your path in the encrypted lending ecosystem</p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/borrow">
              <Button variant="secondary" size="lg" className="group">
                Need Funds? Borrow
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/lend">
              <Button variant="outline" size="lg" className="group border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Have Capital? Lend
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <SecurityFeatures />
    </div>
  );
};

export default Index;
