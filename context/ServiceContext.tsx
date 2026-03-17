'use client';

import React, { createContext, useContext, useState } from 'react';

interface ServiceContextType {
  activeServiceId: string | null;
  setActiveServiceId: (id: string | null) => void;
}

const ServiceContext = createContext<ServiceContextType>({
  activeServiceId: null,
  setActiveServiceId: () => {},
});

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  return (
    <ServiceContext.Provider value={{ activeServiceId, setActiveServiceId }}>
      {children}
    </ServiceContext.Provider>
  );
}

export const useServiceContext = () => useContext(ServiceContext);