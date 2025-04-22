import { Skill, Project, User, SkillCategory, SkillStatus } from '../types';

// Helper to create ISO date strings
const isoDate = (year: number, month: number, day: number) => 
  new Date(year, month - 1, day).toISOString();

export const mockUser: User = {
  id: '1',
  name: 'Avantika',
  role: 'Frontend Developer',
  avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  joinedAt: isoDate(2023, 1, 15),
  goalDescription: 'Become a full-stack React developer with DevOps knowledge',
  dailyLearningGoal: 60,
  yearlyGoal: 'Build and deploy 3 full-stack applications'
};

export const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'HTML',
    category: 'frontend',
    proficiency: 85,
    status: 'mastered',
    startedAt: isoDate(2022, 1, 15),
    lastPracticed: isoDate(2023, 6, 20),
    notes: 'Comfortable with HTML5 features and semantic markup',
    resources: [
      {
        id: 'r1',
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        type: 'article'
      }
    ],
    milestones: [
      {
        id: 'm1',
        title: 'Built first responsive website',
        date: isoDate(2022, 3, 10),
        description: 'Created a personal portfolio site'
      }
    ]
  },
  {
    id: '2',
    name: 'CSS',
    category: 'frontend',
    proficiency: 75,
    status: 'learning',
    startedAt: isoDate(2022, 2, 1),
    lastPracticed: isoDate(2023, 7, 5),
    notes: 'Working on advanced animations and CSS grid',
    resources: [
      {
        id: 'r2',
        title: 'CSS-Tricks',
        url: 'https://css-tricks.com',
        type: 'article'
      }
    ]
  },
  {
    id: '3',
    name: 'JavaScript',
    category: 'frontend',
    proficiency: 80,
    status: 'learning',
    startedAt: isoDate(2022, 3, 15),
    lastPracticed: isoDate(2023, 7, 10),
    notes: 'Focusing on ES6+ features and async patterns'
  },
  {
    id: '4',
    name: 'React',
    category: 'frontend',
    proficiency: 65,
    status: 'learning',
    startedAt: isoDate(2022, 6, 1),
    lastPracticed: isoDate(2023, 7, 15)
  },
  {
    id: '5',
    name: 'Node.js',
    category: 'backend',
    proficiency: 50,
    status: 'learning',
    startedAt: isoDate(2022, 8, 10),
    lastPracticed: isoDate(2023, 6, 25)
  },
  {
    id: '6',
    name: 'Docker',
    category: 'devops',
    proficiency: 30,
    status: 'learning',
    startedAt: isoDate(2023, 1, 5),
    lastPracticed: isoDate(2023, 5, 15)
  },
  {
    id: '7',
    name: 'Communication',
    category: 'soft',
    proficiency: 85,
    status: 'mastered',
    startedAt: isoDate(2021, 1, 1),
    lastPracticed: isoDate(2023, 7, 1)
  },
  {
    id: '8',
    name: 'TypeScript',
    category: 'frontend',
    proficiency: 60,
    status: 'learning',
    startedAt: isoDate(2022, 10, 1),
    lastPracticed: isoDate(2023, 7, 18)
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Personal Portfolio',
    description: 'My developer portfolio showcasing projects and skills',
    url: 'https://portfolio.example.com',
    repoUrl: 'https://github.com/example/portfolio',
    imageUrl: 'https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    startDate: isoDate(2022, 3, 1),
    completionDate: isoDate(2022, 4, 15)
  },
  {
    id: '2',
    name: 'Weather Dashboard',
    description: 'A weather application showing forecasts using a public API',
    url: 'https://weather.example.com',
    repoUrl: 'https://github.com/example/weather-app',
    imageUrl: 'https://images.pexels.com/photos/1424246/pexels-photo-1424246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['HTML', 'CSS', 'JavaScript', 'React'],
    startDate: isoDate(2022, 6, 10),
    completionDate: isoDate(2022, 7, 20)
  },
  {
    id: '3',
    name: 'Task Manager API',
    description: 'RESTful API for managing tasks and projects',
    repoUrl: 'https://github.com/example/task-api',
    imageUrl: 'https://images.pexels.com/photos/459654/pexels-photo-459654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['Node.js', 'JavaScript'],
    startDate: isoDate(2022, 9, 1),
    completionDate: isoDate(2022, 10, 30)
  },
  {
    id: '4',
    name: 'E-commerce Store',
    description: 'Full-stack e-commerce application with payment integration',
    imageUrl: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    techStack: ['React', 'Node.js', 'CSS'],
    startDate: isoDate(2023, 1, 15)
  }
];

// Get quotes that are motivational for developers
export const motivationalQuotes = [
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler"
  },
  {
    text: "The most disastrous thing that you can ever learn is your first programming language.",
    author: "Alan Kay"
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine"
  },
  {
    text: "The best way to predict the future is to implement it.",
    author: "David Heinemeier Hansson"
  },
  {
    text: "The only way to learn a new programming language is by writing programs in it.",
    author: "Dennis Ritchie"
  }
];

// Get a random quote
export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};

// Generate color for categories
export const getCategoryColor = (category: SkillCategory): string => {
  switch (category) {
    case 'frontend':
      return 'bg-blue-500';
    case 'backend':
      return 'bg-purple-500';
    case 'devops':
      return 'bg-orange-500';
    case 'soft':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

// Get category text
export const getCategoryText = (category: SkillCategory): string => {
  switch (category) {
    case 'frontend':
      return 'Frontend';
    case 'backend':
      return 'Backend';
    case 'devops':
      return 'DevOps';
    case 'soft':
      return 'Soft Skills';
    default:
      return 'Other';
  }
};

// Get status color
export const getStatusColor = (status: SkillStatus): string => {
  switch (status) {
    case 'learning':
      return 'bg-blue-500';
    case 'mastered':
      return 'bg-green-500';
    case 'paused':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

// Get status text
export const getStatusText = (status: SkillStatus): string => {
  switch (status) {
    case 'learning':
      return 'Learning';
    case 'mastered':
      return 'Mastered';
    case 'paused':
      return 'Paused';
    default:
      return 'Unknown';
  }
};