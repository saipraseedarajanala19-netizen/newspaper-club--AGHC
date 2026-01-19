
export const INITIAL_CATEGORIES = [
  { id: '1', name: 'Science', slug: 'science' },
  { id: '2', name: 'Humanities', slug: 'humanities' },
  { id: '3', name: 'Technology', slug: 'technology' },
  { id: '4', name: 'Arts', slug: 'arts' },
];

export const INITIAL_POSTS = [
  {
    id: '1',
    title: 'Quantum Frontiers in Higher Education',
    slug: 'quantum-frontiers',
    content: '<h2>A New Academic Dimension</h2><p>Quantum computing is transitioning from purely theoretical physics into an applied disciplinary force across global universities.</p>',
    summary: 'Exploring how quantum shifts are redefining the landscape of collegiate research and technology departments.',
    author: 'Editorial Team',
    category: 'Technology',
    tags: ['Quantum', 'Future', 'Academia'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200',
    status: 'published',
    date: '2024-05-15',
    featured: true,
  }
];

export const INITIAL_SETTINGS = {
  siteTitle: 'NEWSPAPER CLUB - AGHC',
  description: 'The definitive platform for knowledge sharing and academic journalism at AGHC.',
  primaryColor: '#0f172a',
  accentColor: '#3b82f6',
  fontFamily: 'Inter',
  logo: '📰',
};
