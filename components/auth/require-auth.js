'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

export default function RequireAuth({ children }) {
  const { data: session, status } = useSession();
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
    setShowAuthModal(false);
  };

  if (status === 'loading' || !hasCheckedSession) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={handleClose}
          onAuthSuccess={handleAuthSuccess}
        />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to view this page.</p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
}
