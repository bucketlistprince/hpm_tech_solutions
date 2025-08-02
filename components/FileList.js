'use client';

import { useState, useEffect, useRef } from 'react';
import { DocumentTextIcon, XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

// Dynamically import FileUpload to avoid SSR issues with file upload
const FileUpload = dynamic(
  () => import('./FileUpload'),
  { ssr: false }
);

export default function FileList({ projectId }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!projectId) {
        throw new Error('Project ID is missing');
      }
      
      const response = await fetch(`/api/projects/${projectId}/files`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      
      const data = await response.json();
      setFiles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error in fetchFiles:', err);
      setError(err.message || 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Skip if we've already fetched or don't have a projectId
    if (hasFetched.current || !projectId) return;
    
    // Mark as fetched before making the API call
    hasFetched.current = true;
    
    fetchFiles();
    
    // Cleanup function to reset the flag if the component is unmounted
    return () => {
      hasFetched.current = false;
    };
  }, [projectId]);

  const handleFileUpload = (newFile) => {
    setFiles(prevFiles => [newFile, ...prevFiles]);
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) {
      return (
        <div className="flex-shrink-0 h-10 w-10 rounded bg-red-100 flex items-center justify-center">
          <span className="text-red-600 font-medium">PDF</span>
        </div>
      );
    }
    
    if (fileType.includes('word') || fileType.includes('document')) {
      return (
        <div className="flex-shrink-0 h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-medium">DOC</span>
        </div>
      );
    }
    
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
      return (
        <div className="flex-shrink-0 h-10 w-10 rounded bg-green-100 flex items-center justify-center">
          <span className="text-green-600 font-medium">XLS</span>
        </div>
      );
    }
    
    if (fileType.includes('image')) {
      return (
        <div className="flex-shrink-0 h-10 w-10 rounded bg-purple-100 flex items-center justify-center">
          <span className="text-purple-600 font-medium">IMG</span>
        </div>
      );
    }
    
    return (
      <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
        <DocumentTextIcon className="h-5 w-5 text-gray-400" />
      </div>
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">

      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && files.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
            <DocumentTextIcon className="h-full w-full" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No files yet</h3>
          <p className="mt-1 text-sm text-gray-500">Upload your first file to get started</p>
          <div className="mt-6">
            <FileUpload 
              projectId={projectId} 
              onUpload={handleFileUpload}
              buttonVariant="primary"
              buttonText="Upload Files"
              className="px-4 py-2 text-sm font-medium"
            />
          </div>
        </div>
      ) : null}

      {!loading && files.length > 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Filename
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Download</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {file.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(file.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={(e) => e.stopPropagation()}
                      title="Download file"
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
