import '../globals.css';
import { Metadata } from 'next';
import ProjectsLayoutClient from './ProjectsLayoutClient';

export const metadata = {
  title: 'Projects | HPM Tech Solutions',
  description: 'Explore our portfolio of technology solutions and projects',
};

export default function ProjectsLayout({ children }) {
  return <ProjectsLayoutClient>{children}</ProjectsLayoutClient>;
}
