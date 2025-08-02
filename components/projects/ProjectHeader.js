'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/FormElements';
import { formatDate } from '../../lib/utils/date';

export default function ProjectHeader({ project }) {
  const router = useRouter();
  
  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        statusMap[status] || 'bg-gray-100 text-gray-800'
      }`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            {getStatusBadge(project.status)}
          </div>
          
          <p className="mt-1 text-sm text-gray-500">
            Created on {formatDate(project.createdAt)}
            {project.deadline && (
              <span className="ml-4">
                Deadline: {formatDate(project.deadline)}
              </span>
            )}
          </p>
        </div>
        
        <div className="flex flex-shrink-0 gap-3
        ">
          <Button 
            variant="secondary" 
            onClick={() => router.push(`/projects/${project.id}/edit`)}
          >
            Edit Project
          </Button>
          <Button>New Invoice</Button>
        </div>
      </div>
    </div>
  );
}
