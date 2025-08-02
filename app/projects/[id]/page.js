'use client';

import { useParams } from 'next/navigation';
import ProjectDetailContent from './ProjectDetailContent';

// This is now a client component that renders ProjectDetailContent
export default function ProjectDetailPage() {
  const params = useParams();
  
  if (!params?.id) {
    return null; // Will be handled by the client component
  }

  return <ProjectDetailContent />;
}

export const dynamic = 'force-dynamic';
