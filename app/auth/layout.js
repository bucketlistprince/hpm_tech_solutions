import { Metadata } from 'next';
import AuthProvider from '../components/providers/auth-provider';

export const metadata = {
  title: 'Authentication',
  description: 'Login to your account',
};

export default function AuthLayout({
  children,
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}