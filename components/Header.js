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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="text-2xl font-extrabold text-gray-900 tracking-tight hover:text-blue-600 transition-colors duration-200">
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
                  ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
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
          {session ? (
            <div className="flex items-center gap-3">
              <div className="relative group cursor-pointer" onClick={() => router.push('/profile')}> {/* Added onClick for profile */}
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
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2 border border-transparent text-sm font-semibold rounded-full shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
            >
              Sign In
              <ArrowRightOnRectangleIcon className="h-5 w-5 -mr-1" />
            </button>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
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
        className={`fixed inset-y-0 right-0 w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
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
        <div className="px-4 py-2 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                  ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            );
          })}
          {/* Mobile Auth actions */}
          {!session && (
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