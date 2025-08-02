export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ProjectDetailLayout({ children }) {
  return <>{children}</>;
}

// Generate metadata statically without using params directly
export function generateMetadata() {
  return {
    title: 'Project | HPM Tech Solutions',
    description: 'Project details',
    robots: {
      index: false,
      follow: false,
    },
  };
}
