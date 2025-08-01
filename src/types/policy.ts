// Core types for policy analysis platform

export type RiskLevel = 'safe' | 'caution' | 'high';

export interface PolicyClause {
  id: string;
  text: string;
  riskLevel: RiskLevel;
  category: string;
  description: string;
  position: {
    start: number;
    end: number;
  };
}

export interface PolicyDocument {
  id: string;
  title: string;
  url: string;
  content: string;
  riskScore: number;
  clauses: PolicyClause[];
  version: number;
  scanDate: Date;
  status: 'processed' | 'processing' | 'failed';
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  scanDate: Date;
  riskScore: number;
  changes: string[];
  clausesAdded: number;
  clausesRemoved: number;
  clausesModified: number;
}

export interface AlertSettings {
  emailAlerts: boolean;
  riskThreshold: RiskLevel;
  documentUpdates: boolean;
  weeklyDigest: boolean;
}