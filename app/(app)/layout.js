'use client';

import { SessionProvider } from 'next-auth/react';

export default function AppLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
