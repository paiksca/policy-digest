import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Shield, 
  FileText, 
  AlertTriangle, 
  Eye, 
  Zap, 
  Brain,
  CheckCircle,
  ArrowRight,
  Users,
  Globe
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full">
                <Shield className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Policy Digest
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              AI-powered analysis of Terms of Service, Privacy Policies, and contracts. 
              Understand the risks before you click "I Agree".
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button size="lg" variant="hero" asChild>
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" variant="hero" asChild>
                    <Link to="/auth">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                    <Link to="/extension-demo">
                      Try Extension Demo
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Protect Yourself with AI Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI analyzes policy documents to identify concerning clauses 
              and potential risks before you agree to terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Risk Assessment</CardTitle>
                <CardDescription>
                  Advanced machine learning identifies concerning clauses and assigns risk scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-risk-safe" />
                    <span className="text-sm">Arbitration clause detection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-risk-safe" />
                    <span className="text-sm">Data sharing analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-risk-safe" />
                    <span className="text-sm">Liability limitation review</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Browser Extension</CardTitle>
                <CardDescription>
                  Analyze policies in real-time with our lightweight browser extension
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-risk-safe" />
                    <span className="text-sm">One-click page scanning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-risk-safe" />
                    <span className="text-sm">Inline risk highlights</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-risk-safe" />
                    <span className="text-sm">Instant risk summary</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Document Tracking</CardTitle>
                <CardDescription>
                  Monitor policy changes over time and get alerted to important updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-risk-safe" />
                    <span className="text-sm">Version history tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-risk-safe" />
                    <span className="text-sm">Change notifications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-risk-safe" />
                    <span className="text-sm">Risk trend analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Risk Examples Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Common Risks We Detect
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Here are some of the concerning clauses our AI identifies in policy documents
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Mandatory Arbitration</CardTitle>
                  <Badge variant="destructive">High Risk</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic mb-3">
                  "Any disputes arising under this agreement must be resolved through binding arbitration..."
                </p>
                <p className="text-sm">
                  This clause prevents you from taking the company to court and may limit your legal rights significantly.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Broad Data Sharing</CardTitle>
                  <Badge variant="destructive">High Risk</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic mb-3">
                  "We may share your personal data with third-party partners for marketing purposes..."
                </p>
                <p className="text-sm">
                  Your personal information could be shared widely with unknown third parties for commercial use.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Unilateral Changes</CardTitle>
                  <Badge variant="secondary">Medium Risk</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic mb-3">
                  "We reserve the right to modify these terms at any time without notice..."
                </p>
                <p className="text-sm">
                  The company can change the rules without telling you, potentially affecting your rights.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Account Termination</CardTitle>
                  <Badge variant="secondary">Medium Risk</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic mb-3">
                  "We may terminate your account at any time for any reason without prior notice..."
                </p>
                <p className="text-sm">
                  Your account and access to services could be terminated without warning or explanation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <p className="text-muted-foreground">Documents Analyzed</p>
            </div>
            <div>
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <p className="text-muted-foreground">Websites Supported</p>
            </div>
            <div>
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <p className="text-muted-foreground">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop Agreeing to Terms You Don't Understand
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of users who are taking control of their digital rights 
            with AI-powered policy analysis.
          </p>
          {!user && (
            <Button size="lg" variant="hero" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/auth">
                Start Analyzing Policies Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
