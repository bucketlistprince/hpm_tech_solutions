'use client';

import { formatDate, formatCurrency, formatStatus } from '../../lib/utils/date';
import dynamic from 'next/dynamic';

// Dynamically import FileList to avoid SSR issues with file upload
const FileList = dynamic(() => import('../FileList'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  )
});

export default function ProjectDetails({ project }) {
  const renderDetailSection = (title, items) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">{title}</h3>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <dl className="divide-y divide-gray-100">
            {items.map(({ label, value }, index) => (
              <div key={index} className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{label}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {value || 'Not specified'}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    );
  };



  // Project Information
  const projectInfo = [
    { label: 'Description', value: project.description },
    { label: 'Type', value: formatStatus(project.type) },
    { label: 'Status', value: formatStatus(project.status) },
    { label: 'Budget', value: formatCurrency(project.budget) },
    { label: 'Timeline', value: project.timeline },
    { label: 'Start Date', value: formatDate(project.startDate) },
    { label: 'Deadline', value: formatDate(project.deadline) },
    { label: 'Progress', value: project.progress ? `${project.progress}%` : '0%' },
  ];

  // Client Information
  const clientInfo = [
    { label: 'Client Name', value: project.User?.name },
    { label: 'Email', value: project.clientEmail },
    { label: 'Phone', value: project.clientPhone },
    { label: 'Business Phone', value: project.businessPhone },
    { label: 'Address', value: project.address },
  ];

  // Project Specific Details
  const getProjectSpecificDetails = () => {
    if (project.type === 'WEBSITE') {
      return [
        { label: 'Website Type', value: project.websiteType },
        { label: 'Responsive Design', value: project.responsiveDesign ? 'Yes' : 'No' },
        { label: 'CMS Required', value: project.cmsRequired ? 'Yes' : 'No' },
        { label: 'Domain Name', value: project.domainName },
      ];
    } else if (project.type === 'MOBILE_APP') {
      return [
        { label: 'Platform', value: project.mobilePlatform },
        { label: 'App Store Requirements', value: project.appStoreRequirements },
        { label: 'Special Features', value: project.specialFeatures },
      ];
    } else if (project.type === 'SOFTWARE') {
      return [
        { label: 'Software Type', value: project.softwareType },
        { label: 'Technology Stack', value: project.technologyStack },
        { label: 'Integration Requirements', value: project.integrationRequirements },
        { label: 'Database Requirements', value: project.databaseRequirements },
      ];
    }
    return [];
  };

  const projectSpecificDetails = getProjectSpecificDetails();

  return (
    <div className="space-y-6">
      {/* Project Files Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Files</h2>
        <FileList projectId={project.id} />
      </div>
      
      <div className="space-y-6">
      {renderDetailSection('Project Information', projectInfo)}
      
      {projectSpecificDetails.length > 0 && (
        renderDetailSection(
          `${project.type === 'WEBSITE' ? 'Website' : project.type === 'MOBILE_APP' ? 'Mobile App' : 'Software'} Details`,
          projectSpecificDetails
        )
      )}
      
      {renderDetailSection('Client Information', clientInfo.filter(item => item.value))}
      
      {project.notes && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Notes</h3>
          <p className="text-gray-700 whitespace-pre-line">{project.notes}</p>
        </div>
      )}
      </div>
    </div>
  );
}
