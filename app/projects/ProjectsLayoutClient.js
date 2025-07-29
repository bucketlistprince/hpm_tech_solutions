'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AuthModal from '../../components/auth/AuthModal';

export default function ProjectsLayoutClient({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
    }
    setHasCheckedSession(true);
  }, [status, session]);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleClose = () => {
    // Navigate to homepage when the modal is closed or dismissed
    router.push('/');
  };

  if (status === 'loading' || !hasCheckedSession) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleClose}
        onAuthSuccess={handleAuthSuccess}
      />
      {!showAuthModal && (
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        }>
          {children}
        </Suspense>
      )}
    </>
  );
}
