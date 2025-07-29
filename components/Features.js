export default function Features() {
  const features = [
    {
      name: 'Web Development',
      icon: () => (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 01-2 2h-2a2 2 01-2-2z" />
        </svg>
      ),
      description: 'Cutting-edge responsive websites built with React, Next.js, and modern frameworks',
      gradient: 'from-cyan-500 to-blue-600',
      bgGradient: 'from-cyan-50 to-blue-50',
      hoverShadow: 'hover:shadow-cyan-500/25',
    },
    {
      name: 'Mobile Apps',
      icon: () => (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Native iOS & Android apps plus cross-platform solutions with React Native & Flutter',
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-50 to-purple-50',
      hoverShadow: 'hover:shadow-purple-500/25',
    },
    {
      name: 'Custom Software',
      icon: () => (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      description: 'AI-powered enterprise solutions and automation tools to streamline your operations',
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      hoverShadow: 'hover:shadow-pink-500/25',
    },
  ];

  return (
    <div className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.1),transparent_50%)]" />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-cyan-200/30 to-blue-300/30 rounded-2xl rotate-12 blur-sm"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-sm"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-xl -rotate-45 blur-sm"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full px-6 py-2 text-sm font-medium bg-gradient-to-r from-cyan-100 to-blue-100 text-blue-800 mb-8 border border-blue-200">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Our Premium Services
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Solutions That
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Drive Growth
            </span>
          </h2>

          <p className="text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
            We craft bespoke technology solutions that transform businesses and create extraordinary digital experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={`group relative flex flex-col gap-6 rounded-3xl bg-white/70 backdrop-blur-sm p-8 shadow-xl ring-1 ring-gray-200/50 hover:ring-2 ${feature.hoverShadow} hover:shadow-2xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Background Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
              
              {/* Card Content */}
              <div className="relative z-10">
                {/* Icon Container */}
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon()}
                  </div>
                </div>

                {/* Feature Name */}
                <h3 className="mt-6 text-2xl font-bold leading-tight text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.name}
                </h3>

                {/* Description */}
                <p className="mt-4 text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="mt-6 flex items-center text-sm font-semibold">
                  <span className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent group-hover:text-opacity-80 transition-all duration-300`}>
                    Learn More
                  </span>
                  <svg className={`ml-2 h-4 w-4 text-current bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent group-hover:translate-x-1 transition-transform duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-lg rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-white/10 to-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center justify-center">
            <a
              href="/services"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 rounded-2xl shadow-2xl hover:shadow-slate-500/25 hover:scale-105 transform"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                View All Services
                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}