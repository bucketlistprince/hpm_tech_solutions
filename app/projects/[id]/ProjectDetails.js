'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProjectById } from '../../../lib/actions/project.actions';
import { 
  ArrowLeftIcon, 
  DocumentTextIcon,
  CodeBracketIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

// Dynamically import FileList to avoid SSR issues with file upload
const FileList = dynamic(
  () => import('../../../components/FileList'),
  { ssr: false }
);

const InfoCard = ({ title, children, className = '', icon: Icon }) => (
  <div className={`bg-white rounded-xl border border-gray-100 p-6 shadow-sm ${className}`}>
    <div className="flex items-center space-x-3 mb-4">
      {Icon && <Icon className="h-5 w-5 text-blue-600" />}
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InfoRow = ({ label, value, className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-3 gap-2 ${className}`}>
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="text-sm text-gray-900 md:col-span-2">
      {value || <span className="text-gray-400">Not specified</span>}
    </dd>
  </div>
);

export default function ProjectDetails({ projectId }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(projectId);
        if (data) {
          setProject(data);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border-l-4 border-red-400">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              {error}. <button onClick={() => window.location.reload()} className="font-medium underline text-red-700 hover:text-red-600">Try again</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No project found</h3>
        <p className="mt-1 text-sm text-gray-500">The requested project could not be found.</p>
        <div className="mt-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" />
            Back to projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center mb-4 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1.5" />
          Back to Projects
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
          <div className="flex items-center mt-2 space-x-2">
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {project.status || 'Draft'}
            </span>
            <span className="text-sm text-gray-500">
              Project ID: {project.id.substring(0, 8)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <InfoCard title="Project Overview">
            <div className="space-y-4">
              <InfoRow label="Status" value={project.status} />
              <InfoRow label="Type" value={project.type} />
              <InfoRow label="Description" value={project.description} />
              <InfoRow label="Budget" value={project.budget ? `$${project.budget.toLocaleString()}` : 'Not specified'} />
              <InfoRow label="Timeline" value={project.timeline} />
              <InfoRow label="Priority" value={project.priority} />
            </div>
          </InfoCard>

          <InfoCard title="Technical Details">
            <div className="space-y-4">
              <InfoRow label="Platform" value={project.platform} />
              <InfoRow label="Technology Stack" value={project.technologyStack} />
              {project.type === 'MOBILE_APP' && (
                <>
                  <InfoRow label="Mobile Platform" value={project.mobilePlatform} />
                  <InfoRow label="App Store Requirements" value={project.appStoreRequirements} />
                </>
              )}
              {project.type === 'WEBSITE' && (
                <>
                  <InfoRow label="Website Type" value={project.websiteType} />
                  <InfoRow label="Responsive Design" value={project.responsiveDesign ? 'Yes' : 'No'} />
                  <InfoRow label="CMS Required" value={project.cmsRequired ? 'Yes' : 'No'} />
                  <InfoRow label="Domain Name" value={project.domainName} />
                </>
              )}
              <InfoRow label="Special Features" value={project.specialFeatures} />
            </div>
          </InfoCard>

          <InfoCard title="Project Files" icon={DocumentTextIcon}>
            <FileList projectId={project.id} />
          </InfoCard>
        </div>

        <div className="space-y-6">
          <InfoCard title="Invoices" icon={DocumentTextIcon}>
            {project.invoices?.length > 0 ? (
              <div className="space-y-4">
                {project.invoices.map((invoice) => (
                  <div key={invoice.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          ${(invoice.amount / 100).toFixed(2)}
                          <span className="ml-2 text-xs font-normal text-gray-500">
                            • Invoice #{invoice.id.substring(0, 6).toUpperCase()}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          <span>Due {new Date(invoice.dueDate).toLocaleDateString()}</span>
                          {invoice.status === 'PAID' && invoice.paidDate && (
                            <span className="ml-2 text-green-600">
                              • Paid on {new Date(invoice.paidDate).toLocaleDateString()}
                            </span>
                          )}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        invoice.status === 'PAID' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status === 'PAID' ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                    {invoice.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {invoice.description}
                      </p>
                    )}
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between font-medium">
                    <span>Total Invoiced:</span>
                    <span>${(project.invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0) / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Paid to date:</span>
                    <span>${(project.invoices
                      .filter(inv => inv.status === 'PAID')
                      .reduce((sum, inv) => sum + (inv.amount || 0), 0) / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <DocumentTextIcon className="mx-auto h-8 w-8 text-gray-300" />
                <p className="mt-2 text-sm text-gray-500">No invoices have been issued for this project yet.</p>
                <p className="text-xs text-gray-400 mt-1">Contact support if you believe this is an error.</p>
              </div>
            )}
          </InfoCard>

          <InfoCard title="Project Support" icon={DocumentCheckIcon}>
            <div className="space-y-3">
              <a 
                href={`mailto:support@example.com?subject=Support Request: ${encodeURIComponent(project.title)}`}
                className="block w-full text-left p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <span>Contact Support</span>
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </a>

              <a 
                href="#" 
                className="block w-full text-left p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <span>Project Guidelines</span>
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </a>
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
