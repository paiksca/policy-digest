// Mock data for policy analysis platform
import { PolicyDocument, PolicyClause, DocumentVersion, AlertSettings, RiskLevel } from '@/types/policy';

// Sample Terms of Service content for analysis
const sampleTosContent = `
Terms of Service

1. Acceptance of Terms
By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.

2. Arbitration Clause
Any disputes arising under this agreement must be resolved through binding arbitration rather than in court.

3. Data Collection
We collect personal information including your name, email address, IP address, browsing history, and device information.

4. Data Sharing
We may share your personal data with third-party partners for marketing and analytics purposes.

5. Service Changes
We reserve the right to modify or discontinue the service at any time without notice.

6. Liability Limitation
In no event shall the company be liable for any indirect, incidental, special, consequential or punitive damages.

7. Termination
We may terminate your account at any time for any reason without prior notice.

8. Governing Law
This agreement shall be governed by the laws of Delaware.
`;

// Mock policy clauses with risk analysis
export const mockClauses: PolicyClause[] = [
  {
    id: 'clause-1',
    text: 'Any disputes arising under this agreement must be resolved through binding arbitration rather than in court.',
    riskLevel: 'high',
    category: 'Dispute Resolution',
    description: 'Mandatory arbitration clauses limit your right to sue in court and may favor the company.',
    position: { start: 156, end: 256 }
  },
  {
    id: 'clause-2',
    text: 'We collect personal information including your name, email address, IP address, browsing history, and device information.',
    riskLevel: 'caution',
    category: 'Data Collection',
    description: 'Extensive data collection including browsing history and device fingerprinting.',
    position: { start: 280, end: 410 }
  },
  {
    id: 'clause-3',
    text: 'We may share your personal data with third-party partners for marketing and analytics purposes.',
    riskLevel: 'high',
    category: 'Data Sharing',
    description: 'Broad data sharing permissions with third parties for commercial purposes.',
    position: { start: 430, end: 525 }
  },
  {
    id: 'clause-4',
    text: 'We reserve the right to modify or discontinue the service at any time without notice.',
    riskLevel: 'caution',
    category: 'Service Changes',
    description: 'Service can be changed or terminated without user notification.',
    position: { start: 550, end: 635 }
  },
  {
    id: 'clause-5',
    text: 'We may terminate your account at any time for any reason without prior notice.',
    riskLevel: 'high',
    category: 'Account Termination',
    description: 'Account can be terminated without cause or notice.',
    position: { start: 750, end: 828 }
  }
];

// Mock policy documents
export const mockDocuments: PolicyDocument[] = [
  {
    id: 'doc-1',
    title: 'Facebook Terms of Service',
    url: 'https://facebook.com/terms',
    content: sampleTosContent,
    riskScore: 78,
    clauses: mockClauses,
    version: 3,
    scanDate: new Date('2024-01-15'),
    status: 'processed'
  },
  {
    id: 'doc-2',
    title: 'Google Privacy Policy',
    url: 'https://policies.google.com/privacy',
    content: 'Privacy Policy content...',
    riskScore: 65,
    clauses: mockClauses.slice(0, 3),
    version: 2,
    scanDate: new Date('2024-01-10'),
    status: 'processed'
  },
  {
    id: 'doc-3',
    title: 'Microsoft Service Agreement',
    url: 'https://microsoft.com/servicesagreement',
    content: 'Service Agreement content...',
    riskScore: 42,
    clauses: mockClauses.slice(0, 2),
    version: 1,
    scanDate: new Date('2024-01-08'),
    status: 'processed'
  },
  {
    id: 'doc-4',
    title: 'Spotify Terms and Conditions',
    url: 'https://spotify.com/terms',
    content: 'Processing...',
    riskScore: 0,
    clauses: [],
    version: 1,
    scanDate: new Date(),
    status: 'processing'
  }
];

// Mock document versions for version history
export const mockVersions: DocumentVersion[] = [
  {
    id: 'ver-1',
    documentId: 'doc-1',
    version: 3,
    scanDate: new Date('2024-01-15'),
    riskScore: 78,
    changes: [
      'Added mandatory arbitration clause',
      'Expanded data sharing permissions',
      'Removed user notification requirements'
    ],
    clausesAdded: 2,
    clausesRemoved: 0,
    clausesModified: 3
  },
  {
    id: 'ver-2',
    documentId: 'doc-1',
    version: 2,
    scanDate: new Date('2023-12-01'),
    riskScore: 65,
    changes: [
      'Updated data collection practices',
      'Modified termination conditions'
    ],
    clausesAdded: 1,
    clausesRemoved: 1,
    clausesModified: 2
  },
  {
    id: 'ver-3',
    documentId: 'doc-1',
    version: 1,
    scanDate: new Date('2023-10-15'),
    riskScore: 45,
    changes: ['Initial document scan'],
    clausesAdded: 8,
    clausesRemoved: 0,
    clausesModified: 0
  }
];

// Mock alert settings
export const mockAlertSettings: AlertSettings = {
  emailAlerts: true,
  riskThreshold: 'caution',
  documentUpdates: true,
  weeklyDigest: false
};

// Risk level helpers
export const getRiskColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'safe': return 'risk-safe';
    case 'caution': return 'risk-caution';
    case 'high': return 'risk-high';
  }
};

export const getRiskLabel = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'safe': return 'Low Risk';
    case 'caution': return 'Medium Risk';
    case 'high': return 'High Risk';
  }
};

export const calculateOverallRisk = (clauses: PolicyClause[]): number => {
  if (clauses.length === 0) return 0;
  
  const riskScores = clauses.map(clause => {
    switch (clause.riskLevel) {
      case 'safe': return 20;
      case 'caution': return 60;
      case 'high': return 90;
    }
  });
  
  return Math.round(riskScores.reduce((a, b) => a + b, 0) / clauses.length);
};