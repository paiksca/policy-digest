import React from 'react';
import InlineHighlights from '@/components/extension/InlineHighlights';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExtensionDemo = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Extension Demo</h1>
            <p className="text-sm text-muted-foreground">
              See how Policy Digest highlights risks in real policy documents
            </p>
          </div>
        </div>
      </div>
      
      <InlineHighlights />
    </div>
  );
};

export default ExtensionDemo;