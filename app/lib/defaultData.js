export const DUMMY_RESUME_DATA = {
  personalInfo: {
    name: 'Your Name',
    title: 'Aspiring Developer',
    email: 'your.email@example.com',
    phone: '123-456-7890',
    location: 'City, Country',
    summary: 'A brief summary about yourself. Highlight your key skills and career goals. This section can be customized extensively.',
  },
  experience: [
    {
      id: 'exp1',
      jobTitle: 'Software Engineer Intern',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      dates: 'June 2023 - August 2023',
      responsibilities: [
        'Developed new features for the company\'s flagship product.',
        'Collaborated with a team of 5 developers.',
        'Participated in agile sprints and code reviews.',
      ],
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      location: 'Techville, USA',
      graduationDate: 'May 2024',
      details: 'Relevant coursework: Data Structures, Algorithms, Web Development.',
    },
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Git'],
};

export const INITIAL_STYLES = {
  fontFamily: 'Inter',
  baseFontSize: 16,
  primaryColor: '#3B82F6',
  secondaryColor: '#6B7280',
  backgroundColor: '#FFFFFF',
  textColor: '#1F2937',
};

export const AVAILABLE_FONTS = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Menlo', value: 'Menlo, monospace' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif' },
]; 