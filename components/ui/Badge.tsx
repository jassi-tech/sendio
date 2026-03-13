import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'accent' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge = ({
  children,
  variant = 'neutral',
  icon,
  className = '',
}: BadgeProps) => {
  const variants = {
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    error: 'bg-error/10 text-error border-error/20',
    info: 'bg-info/10 text-info border-info/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    neutral: 'bg-bg-elevated text-text-secondary border-border',
  };

  return (
    <span className={`inline-flex items-center gap-s-4 px-s-8 py-s-2 rounded-s-4 text-s-11 font-bold border ${variants[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
