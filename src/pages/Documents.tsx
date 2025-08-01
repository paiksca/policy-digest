import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockDocuments } from '@/data/mockData';
import { 
  FileText, 
  Search, 
  Filter, 
  ExternalLink, 
  History, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Loader
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.url.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRisk = riskFilter === 'all' || 
                       (riskFilter === 'high' && doc.riskScore > 70) ||
                       (riskFilter === 'medium' && doc.riskScore >= 40 && doc.riskScore <= 70) ||
                       (riskFilter === 'low' && doc.riskScore < 40);
    
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    
    return matchesSearch && matchesRisk && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed': return <CheckCircle className="h-4 w-4 text-risk-safe" />;
      case 'processing': return <Loader className="h-4 w-4 text-risk-caution animate-spin" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-risk-high" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed': return <Badge variant="default">Processed</Badge>;
      case 'processing': return <Badge variant="secondary">Processing</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRiskBadge = (riskScore: number) => {
    if (riskScore > 70) return <Badge variant="destructive">{riskScore}% High Risk</Badge>;
    if (riskScore >= 40) return <Badge variant="secondary">{riskScore}% Medium Risk</Badge>;
    return <Badge variant="default">{riskScore}% Low Risk</Badge>;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Manage and analyze your policy documents
          </p>
        </div>
        <Button variant="hero" asChild>
          <Link to="/extension">
            <FileText className="mr-2 h-4 w-4" />
            Scan New Document
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Risk Level</label>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="high">High Risk (70%+)</SelectItem>
                  <SelectItem value="medium">Medium Risk (40-70%)</SelectItem>
                  <SelectItem value="low">Low Risk (&lt;40%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">&nbsp;</label>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredDocuments.length} of {mockDocuments.length} documents
        </p>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    {getStatusIcon(doc.status)}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">{doc.title}</h3>
                      {getStatusBadge(doc.status)}
                    </div>
                    
                    <p className="text-sm text-muted-foreground truncate">
                      {doc.url}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Scanned {formatDistanceToNow(doc.scanDate)} ago</span>
                      </div>
                      <span>•</span>
                      <span>Version {doc.version}</span>
                      <span>•</span>
                      <span>{doc.clauses.length} clauses</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    {getRiskBadge(doc.riskScore)}
                    <p className="text-xs text-muted-foreground mt-1">
                      Risk Score
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    {doc.status === 'processed' && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/documents/${doc.id}/history`}>
                          <History className="h-3 w-3 mr-1" />
                          History
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Risk Preview */}
              {doc.status === 'processed' && doc.clauses.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Top Risk Factors</span>
                    <span className="text-xs text-muted-foreground">
                      {doc.clauses.filter(c => c.riskLevel === 'high').length} high risk clauses
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {doc.clauses.slice(0, 3).map((clause) => (
                      <Badge 
                        key={clause.id}
                        variant={clause.riskLevel === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {clause.category}
                      </Badge>
                    ))}
                    {doc.clauses.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{doc.clauses.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No documents found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || riskFilter !== 'all' || statusFilter !== 'all'
                ? 'No documents match your current filters.'
                : 'Start by scanning your first policy document.'
              }
            </p>
            <Button variant="hero" asChild>
              <Link to="/extension">
                Scan Your First Document
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Documents;