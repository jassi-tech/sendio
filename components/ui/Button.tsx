import React from 'react';
import { Loader2 } from 'lucide-react';
import type { ButtonProps } from '@/lib/interface';


export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 no-underline';
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-dim shadow-accent-glow border-none',
    secondary: 'bg-bg-elevated text-text-primary border border-border hover:border-accent hover:bg-bg-hover',
    danger: 'bg-error/10 text-error border border-error/20 hover:bg-error/20',
    ghost: 'bg-transparent text-text-secondary hover:bg-bg-hover hover:text-text-primary border-none',
    outline: 'bg-transparent border border-border text-text-primary hover:border-accent hover:bg-accent/5',
  };

  const sizes = {
    sm: 'px-s-12 py-s-6 text-s-12 rounded-s-6 gap-s-6',
    md: 'px-s-18 py-s-10 text-s-14 rounded-s-8 gap-s-8',
    lg: 'px-s-24 py-s-14 text-s-16 rounded-s-10 gap-s-10',
    icon: 'p-s-8 rounded-s-6',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin w-[1.25em] h-[1.25em]" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};
