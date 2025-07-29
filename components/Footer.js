export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    { name: 'Web Development', href: '/services/web' },
    { name: 'Mobile Apps', href: '/services/mobile' },
    { name: 'Custom Software', href: '/services/software' },
    { name: 'AI Solutions', href: '/services/ai' },
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.2),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.15),transparent_70%)]" />
      </div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>

      <div className="relative">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center group mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-black text-white">HPM Tech Solutions</h3>
                  <p className="text-cyan-400 text-sm font-semibold">Innovation Delivered</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
                Empowering businesses with cutting-edge technology solutions that drive growth, 
                innovation, and digital transformation in the modern world.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-8 relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group flex items-center text-gray-300 hover:text-white transition-all duration-300"
                    >
                      <svg className="h-4 w-4 mr-3 text-cyan-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold text-white mb-8 relative">
                Our Services
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </h3>
              <ul className="space-y-4">
                {services.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group flex items-center text-gray-300 hover:text-white transition-all duration-300"
                    >
                      <svg className="h-4 w-4 mr-3 text-purple-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="max-w-md mx-auto text-center lg:max-w-none lg:text-left lg:flex lg:items-center lg:justify-between">
              <div className="lg:flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
                <p className="text-gray-300">Get the latest news and updates delivered to your inbox.</p>
              </div>
              <div className="mt-6 lg:mt-0 lg:ml-12 lg:flex-shrink-0">
                <div className="inline-flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-64 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    />
                  </div>
                  <button className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transform">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">Subscribe</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">
                  © {currentYear} HPM Tech Solutions. All rights reserved.
                </span>
              </div>
              
              <div className="flex items-center space-x-6">
                <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Cookies</a>
              </div>
            </div>
            
            {/* Contact info */}
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <a href="mailto:contact@hpmt.com" className="group flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                  <svg className="h-4 w-4 mr-2 text-cyan-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@hpmt.com
                </a>
                <a href="tel:+15551234567" className="group flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                  <svg className="h-4 w-4 mr-2 text-purple-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </footer>
  );
}