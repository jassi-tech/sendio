import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table = ({ children, className = '' }: TableProps) => (
  <div className={`w-full overflow-x-auto rounded-s-12 border border-border ${className}`}>
    <table className="w-full border-collapse text-left text-s-14">
      {children}
    </table>
  </div>
);

export const THead = ({ children, className = '' }: TableProps) => (
  <thead className={`bg-bg-elevated/50 border-b border-border ${className}`}>
    {children}
  </thead>
);

export const TBody = ({ children, className = '' }: TableProps) => (
  <tbody className={`divide-y divide-border/40 ${className}`}>
    {children}
  </tbody>
);

export const TR = ({ children, className = '', onClick }: TableProps & { onClick?: () => void }) => (
  <tr 
    className={`transition-colors h-s-56 ${onClick ? 'cursor-pointer hover:bg-bg-hover' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </tr>
);

export const TH = ({ children, className = '' }: TableProps) => (
  <th className={`px-s-20 py-s-14 font-semibold text-text-secondary uppercase tracking-wider text-s-11 ${className}`}>
    {children}
  </th>
);

export const TD = ({ children, className = '' }: TableProps) => (
  <td className={`px-s-20 py-s-14 text-text-primary ${className}`}>
    {children}
  </td>
);
