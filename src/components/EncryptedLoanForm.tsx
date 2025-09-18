import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useContract } from '@/hooks/useContract';
import { useWallet } from '@/contexts/WalletContext';
import { Lock, Shield, Calculator, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface EncryptedLoanFormProps {
  onLoanCreated?: (loanId: number) => void;
}

const EncryptedLoanForm: React.FC<EncryptedLoanFormProps> = ({ onLoanCreated }) => {
  const { isConnected } = useWallet();
  const { loading, initializeContract, createLoan, calculateInterest } = useContract();
  
  const [formData, setFormData] = useState({
    amount: '',
    interestRate: '',
    duration: '',
    collateralValue: '',
    purpose: ''
  });
  
  const [calculatedInterest, setCalculatedInterest] = useState<number | null>(null);
  const [showEncryptedData, setShowEncryptedData] = useState(false);
  const [encryptedValues, setEncryptedValues] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (isConnected) {
      initializeContract();
    }
  }, [isConnected, initializeContract]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const encryptValue = (value: number): string => {
    // Simulate FHE encryption - in real implementation this would use actual FHE
    const buffer = Buffer.from(value.toString());
    return buffer.toString('base64');
  };

  const handleCalculateInterest = async () => {
    if (!formData.amount || !formData.interestRate || !formData.duration) {
      toast.error('Please fill in all required fields');
      return;
    }

    const principal = parseFloat(formData.amount);
    const rate = parseFloat(formData.interestRate);
    const time = parseFloat(formData.duration);

    try {
      const interest = await calculateInterest(principal, rate, time);
      if (interest !== null) {
        setCalculatedInterest(interest);
        toast.success('Interest calculated successfully!');
      }
    } catch (error) {
      toast.error('Failed to calculate interest');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!formData.amount || !formData.interestRate || !formData.duration || !formData.collateralValue || !formData.purpose) {
      toast.error('Please fill in all fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    const interestRate = parseFloat(formData.interestRate);
    const duration = parseFloat(formData.duration);
    const collateralValue = parseFloat(formData.collateralValue);

    // Encrypt values for display
    const encrypted = {
      amount: encryptValue(amount),
      interestRate: encryptValue(interestRate),
      duration: encryptValue(duration),
      collateralValue: encryptValue(collateralValue)
    };
    setEncryptedValues(encrypted);

    try {
      const result = await createLoan(amount, interestRate, duration, collateralValue, formData.purpose);
      if (result) {
        toast.success('Encrypted loan created and submitted to blockchain!');
        setFormData({
          amount: '',
          interestRate: '',
          duration: '',
          collateralValue: '',
          purpose: ''
        });
        setCalculatedInterest(null);
        if (onLoanCreated) {
          onLoanCreated(result.events?.LoanCreated?.returnValues?.loanId || 0);
        }
      }
    } catch (error) {
      toast.error('Failed to create encrypted loan');
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Encrypted Loan Creation
          </CardTitle>
          <CardDescription>
            Connect your wallet to create encrypted loans with FHE technology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Please connect your wallet to access encrypted loan creation
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Create Encrypted Loan
        </CardTitle>
        <CardDescription>
          All sensitive data will be encrypted using FHE technology before being stored on-chain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Loan Amount (ETH)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="Enter loan amount"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.01"
                value={formData.interestRate}
                onChange={(e) => handleInputChange('interestRate', e.target.value)}
                placeholder="Enter interest rate"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="Enter loan duration"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="collateralValue">Collateral Value (ETH)</Label>
              <Input
                id="collateralValue"
                type="number"
                step="0.01"
                value={formData.collateralValue}
                onChange={(e) => handleInputChange('collateralValue', e.target.value)}
                placeholder="Enter collateral value"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="purpose">Loan Purpose</Label>
            <Textarea
              id="purpose"
              value={formData.purpose}
              onChange={(e) => handleInputChange('purpose', e.target.value)}
              placeholder="Describe the purpose of this loan"
              required
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCalculateInterest}
              className="flex items-center gap-2"
            >
              <Calculator className="h-4 w-4" />
              Calculate Interest
            </Button>
            
            {calculatedInterest !== null && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Interest: {calculatedInterest.toFixed(4)} ETH
              </Badge>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium">Encrypted Data Preview</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowEncryptedData(!showEncryptedData)}
                className="flex items-center gap-1"
              >
                {showEncryptedData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showEncryptedData ? 'Hide' : 'Show'} Encrypted Data
              </Button>
            </div>
            
            {showEncryptedData && Object.keys(encryptedValues).length > 0 && (
              <div className="space-y-2 text-xs font-mono bg-muted p-3 rounded">
                {Object.entries(encryptedValues).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="text-foreground">{value.substring(0, 20)}...</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating Encrypted Loan...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Create Encrypted Loan
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EncryptedLoanForm;
