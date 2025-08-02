'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProjectDetails from './ProjectDetails';


export default function ProjectDetailContent() {
  const params = useParams();
  
  useEffect(() => {
    console.log('ProjectDetailContent mounted with ID:', params?.id);
  }, [params?.id]);

  if (!params?.id) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <p className="text-yellow-700">No project ID provided</p>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectDetails projectId={params.id} />
      </div>
    </main>
  );
}
