import React from "react";

// ──────────────────────────────────────────────
// Auth
// ──────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name?: string;
  publicKey?: string;
  privateKey?: string;
}

export interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

// ──────────────────────────────────────────────
// Services (SMTP providers catalogue)
// ──────────────────────────────────────────────
export interface ServiceDef {
  id: string;
  name: string;
  category: "personal" | "transactional";
  smtpHost?: string;
  smtpPort?: number;
  smtpSecure?: boolean;
  isSelectable: boolean;
  logoUrl?: string;
}

// ──────────────────────────────────────────────
// Senders / SMTP Configs
// ──────────────────────────────────────────────
export interface SmtpConfig {
  _id: string;
  label: string;
  host: string;
  port: number;
  fromEmail: string;
  fromName: string;
  isDefault: boolean;
  user: string;
  secure: boolean;
}

// ──────────────────────────────────────────────
// Dashboard Stats
// ──────────────────────────────────────────────
export interface Stat {
  label: string;
  value: number;
  icon: React.ElementType;
  variant: "success" | "error" | "warning" | "accent" | "info";
}

// ──────────────────────────────────────────────
// UI Component Props
// ──────────────────────────────────────────────
export interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "accent" | "neutral";
  icon?: React.ReactNode;
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export interface CardProps {
  children: React.ReactNode;
  variant?: "solid" | "glass" | "elevated";
  className?: string;
  padded?: boolean;
  hoverable?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  label?: string;
  error?: string;
  multiline?: boolean;
}

export interface TableProps {
  children: React.ReactNode;
  className?: string;
}

// ──────────────────────────────────────────────
// API Keys
// ──────────────────────────────────────────────
export interface ApiKeyItem {
  _id: string;
  label: string;
  keyPrefix: string;
  isActive: boolean;
  lastUsedAt?: string;
  createdAt: string;
  smtpConfigId: { label: string; fromEmail: string } | null;
}

export interface ApiKeySmtpConfig {
  _id: string;
  label: string;
  fromEmail: string;
}

// ──────────────────────────────────────────────
// Logs
// ──────────────────────────────────────────────
export type Status = "queued" | "sending" | "sent" | "failed";

export interface LogItem {
  _id: string;
  to: string | string[];
  subject: string;
  status: Status;
  queuedAt: string;
  sentAt?: string;
  errorMessage?: string;
  createdAt: string;
  smtpConfigId?: { label: string; fromEmail: string };
  apiKeyId?: { label: string; keyPrefix: string };
}

// ──────────────────────────────────────────────
// Services
// ──────────────────────────────────────────────
export interface SmtpService {
  id: string;
  provider: string;
  serviceId?: string;
  name?: string;
  isDefault?: boolean;
}

export interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (service: import("./interface").ServiceDef) => void;
}

export interface ConfigServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceDef: import("./interface").ServiceDef | null;
  onCreated?: () => void;
}

export interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: SmtpService | null;
  onUpdate?: () => void;
}

// ──────────────────────────────────────────────
// Templates
// ──────────────────────────────────────────────
export interface Template {
  _id?: string;
  templateId: string;
  name: string;
  subject: string;
  variables: string[];
  updatedAt: string;
  isDefault?: boolean;
}

export interface FullTemplate extends Template {
  html: string;
}
