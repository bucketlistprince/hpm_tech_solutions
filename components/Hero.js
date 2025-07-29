'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AuthModal from './auth/AuthModal';

export default function Hero() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const router = useRouter();
  const { data: authSession } = useSession();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background with Multiple Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-transparent" />
        
        {/* Animated Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(59, 130, 246)" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative flex items-center justify-center min-h-screen py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full px-6 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-8 hover:bg-white/20 transition-all duration-300 group">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">✨ Next-Gen Solutions</span>
              <svg className="ml-2 h-4 w-4 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-8">
              <span className="block text-white">Transform Your</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient bg-300% bg-pos-0 hover:bg-pos-100 transition-all duration-1000">
                Digital Future
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
              HPM Tech Solutions empowers businesses to thrive in the digital age through 
              <span className="text-cyan-400 font-semibold"> innovative web applications</span>, 
              <span className="text-blue-400 font-semibold"> mobile solutions</span>, and 
              <span className="text-purple-400 font-semibold"> custom software development</span>.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              {authSession ? (
                <a
                  href="/projects/request"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/projects/request');
                  }}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 transform"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    Request Project Now
                    <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 transform"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    Get Started Now
                    <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              )}

              <a
                href="#features"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 transform"
              >
                <svg className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1a3 3 0 000-6h-1m2.5 9.5v1a3 3 0 01-3-3v-1m7 1V9a3 3 0 00-3-3" />
                </svg>
                Explore Solutions
              </a>
            </div>

            {/* Stats or Social Proof */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-gray-400 mt-1">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">99%</div>
                <div className="text-sm text-gray-400 mt-1">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-gray-400 mt-1">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .bg-300\% { background-size: 300%; }
        .bg-pos-0 { background-position: 0% 50%; }
        .bg-pos-100 { background-position: 100% 50%; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
    <AuthModal
      isOpen={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
    />
  </div>
  );
}