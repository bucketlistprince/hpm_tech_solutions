'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SessionProvider } from 'next-auth/react';

export default function LayoutWrapper({ children }) {
  return (
    <SessionProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </SessionProvider>
  );
}
