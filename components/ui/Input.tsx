import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement & HTMLTextAreaElement, InputProps>(
  ({ label, error, multiline, className = '', ...props }, ref) => {
    const Component = multiline ? 'textarea' : 'input';
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-s-12 font-semibold text-text-secondary mb-s-6 ml-s-2">
            {label}
          </label>
        )}
        <Component
          ref={ref as any}
          className={`
            w-full bg-bg-elevated border rounded-s-8 text-text-primary text-s-14 outline-none transition-all
            px-s-14 py-s-11 placeholder:text-text-muted
            ${error ? 'border-error ring-1 ring-error/20' : 'border-border focus:border-accent focus:ring-1 focus:ring-accent/20'}
            ${multiline ? 'min-h-s-100 resize-y' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="block mt-s-4 text-s-11 text-error font-medium ml-s-2">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
