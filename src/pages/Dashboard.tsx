import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockDocuments, getRiskColor, getRiskLabel } from '@/data/mockData';
import { FileText, AlertTriangle, Clock, ExternalLink, History, Scan } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Dashboard = () => {
  const recentDocuments = mockDocuments.slice(0, 3);
  const totalDocuments = mockDocuments.length;
  const avgRiskScore = Math.round(mockDocuments.reduce((acc, doc) => acc + doc.riskScore, 0) / totalDocuments);
  const highRiskDocs = mockDocuments.filter(doc => doc.riskScore > 70).length;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your policy documents and risk assessments
          </p>
        </div>
        <Button variant="hero" asChild>
          <Link to="/extension">
            <Scan className="mr-2 h-4 w-4" />
            Scan New Document
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
            <p className="text-xs text-muted-foreground">
              3 processed this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Risk Score</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRiskScore}%</div>
            <Progress value={avgRiskScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Documents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-risk-high" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-risk-high">{highRiskDocs}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>
                Latest policy documents you've analyzed
              </CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link to="/documents">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Scanned {formatDistanceToNow(doc.scanDate)} ago</span>
                      <span>•</span>
                      <span>Version {doc.version}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Risk Score:</span>
                      <Badge variant={doc.riskScore > 70 ? 'destructive' : doc.riskScore > 40 ? 'secondary' : 'default'}>
                        {doc.riskScore}%
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {doc.clauses.length} clauses analyzed
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/documents/${doc.id}/history`}>
                        <History className="h-3 w-3 mr-1" />
                        History
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Analysis Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>
              Breakdown of risk levels across your documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-risk-safe rounded"></div>
                  <span>Low Risk (0-40%)</span>
                </div>
                <span className="font-medium">1 document</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-risk-caution rounded"></div>
                  <span>Medium Risk (41-70%)</span>
                </div>
                <span className="font-medium">1 document</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-risk-high rounded"></div>
                  <span>High Risk (71-100%)</span>
                </div>
                <span className="font-medium">2 documents</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Risk Factors</CardTitle>
            <CardDescription>
              Most frequent concerning clauses found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Mandatory Arbitration</span>
                <Badge variant="destructive">High</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Broad Data Sharing</span>
                <Badge variant="destructive">High</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Account Termination</span>
                <Badge variant="secondary">Medium</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Service Changes</span>
                <Badge variant="secondary">Medium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;