'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import RequireAuth from '../../components/auth/require-auth';
import NoInternet from '../../components/NoInternet';
import { PlusIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

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
      <div className="min-h-screen">
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.1),transparent_50%)]" />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-cyan-200/30 to-blue-300/30 rounded-2xl rotate-12 blur-sm"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-xl -rotate-45 blur-sm"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your projects at a glance
            </p>
          </div>

          {userProjects?.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold text-gray-900">Your Projects ({userProjects.length})</h2>
                <button
                  onClick={() => router.push('/projects/request')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                  New Project
                </button>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {userProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-200 group"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {project.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.type === 'WEBSITE' ? 'bg-blue-100 text-blue-800' :
                          project.type === 'MOBILE' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.type.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                        {project.description || 'No description available'}
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-500">Contact</p>
                            <p className="text-sm text-gray-900">{project.contactPerson?.name || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-5">
                        <button
                          onClick={() => router.push(`/projects/${project.id}`)}
                          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                          View project
                          <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 max-w-2xl mx-auto">
              <div className="p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                  <PlusIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No projects yet
                </h2>
                <p className="text-gray-600 mb-6">
                  Get started by creating your first project
                </p>
                <button
                  onClick={() => router.push('/projects/request')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                  New Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </RequireAuth>
  );
}
