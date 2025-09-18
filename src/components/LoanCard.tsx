import { Lock, Clock, DollarSign, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LoanCardProps {
  id: string;
  amount: string;
  duration: string;
  collateral: string;
  status: "encrypted" | "active" | "completed";
  isEncrypted?: boolean;
}

const LoanCard = ({ id, amount, duration, collateral, status, isEncrypted = true }: LoanCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "encrypted": return "bg-muted text-muted-foreground";
      case "active": return "bg-vault-green text-vault-green-foreground";
      case "completed": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group hover:shadow-banking transition-vault border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-vault border border-accent/30 flex items-center justify-center">
              {isEncrypted ? (
                <Lock className="w-4 h-4 text-accent" />
              ) : (
                <Eye className="w-4 h-4 text-accent" />
              )}
            </div>
            <CardTitle className="text-lg">Loan #{id}</CardTitle>
          </div>
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span>Amount</span>
            </div>
            {isEncrypted ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                <Lock className="w-3 h-3 text-accent" />
              </div>
            ) : (
              <p className="font-semibold text-foreground">{amount}</p>
            )}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Duration</span>
            </div>
            {isEncrypted ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                <Lock className="w-3 h-3 text-accent" />
              </div>
            ) : (
              <p className="font-semibold text-foreground">{duration}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Collateral</span>
          </div>
          {isEncrypted ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <Lock className="w-3 h-3 text-accent" />
            </div>
          ) : (
            <p className="font-semibold text-foreground">{collateral}</p>
          )}
        </div>
        
        <div className="pt-2">
          {isEncrypted ? (
            <Button variant="secure" className="w-full" size="sm">
              <Lock className="w-4 h-4" />
              Terms Encrypted
            </Button>
          ) : (
            <Button variant="banking" className="w-full" size="sm">
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanCard;