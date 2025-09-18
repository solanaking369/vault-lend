import { Shield, Lock, Eye, Zap, Users, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SecurityFeatures = () => {
  const features = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Loan terms are encrypted using advanced cryptography, only revealed upon execution.",
      color: "text-accent"
    },
    {
      icon: Shield,
      title: "Zero Rate Manipulation",
      description: "Hidden terms prevent third parties from manipulating interest rates or conditions.",
      color: "text-vault-green"
    },
    {
      icon: Eye,
      title: "Privacy First",
      description: "Your financial information remains private throughout the entire lending process.",
      color: "text-primary-glow"
    },
    {
      icon: Zap,
      title: "Instant Execution",
      description: "Smart contracts execute immediately once both parties agree to encrypted terms.",
      color: "text-accent"
    },
    {
      icon: Users,
      title: "Trustless Network",
      description: "No intermediaries required - direct peer-to-peer lending with cryptographic trust.",
      color: "text-vault-green"
    },
    {
      icon: TrendingDown,
      title: "Lower Fees",
      description: "Reduced costs through elimination of traditional banking overhead and middlemen.",
      color: "text-primary-glow"
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Military-Grade Security
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our encrypted P2P lending platform uses cutting-edge cryptography to ensure 
            complete privacy and security for all transactions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-banking transition-vault border-border bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-vault border border-accent/30 flex items-center justify-center group-hover:shadow-vault transition-vault">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-security border border-border">
          <div className="text-center">
            <div className="flex justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">256-bit</div>
                <div className="text-sm text-muted-foreground">Encryption</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-vault-green mb-1">0</div>
                <div className="text-sm text-muted-foreground">Breaches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-glow mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Audited by leading security firms • SOC 2 Type II Compliant • ISO 27001 Certified
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;