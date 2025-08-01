import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockClauses } from '@/data/mockData';
import { AlertTriangle, X, Eye, Info } from 'lucide-react';

// This component simulates inline highlights that would be injected into policy pages
const InlineHighlights = () => {
  const [selectedClause, setSelectedClause] = useState<string | null>(null);
  const [highlightsVisible, setHighlightsVisible] = useState(true);

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'destructive';
      case 'caution': return 'secondary';
      case 'safe': return 'default';
      default: return 'default';
    }
  };

  const getRiskEmoji = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return '🚨';
      case 'caution': return '⚠️';
      case 'safe': return '✅';
      default: return '📄';
    }
  };

  if (!highlightsVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={() => setHighlightsVisible(true)}
          variant="hero"
          size="sm"
          className="shadow-elegant"
        >
          <Eye className="mr-2 h-4 w-4" />
          Show Highlights
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Simulated Policy Text with Highlights */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Facebook Terms of Service (Demo)</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setHighlightsVisible(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              This is a demonstration of how inline highlights would appear on actual policy pages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose max-w-none">
              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h3>2. Arbitration Clause</h3>
              <p className="relative">
                <span 
                  className="bg-risk-high/20 border-l-4 border-risk-high px-2 py-1 cursor-pointer hover:bg-risk-high/30 transition-colors"
                  onClick={() => setSelectedClause('clause-1')}
                >
                  Any disputes arising under this agreement must be resolved through binding arbitration rather than in court.
                </span>
                <Badge 
                  variant="destructive" 
                  className="ml-2 cursor-pointer"
                  onClick={() => setSelectedClause('clause-1')}
                >
                  🚨 Arbitration
                </Badge>
              </p>

              <h3>3. Data Collection</h3>
              <p className="relative">
                <span 
                  className="bg-risk-caution/20 border-l-4 border-risk-caution px-2 py-1 cursor-pointer hover:bg-risk-caution/30 transition-colors"
                  onClick={() => setSelectedClause('clause-2')}
                >
                  We collect personal information including your name, email address, IP address, browsing history, and device information.
                </span>
                <Badge 
                  variant="secondary" 
                  className="ml-2 cursor-pointer"
                  onClick={() => setSelectedClause('clause-2')}
                >
                  ⚠️ Data Collection
                </Badge>
              </p>

              <h3>4. Data Sharing</h3>
              <p className="relative">
                <span 
                  className="bg-risk-high/20 border-l-4 border-risk-high px-2 py-1 cursor-pointer hover:bg-risk-high/30 transition-colors"
                  onClick={() => setSelectedClause('clause-3')}
                >
                  We may share your personal data with third-party partners for marketing and analytics purposes.
                </span>
                <Badge 
                  variant="destructive" 
                  className="ml-2 cursor-pointer"
                  onClick={() => setSelectedClause('clause-3')}
                >
                  🚨 Data Sharing
                </Badge>
              </p>

              <h3>5. Service Changes</h3>
              <p className="relative">
                <span 
                  className="bg-risk-caution/20 border-l-4 border-risk-caution px-2 py-1 cursor-pointer hover:bg-risk-caution/30 transition-colors"
                  onClick={() => setSelectedClause('clause-4')}
                >
                  We reserve the right to modify or discontinue the service at any time without notice.
                </span>
                <Badge 
                  variant="secondary" 
                  className="ml-2 cursor-pointer"
                  onClick={() => setSelectedClause('clause-4')}
                >
                  ⚠️ Service Changes
                </Badge>
              </p>

              <h3>6. Liability Limitation</h3>
              <p>
                In no event shall the company be liable for any indirect, incidental, special, consequential or punitive damages.
              </p>

              <h3>7. Termination</h3>
              <p className="relative">
                <span 
                  className="bg-risk-high/20 border-l-4 border-risk-high px-2 py-1 cursor-pointer hover:bg-risk-high/30 transition-colors"
                  onClick={() => setSelectedClause('clause-5')}
                >
                  We may terminate your account at any time for any reason without prior notice.
                </span>
                <Badge 
                  variant="destructive" 
                  className="ml-2 cursor-pointer"
                  onClick={() => setSelectedClause('clause-5')}
                >
                  🚨 Account Termination
                </Badge>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Detail Panel */}
      {selectedClause && (
        <div className="fixed bottom-4 right-4 w-96 z-50">
          <Card className="shadow-elegant">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Risk Detail
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedClause(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {(() => {
                const clause = mockClauses.find(c => c.id === selectedClause);
                if (!clause) return null;
                
                return (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getRiskBadgeVariant(clause.riskLevel)}>
                        {getRiskEmoji(clause.riskLevel)} {clause.category}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-1">What this means:</h4>
                      <p className="text-sm text-muted-foreground">
                        {clause.description}
                      </p>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium text-sm mb-1 flex items-center">
                        <Info className="mr-1 h-3 w-3" />
                        Original Text:
                      </h4>
                      <p className="text-xs text-muted-foreground italic">
                        "{clause.text}"
                      </p>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Highlights Legend */}
      <div className="fixed top-20 right-4 z-40">
        <Card className="w-64 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Risk Highlights</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-risk-high rounded"></div>
              <span>High Risk - Review carefully</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-risk-caution rounded"></div>
              <span>Medium Risk - Worth noting</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-risk-safe rounded"></div>
              <span>Low Risk - Generally safe</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default InlineHighlights;