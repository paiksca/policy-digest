import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { mockDocuments, mockClauses } from '@/data/mockData';
import { 
  Scan, 
  AlertTriangle, 
  Shield, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp,
  FileText,
  Eye,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock current page detection
const mockCurrentPage = {
  url: 'https://facebook.com/terms',
  title: 'Facebook Terms of Service',
  hasPolicy: true
};

const ExtensionPopup = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [expandedClause, setExpandedClause] = useState<string | null>(null);
  const { toast } = useToast();

  // Use mock data for current document
  const currentDoc = mockDocuments[0]; // Facebook ToS
  const topClauses = mockClauses.slice(0, 3);

  const handleScan = async () => {
    setIsScanning(true);
    
    // Simulate scanning process
    toast({
      title: 'Scanning Started',
      description: 'Analyzing policy document...',
    });

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      toast({
        title: 'Scan Complete',
        description: `Found ${topClauses.length} concerning clauses`,
      });
    }, 2000);
  };

  const toggleClauseExpansion = (clauseId: string) => {
    setExpandedClause(expandedClause === clauseId ? null : clauseId);
  };

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'destructive';
      case 'caution': return 'secondary';
      case 'safe': return 'default';
      default: return 'default';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return <AlertTriangle className="h-3 w-3" />;
      case 'caution': return <AlertTriangle className="h-3 w-3" />;
      case 'safe': return <Shield className="h-3 w-3" />;
      default: return <Shield className="h-3 w-3" />;
    }
  };

  return (
    <div className="w-96 max-h-[600px] overflow-y-auto">
      {/* Extension Header */}
      <div className="bg-gradient-primary p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span className="font-semibold">Policy Digest</span>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Page Detection */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Current Page</span>
              </div>
              {mockCurrentPage.hasPolicy && (
                <Badge variant="default" className="text-xs">
                  Policy Detected
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm">
              <p className="font-medium truncate">{mockCurrentPage.title}</p>
              <p className="text-muted-foreground text-xs truncate">{mockCurrentPage.url}</p>
            </div>
          </CardContent>
        </Card>

        {/* Scan Button */}
        {!scanComplete ? (
          <Button 
            onClick={handleScan} 
            disabled={isScanning || !mockCurrentPage.hasPolicy}
            className="w-full"
            variant="hero"
          >
            {isScanning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Scanning...
              </>
            ) : (
              <>
                <Scan className="mr-2 h-4 w-4" />
                Scan Page
              </>
            )}
          </Button>
        ) : (
          /* Scan Results */
          <>
            {/* Risk Score Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  Risk Assessment
                  <Badge variant={currentDoc.riskScore > 70 ? 'destructive' : 'secondary'}>
                    {currentDoc.riskScore}% Risk
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <Progress value={currentDoc.riskScore} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  {currentDoc.riskScore > 70 
                    ? 'High risk policy with concerning clauses'
                    : currentDoc.riskScore > 40 
                    ? 'Moderate risk with some concerns' 
                    : 'Low risk policy'
                  }
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{currentDoc.clauses.length} clauses analyzed</span>
                  <span>{topClauses.filter(c => c.riskLevel === 'high').length} high risk</span>
                </div>
              </CardContent>
            </Card>

            {/* Top Risk Clauses */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Top Concerns</CardTitle>
                <CardDescription className="text-sm">
                  Most important clauses to review
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {topClauses.map((clause, index) => (
                  <div key={clause.id} className="space-y-2">
                    <div 
                      className="flex items-center justify-between p-2 rounded-lg border cursor-pointer hover:bg-muted/50"
                      onClick={() => toggleClauseExpansion(clause.id)}
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <Badge 
                          variant={getRiskBadgeVariant(clause.riskLevel)}
                          className="text-xs px-1.5 py-0.5"
                        >
                          {getRiskIcon(clause.riskLevel)}
                        </Badge>
                        <span className="text-sm font-medium truncate">
                          {clause.category}
                        </span>
                      </div>
                      {expandedClause === clause.id ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    
                    {expandedClause === clause.id && (
                      <div className="pl-4 pr-2 space-y-2">
                        <p className="text-xs text-muted-foreground italic">
                          "{clause.text.substring(0, 100)}..."
                        </p>
                        <p className="text-xs">
                          {clause.description}
                        </p>
                      </div>
                    )}
                    
                    {index < topClauses.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={currentDoc.url} target="_blank" rel="noopener noreferrer">
                  <Eye className="mr-1 h-3 w-3" />
                  View Full
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/dashboard" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Dashboard
                </a>
              </Button>
            </div>

            {/* Inline Highlights Toggle */}
            <Card className="bg-muted/50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="font-medium">Inline Highlights</p>
                    <p className="text-xs text-muted-foreground">
                      Show risk badges on page
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Extension Info */}
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            Policy Digest Extension v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtensionPopup;