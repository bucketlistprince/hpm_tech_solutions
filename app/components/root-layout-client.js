'use client';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import AuthProvider from '../../components/providers/auth-provider';

export default function RootLayoutClient({ children }) {
  return (
    <AuthProvider>
      <Header />
      <main className="flex-1 min-h-screen">
        {children}
      </main>
      <Footer />
    </AuthProvider>
  );
}
