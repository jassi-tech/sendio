import React from 'react';
import type { CardProps } from '@/lib/interface';


export const Card = ({
  children,
  variant = 'solid',
  className = '',
  padded = true,
  hoverable = false,
}: CardProps) => {
  const baseStyles = 'border border-border rounded-s-12 transition-all';
  
  const variants = {
    solid: 'bg-bg-card',
    glass: 'glass',
    elevated: 'bg-bg-elevated border-border-dim shadow-lg',
  };

  const interactive = hoverable ? 'hover:border-accent/40 hover:shadow-accent-glow hover:-translate-y-s-2' : '';
  const padding = padded ? 'p-s-24 md:p-s-32' : '';

  return (
    <div className={`${baseStyles} ${variants[variant]} ${interactive} ${padding} ${className}`}>
      {children}
    </div>
  );
};
