'use client';

import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useMemo, useRef } from 'react';
import { signOut } from 'next-auth/react';
import AuthModal from './auth/AuthModal';

export default function Header({ isPrivate = false }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // Get current path for active link
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null); // Ref for mobile menu for click outside
  const isHomePage = pathname === '/';

  const navigation = useMemo(() => {
    const base = [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Contact', href: '/contact' },
    ];
    if (status === 'authenticated') {
      base.push({ name: 'Projects', href: '/projects' });
      if (isPrivate) {
        base.push({ name: 'Request Project', href: '/projects/request' });
      }
    }
    return base;
  }, [status, isPrivate]);

  const handleLogout = async () => {
    try {
      // First clear the session
      await signOut({
        callbackUrl: '/',
        redirect: false // We'll handle the redirect manually
      });
      // Force a full page reload to clear any client-side state
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      // Still redirect even if there's an error
      window.location.href = '/';
    }
  };

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50); // Scrolled after 50px
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);


  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen || !isHomePage 
        ? 'bg-white/95 backdrop-blur-md shadow-lg text-gray-900' 
        : 'bg-transparent text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a 
            href="/" 
            className={`text-2xl font-extrabold tracking-tight transition-colors duration-200 ${
              isScrolled || isMobileMenuOpen || !isHomePage 
                ? 'text-gray-900 hover:text-blue-600' 
                : 'text-white hover:text-blue-200'
            }`}
          >
            HPM Tech
          </a>
        </div>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex items-center space-x-7">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative py-2 text-base font-medium transition-colors duration-200 group
                  ${
                    isScrolled || isMobileMenuOpen || !isHomePage
                      ? isActive
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                      : isActive
                      ? 'text-blue-200'
                      : 'text-white hover:text-blue-200'
                  }`}
              >
                {item.name}
                <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform origin-bottom transition-transform duration-200
                  ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </a>
            );
          })}
        </nav>

        {/* Auth & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Desktop Auth Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <div className="relative group cursor-pointer" onClick={() => router.push('/profile')}>
                  <div className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white w-9 h-9 text-base font-semibold shadow-md ring-2 ring-blue-500 ring-opacity-50 group-hover:ring-blue-700 transition-all duration-200">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {session?.user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Logout"
                  title="Logout"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-600" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2 border border-transparent text-sm font-semibold rounded-full shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
              >
                Sign In
                <ArrowRightOnRectangleIcon className="h-5 w-5 -mr-1" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200 ${
              isScrolled || isMobileMenuOpen || !isHomePage 
                ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                : 'text-white hover:bg-white/20'
            }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              title="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (Drawer style) */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-y-0 right-0 w-64 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ zIndex: 100 }}
      >
        <div className="flex justify-end p-4">
          <button
            type="button"
            className="rounded-md p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsMobileMenuOpen(false)}
            title="Close menu"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="px-4 py-2 flex flex-col h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] bg-white">
          <div className="flex-1 space-y-2 overflow-y-auto pb-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : (isScrolled || isMobileMenuOpen || !isHomePage 
                          ? 'text-gray-700 hover:bg-gray-50 hover:text-blue-600' 
                          : 'text-white hover:bg-white/10 hover:text-white')
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
          
          {/* Mobile Auth actions */}
          {session?.user ? (
            <div className="border-t border-gray-200 pt-4 pb-6 mt-4">
              <div 
                onClick={() => {
                  router.push('/profile');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
              >
                <div className="mr-3 flex-shrink-0 h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-base font-semibold">
                  {session.user.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{session.user.name || 'User'}</p>
                  <p className="text-sm text-gray-500">View Profile</p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-3 w-full flex items-center justify-start px-3 py-2.5 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5" />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-gray-50 transition-colors duration-200"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}