'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import RequireAuth from '../../components/auth/require-auth';
import NoInternet from '../../components/NoInternet';

export default function ProjectsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [userProjects, setUserProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(typeof window !== 'undefined' ? navigator.onLine : true);

  // Handle online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchData = async () => {
    if (!isOnline) {
      setError(new Error('No internet connection'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/projects', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch projects: ${response.statusText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format from server');
      }

      const formattedProjects = data.map(project => ({
        id: project.id,
        title: project.title || 'Untitled Project',
        description: project.description || 'No description available',
        type: project.type || 'UNKNOWN',
        contactPerson: {
          name: project.contactPerson?.name || 'N/A',
          email: project.contactPerson?.email || 'N/A',
          phone: project.contactPerson?.phone || 'N/A',
        },
        status: project.status || 'UNKNOWN',
      }));

      setUserProjects(formattedProjects);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message || 'Failed to load projects. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchData();
    }
  }, [session?.user?.id, isOnline]);

  // Handle offline state
  if (!isOnline) {
    return <NoInternet onRetry={fetchData} />;
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="relative min-h-screen pt-16 sm:pt-24 overflow-hidden">
        {/* Background Gradient Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.1),transparent_50%)]" />
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-cyan-200/30 to-blue-300/30 rounded-2xl rotate-12 blur-sm"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-xl -rotate-45 blur-sm"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full px-6 py-2 text-sm font-medium bg-gradient-to-r from-cyan-100 to-blue-100 text-blue-800 mb-6 border border-blue-200">
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Your Projects
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}!
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage and track all your development projects in one place
            </p>
          </div>

          {userProjects?.length > 0 ? (
            <div className="space-y-8">
              <div className="flex justify-end">
                <button
                  onClick={() => router.push('/projects/request')}
                  className="group relative inline-flex items-center px-6 py-3 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 transform"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Request New Project
                  </span>
                </button>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {userProjects.map((project, index) => {
                  const gradients = [
                    { bg: 'from-cyan-50 to-blue-50', textColor: 'text-cyan-700' },
                    { bg: 'from-blue-50 to-purple-50', textColor: 'text-blue-700' },
                    { bg: 'from-purple-50 to-pink-50', textColor: 'text-purple-700' },
                  ][index % 3];

                  return (
                    <div
                      key={project.id}
                      className={`group relative flex flex-col h-full rounded-3xl bg-white/70 backdrop-blur-sm shadow-xl ring-1 ring-gray-200/50 hover:ring-2 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${gradients.bg} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>

                      <div className="relative z-10 p-6 flex-1 flex flex-col">
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                            {project.title}
                          </h3>
                        </div>
                        
                        {/* Project Description */}
                        <p className="text-gray-600 mb-6 flex-1 group-hover:text-gray-500 transition-colors">
                          {project.description || 'No description available'}
                        </p>
                        
                        {/* Contact Details */}
                        <div className="space-y-4 mt-auto">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                              <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-500">Contact Person</p>
                              <p className="text-sm font-medium text-gray-900">{project.contactPerson?.name || 'N/A'}</p>
                              {project.contactPerson?.email && (
                                <p className="text-xs text-gray-500">{project.contactPerson.email}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Project Type Badge */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              project.type === 'WEBSITE' ? 'bg-blue-100 text-blue-800' :
                              project.type === 'MOBILE' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {project.type.replace('_', ' ')}
                            </span>
                            <button 
                              onClick={() => router.push(`/projects/${project.id}`)}
                              className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center group"
                            >
                              View details
                              <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl ring-1 ring-gray-200/50 max-w-2xl mx-auto">
              {/* No projects UI */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <div className="relative z-10">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 mb-6">
                  <svg className="h-10 w-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  No Projects Yet
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  You haven't created any projects yet. Let's get started on something amazing!
                </p>
                <button
                  onClick={() => router.push('/projects/request')}
                  className="group relative inline-flex items-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 transform"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Request Your First Project
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </RequireAuth>
  );
}
