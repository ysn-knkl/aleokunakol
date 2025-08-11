import React, { useEffect, useState, ReactNode } from 'react';

const ClientOnly: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
};

export default ClientOnly;