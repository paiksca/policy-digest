import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockDocuments, mockVersions } from '@/data/mockData';
import { 
  ArrowLeft, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';

const DocumentHistory = () => {
  const { documentId } = useParams();
  const document = mockDocuments.find(doc => doc.id === documentId);
  const versions = mockVersions.filter(ver => ver.documentId === documentId);

  if (!document) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Document Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The document you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getRiskTrend = (currentScore: number, previousScore?: number) => {
    if (!previousScore) return null;
    
    if (currentScore > previousScore) {
      return { trend: 'up', icon: TrendingUp, color: 'text-risk-high' };
    } else if (currentScore < previousScore) {
      return { trend: 'down', icon: TrendingDown, color: 'text-risk-safe' };
    } else {
      return { trend: 'same', icon: Minus, color: 'text-muted-foreground' };
    }
  };

  const getChangeIcon = (type: 'added' | 'removed' | 'modified') => {
    switch (type) {
      case 'added': return Plus;
      case 'removed': return Trash2;
      case 'modified': return Edit;
    }
  };

  const getChangeColor = (type: 'added' | 'removed' | 'modified') => {
    switch (type) {
      case 'added': return 'text-risk-safe';
      case 'removed': return 'text-risk-high';
      case 'modified': return 'text-risk-caution';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{document.title}</h1>
            <p className="text-muted-foreground">Version History</p>
          </div>
        </div>
        <Badge variant={document.riskScore > 70 ? 'destructive' : 'secondary'}>
          Current Risk: {document.riskScore}%
        </Badge>
      </div>

      {/* Document Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Document Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{versions.length}</div>
              <p className="text-sm text-muted-foreground">Total Versions</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{document.version}</div>
              <p className="text-sm text-muted-foreground">Current Version</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{document.clauses.length}</div>
              <p className="text-sm text-muted-foreground">Active Clauses</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Version History Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Version Timeline</CardTitle>
          <CardDescription>
            Track changes to this document over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {versions.map((version, index) => {
              const previousVersion = versions[index + 1];
              const riskTrend = getRiskTrend(version.riskScore, previousVersion?.riskScore);
              const TrendIcon = riskTrend?.icon;

              return (
                <div key={version.id} className="relative">
                  {/* Timeline line */}
                  {index < versions.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-20 bg-border"></div>
                  )}
                  
                  <div className="flex space-x-4">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">v{version.version}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="bg-card border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              {format(version.scanDate, 'MMM d, yyyy')}
                            </span>
                            {version.version === document.version && (
                              <Badge variant="default">Current</Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">Risk Score: {version.riskScore}%</span>
                            {TrendIcon && (
                              <TrendIcon className={`h-4 w-4 ${riskTrend?.color}`} />
                            )}
                          </div>
                        </div>
                        
                        {/* Changes Summary */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Plus className={`h-4 w-4 ${getChangeColor('added')}`} />
                            <span className="text-sm">
                              {version.clausesAdded} added
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Edit className={`h-4 w-4 ${getChangeColor('modified')}`} />
                            <span className="text-sm">
                              {version.clausesModified} modified
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Trash2 className={`h-4 w-4 ${getChangeColor('removed')}`} />
                            <span className="text-sm">
                              {version.clausesRemoved} removed
                            </span>
                          </div>
                        </div>
                        
                        {/* Change Details */}
                        {version.changes.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2 flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Key Changes
                            </h4>
                            <ul className="space-y-1">
                              {version.changes.map((change, changeIndex) => (
                                <li key={changeIndex} className="text-sm text-muted-foreground flex items-start">
                                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                  {change}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Risk Analysis Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Analysis Trends</CardTitle>
          <CardDescription>
            How the risk profile has evolved
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Risk Score Trend</h4>
                <div className="text-2xl font-bold mb-1">
                  {document.riskScore > versions[1]?.riskScore ? '+' : ''}
                  {document.riskScore - (versions[1]?.riskScore || 0)}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Since last version
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Clause Changes</h4>
                <div className="text-2xl font-bold mb-1">
                  {versions.reduce((acc, v) => acc + v.clausesAdded + v.clausesModified, 0)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Total modifications
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3">Most Concerning Changes</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Added mandatory arbitration clause</span>
                  <Badge variant="destructive">High Risk</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Expanded data sharing permissions</span>
                  <Badge variant="destructive">High Risk</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Removed user notification requirements</span>
                  <Badge variant="secondary">Medium Risk</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentHistory;