import { useState } from "react";
import Header from "@/components/Header";
import EncryptedLoanForm from "@/components/EncryptedLoanForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Lock, ArrowLeft, Shield, DollarSign, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Borrow = () => {
  const [step, setStep] = useState(1);
  const [showEncryptedForm, setShowEncryptedForm] = useState(false);

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
              <DollarSign className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">Borrow Funds</h1>
            <p className="text-xl text-primary-foreground/80">Create an encrypted loan request with FHE privacy protection</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            
            {/* FHE Encrypted Form Toggle */}
            <div className="mb-8 text-center">
              <Button
                variant="outline"
                onClick={() => setShowEncryptedForm(!showEncryptedForm)}
                className="flex items-center gap-2"
              >
                {showEncryptedForm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showEncryptedForm ? 'Hide' : 'Show'} FHE Encrypted Form
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Use FHE encryption for maximum privacy protection
              </p>
            </div>

            {showEncryptedForm ? (
              <EncryptedLoanForm onLoanCreated={(loanId) => {
                console.log('Loan created with ID:', loanId);
                setShowEncryptedForm(false);
              }} />
            ) : (
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  1
                </div>
                <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  2
                </div>
                <div className={`w-16 h-0.5 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  3
                </div>
              </div>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-accent" />
                  {step === 1 && "Loan Details"}
                  {step === 2 && "Collateral & Terms"}
                  {step === 3 && "Review & Submit"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Loan Amount</Label>
                      <Input id="amount" placeholder="Enter amount in USD" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Loan Duration</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 months</SelectItem>
                          <SelectItem value="6">6 months</SelectItem>
                          <SelectItem value="12">12 months</SelectItem>
                          <SelectItem value="24">24 months</SelectItem>
                          <SelectItem value="36">36 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="purpose">Purpose</Label>
                      <Textarea id="purpose" placeholder="Briefly describe the loan purpose (optional)" />
                    </div>
                    
                    <Button onClick={() => setStep(2)} className="w-full">
                      Continue to Collateral
                    </Button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="collateral">Collateral Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select collateral" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                          <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                          <SelectItem value="usdt">Tether (USDT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="collateral-amount">Collateral Amount</Label>
                      <Input id="collateral-amount" placeholder="Enter collateral amount" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interest">Maximum Interest Rate (%)</Label>
                      <Input id="interest" placeholder="e.g., 8.5" />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={() => setStep(3)} className="flex-1">
                        Review Terms
                      </Button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="space-y-4 p-6 bg-muted/30 rounded-lg">
                      <h3 className="font-semibold text-foreground">Loan Summary</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <div className="font-medium">$25,000</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <div className="font-medium">12 months</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Collateral:</span>
                          <div className="font-medium">2.5 ETH</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Max Rate:</span>
                          <div className="font-medium">8.5%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-lg">
                      <Shield className="w-5 h-5 text-accent" />
                      <div className="text-sm">
                        <div className="font-medium text-foreground">Encrypted Protection</div>
                        <div className="text-muted-foreground">Your terms will be encrypted until matched with a lender</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                        Back
                      </Button>
                      <Button variant="wallet" className="flex-1">
                        Connect Wallet & Submit
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Borrow;