import { useState } from "react";
import Header from "@/components/Header";
import LoanCard from "@/components/LoanCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Filter, TrendingUp, DollarSign, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Lend = () => {
  const [activeTab, setActiveTab] = useState("available");

  const mockLoans = [
    { id: "L001", amount: "$25,000", duration: "12 months", collateral: "ETH", status: "encrypted" as const },
    { id: "L002", amount: "$50,000", duration: "24 months", collateral: "BTC", status: "encrypted" as const },
    { id: "L003", amount: "$15,000", duration: "6 months", collateral: "USDC", status: "encrypted" as const },
    { id: "L004", amount: "$100,000", duration: "36 months", collateral: "ETH", status: "encrypted" as const },
    { id: "L005", amount: "$75,000", duration: "18 months", collateral: "BTC", status: "encrypted" as const },
    { id: "L006", amount: "$30,000", duration: "12 months", collateral: "USDT", status: "encrypted" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-12 bg-gradient-vault">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">Lend Capital</h1>
            <p className="text-xl text-primary-foreground/80">Earn returns by funding encrypted loan requests</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Available Loans</CardTitle>
                  <DollarSign className="w-6 h-6 text-vault-green" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">142</div>
                <p className="text-sm text-muted-foreground">Ready for funding</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Avg. Interest Rate</CardTitle>
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">8.4%</div>
                <p className="text-sm text-muted-foreground">Across all terms</p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Avg. Duration</CardTitle>
                  <Clock className="w-6 h-6 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">18mo</div>
                <p className="text-sm text-muted-foreground">Average loan term</p>
              </CardContent>
            </Card>
          </div>

          {/* Lending Dashboard */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TabsList className="bg-muted border border-border">
                <TabsTrigger value="available" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Available Loans
                </TabsTrigger>
                <TabsTrigger value="my-investments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  My Investments
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Analytics
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search by amount, duration..." 
                    className="pl-9 w-full sm:w-64 bg-input border-border"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </div>

            <TabsContent value="available" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Available Loan Requests</h2>
                <p className="text-sm text-muted-foreground">Terms revealed upon selection</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockLoans.map((loan) => (
                  <LoanCard key={loan.id} {...loan} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="my-investments" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">My Investment Portfolio</h2>
                <Button variant="banking">
                  Fund New Loan
                </Button>
              </div>
              
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gradient-vault border border-accent/30 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Connect Wallet to View</h3>
                <p className="text-muted-foreground mb-6">Your investment portfolio will appear here</p>
                <Button variant="wallet">Connect Wallet</Button>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Market Analytics</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Interest Rate Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      Chart placeholder - Connect wallet to view analytics
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Collateral Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      Chart placeholder - Connect wallet to view analytics
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Lend;