
import { Post, Category, SiteSettings } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Science', slug: 'science' },
  { id: '2', name: 'Humanities', slug: 'humanities' },
  { id: '3', name: 'Technology', slug: 'technology' },
  { id: '4', name: 'Arts', slug: 'arts' },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'The Future of Quantum Computing in Academia',
    slug: 'future-quantum-computing',
    content: `
      <h2>The Quantum Era Begins</h2>
      <p>Quantum computing is no longer just a theoretical concept discussed in high-level physics labs. It's rapidly becoming a reality that will reshape our computational landscape.</p>
      <p>In this article, we explore how universities are integrating quantum modules into their computer science curriculums and what it means for the next generation of researchers.</p>
      <h3>Interdisciplinary Approaches</h3>
      <p>The beauty of quantum physics is its overlap with chemistry, mathematics, and even philosophy. College clubs are finding new ways to bridge these gaps through collaborative seminars.</p>
    `,
    summary: 'Exploring the integration of quantum computing into university curriculums and its impact on future researchers.',
    author: 'Dr. Sarah Mitchell',
    category: 'Technology',
    tags: ['Quantum', 'Education', 'Future'],
    image: 'https://picsum.photos/seed/quantum/1200/600',
    status: 'published',
    date: '2024-05-15',
    featured: true,
  },
  {
    id: '2',
    title: 'Modern Literature: A Reflection of Society',
    slug: 'modern-literature-reflection',
    content: `
      <h2>Beyond the Pages</h2>
      <p>Literature has always served as a mirror to our cultural shifts. In the 21st century, the rise of digital storytelling has fundamentally changed how we consume narratives.</p>
      <p>We analyze the works of contemporary authors who are pushing the boundaries of traditional prose to include non-linear formats and mixed media elements.</p>
    `,
    summary: 'A deep dive into how 21st-century literature reflects our rapidly changing cultural landscape and digital habits.',
    author: 'Prof. James Wilson',
    category: 'Humanities',
    tags: ['Literature', 'Society', 'Culture'],
    image: 'https://picsum.photos/seed/lit/1200/600',
    status: 'published',
    date: '2024-05-10',
    featured: false,
  },
  {
    id: '3',
    title: 'Sustainable Architecture in Urban Campus Design',
    slug: 'sustainable-architecture-campus',
    content: `
      <h2>Green Campuses</h2>
      <p>Sustainability is no longer a choice but a necessity in modern architecture. Universities are at the forefront of this movement, transforming old brick-and-mortar structures into energy-efficient spaces.</p>
    `,
    summary: 'How universities are leading the way in sustainable building practices and urban greening.',
    author: 'Elena Rodriguez',
    category: 'Arts',
    tags: ['Architecture', 'Sustainability', 'Campus'],
    image: 'https://picsum.photos/seed/arch/1200/600',
    status: 'published',
    date: '2024-05-12',
    featured: true,
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteTitle: 'NEWSPAPER CLUB -AGHC',
  description: 'The Official Knowledge Sharing Platform of the NEWSPAPER CLUB -AGHC.',
  primaryColor: '#0f172a', // slate-900
  accentColor: '#3b82f6', // blue-500
  fontFamily: 'Inter',
  logo: '📰',
};
