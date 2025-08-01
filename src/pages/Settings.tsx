import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAlertSettings } from '@/data/mockData';
import { 
  Bell, 
  Mail, 
  Shield, 
  AlertTriangle, 
  Settings as SettingsIcon,
  User,
  Database,
  Download,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const [alertSettings, setAlertSettings] = useState(mockAlertSettings);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSettingChange = (key: keyof typeof alertSettings, value: any) => {
    setAlertSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: 'Settings Updated',
      description: 'Your preferences have been saved.',
    });
  };

  const handleExportData = () => {
    toast({
      title: 'Export Started',
      description: 'Your data export will be sent to your email.',
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: 'Account Deletion',
      description: 'Please contact support to delete your account.',
      variant: 'destructive'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and notification preferences
        </p>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Account Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Email Address</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {user?.email || 'Not available'}
              </p>
            </div>
            <div>
              <Label>Account Status</Label>
              <div className="mt-1">
                <Badge variant="default">Active</Badge>
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Member Since</Label>
              <p className="text-sm text-muted-foreground mt-1">
                January 2024
              </p>
            </div>
            <div>
              <Label>Documents Analyzed</Label>
              <p className="text-sm text-muted-foreground mt-1">
                4 documents
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Alert Preferences</span>
          </CardTitle>
          <CardDescription>
            Configure when and how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Alerts Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <Label htmlFor="email-alerts">Email Alerts</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for important updates
              </p>
            </div>
            <Switch
              id="email-alerts"
              checked={alertSettings.emailAlerts}
              onCheckedChange={(checked) => handleSettingChange('emailAlerts', checked)}
            />
          </div>

          <Separator />

          {/* Risk Threshold */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <Label>Alert Risk Threshold</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Get notified when documents exceed this risk level
            </p>
            <Select
              value={alertSettings.riskThreshold}
              onValueChange={(value) => handleSettingChange('riskThreshold', value)}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="safe">Low Risk (40%+)</SelectItem>
                <SelectItem value="caution">Medium Risk (60%+)</SelectItem>
                <SelectItem value="high">High Risk (80%+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Document Updates */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="document-updates">Document Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when tracked documents change
              </p>
            </div>
            <Switch
              id="document-updates"
              checked={alertSettings.documentUpdates}
              onCheckedChange={(checked) => handleSettingChange('documentUpdates', checked)}
            />
          </div>

          <Separator />

          {/* Weekly Digest */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="weekly-digest">Weekly Digest</Label>
              <p className="text-sm text-muted-foreground">
                Receive a weekly summary of your document analysis
              </p>
            </div>
            <Switch
              id="weekly-digest"
              checked={alertSettings.weeklyDigest}
              onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Extension Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5" />
            <span>Browser Extension</span>
          </CardTitle>
          <CardDescription>
            Configure how the extension behaves
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Auto-scan Policy Pages</Label>
              <p className="text-sm text-muted-foreground">
                Automatically analyze when you visit policy pages
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Show Inline Highlights</Label>
              <p className="text-sm text-muted-foreground">
                Display risk badges directly on policy pages
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Popup Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Show notifications when high-risk clauses are detected
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacy & Data</span>
          </CardTitle>
          <CardDescription>
            Manage your data and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Anonymous Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Help improve the service with anonymous usage data
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Export My Data
            </Button>
            <Button variant="outline" onClick={handleDeleteAccount}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2 flex items-center">
              <Database className="mr-2 h-4 w-4" />
              Data Storage
            </h4>
            <p className="text-sm text-muted-foreground">
              Your document analysis and settings are stored securely. 
              We do not share your data with third parties. 
              You can export or delete your data at any time.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes */}
      <div className="flex justify-end">
        <Button variant="hero">
          Save All Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;