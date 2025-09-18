import { useState } from "react";
import { Plus, Filter, Search, TrendingUp, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoanCard from "./LoanCard";

const LoanDashboard = () => {
  const [activeTab, setActiveTab] = useState("browse");

  const mockLoans = [
    { id: "L001", amount: "$25,000", duration: "12 months", collateral: "ETH", status: "encrypted" as const },
    { id: "L002", amount: "$50,000", duration: "24 months", collateral: "BTC", status: "encrypted" as const },
    { id: "L003", amount: "$15,000", duration: "6 months", collateral: "USDC", status: "active" as const, isEncrypted: false },
    { id: "L004", amount: "$100,000", duration: "36 months", collateral: "ETH", status: "encrypted" as const },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-border bg-gradient-vault">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-primary-foreground">Total Encrypted</CardTitle>
                <Lock className="w-6 h-6 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary-foreground">$2.4M</div>
              <p className="text-sm text-primary-foreground/70">Protected by encryption</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Active Loans</CardTitle>
                <TrendingUp className="w-6 h-6 text-vault-green" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">142</div>
              <p className="text-sm text-muted-foreground">Currently processing</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Zero Manipulation</CardTitle>
                <Shield className="w-6 h-6 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">100%</div>
              <p className="text-sm text-muted-foreground">Rate protection</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-muted border border-border">
              <TabsTrigger value="browse" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Browse Loans
              </TabsTrigger>
              <TabsTrigger value="my-loans" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                My Loans
              </TabsTrigger>
              <TabsTrigger value="create" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Create Loan
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search encrypted loans..." 
                  className="pl-9 w-full sm:w-64 bg-input border-border"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value="browse" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Available Loans</h2>
              <p className="text-sm text-muted-foreground">Terms revealed upon wallet connection</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockLoans.map((loan) => (
                <LoanCard key={loan.id} {...loan} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-loans" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">My Portfolio</h2>
              <Button variant="banking">
                <Plus className="w-4 h-4" />
                New Loan
              </Button>
            </div>
            
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gradient-vault border border-accent/30 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Connect Wallet to View</h3>
              <p className="text-muted-foreground mb-6">Your encrypted loan portfolio will appear here</p>
              <Button variant="wallet">Connect Wallet</Button>
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Create Encrypted Loan</h2>
                <p className="text-muted-foreground">Your terms remain private until execution</p>
              </div>
              
              <Card className="border-border">
                <CardContent className="p-8">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gradient-vault border border-accent/30 flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Wallet Required</h3>
                    <p className="text-muted-foreground mb-6">Connect your wallet to create encrypted loan terms</p>
                    <Button variant="wallet" size="lg">Connect Wallet to Continue</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LoanDashboard;