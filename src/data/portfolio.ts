export type ProjectCategory =
  | 'ALL'
  | 'APPS'
  | 'ROBOTICS'
  | 'RESEARCH'
  | 'C';

export type ProjectStatus =
  | 'Active Project'
  | 'Hardware Prototype'
  | 'Research Concept'
  | 'Research Proposal'
  | 'Completed';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  filterCategory: Exclude<ProjectCategory, 'ALL'>;
  categoryLabel: string;
  status: ProjectStatus;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  technologies: string[];
  imageUrl?: string;
  imageAlt: string;
  terminalPreview?: {
    filename: string;
    lines: string[];
  };
  /** Supply your actual repository URL when ready (null = link not yet published) */
  githubUrl: string | null;
  /** Supply a live demo URL only for deployed web/app builds (null = no fake demo) */
  demoUrl: string | null;
  role: string;
}

export interface TimelineEntry {
  id: string;
  type: 'Leadership' | 'Community' | 'Education';
  role: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
  focusAreas: string[];
}

export interface VolunteeringPillar {
  id: string;
  category: string;
  title: string;
  description: string;
  qualities: string[];
}

export interface BeyondInterestItem {
  id: string;
  kicker: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  focusTag: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  items: {
    name: string;
    iconKey: string;
  }[];
}

export const personalInfo = {
  fullName: 'Md. Ratul Hassan Shuvo',
  preferredName: 'Shuvo',
  logoText: 'Shuvo',
  professionalIdentity:
    'CSE Student · Android & Web App Developer · Robotics & Embedded Systems Builder',
  university: 'Varendra University',
  universityFull: 'Varendra University, Rajshahi, Bangladesh',
  heroKicker: "Hello, I'm Shuvo.",
  tagline: 'Building robots and apps that solve real problems.',
  heroIntro:
    "I'm a Computer Science and Engineering student at Varendra University building Android and web applications, embedded robotics systems, and research concepts—while staying active in campus volunteering, football, and marathon running.",
  animatedRoles: ['App Developer', 'Roboticist', 'CSE Student'],
  availabilityText: 'Available for internships',
  email: 'ratulhasan01715@gmail.com',
  location: 'Rajshahi, Bangladesh',
  /**
   * Replaceable Profile Photo Configuration:
   * Place your photograph in /public/images/ratul-portrait.jpg (or import from src/assets)
   * and set profileImageUrl to that path. Leave null to display the replaceable photo frame.
   */
  profileImageUrl:
    '/assets/aistudio/file_0000000098ac81fda241eea3030b11aa_ee35bf73.png' as
      | string
      | null,
  profileImageAlt: 'Portrait of Md. Ratul Hassan Shuvo',
  /**
   * Configurable CV Download:
   * Set cvUrl to '/Ratul_CV.pdf' after placing your PDF in /public/,
   * or leave null to open the built-in interactive Resume Preview & Print/Download dialog.
   */
  cvUrl: null as string | null,
};

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/md-ratul-hassan-shuvo-56b99541b/',
  github: 'https://github.com/', // Replace with your exact GitHub profile URL
  email: `mailto:${personalInfo.email}`,
};

export const navLinks = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const aboutData = {
  heading: 'A little about me.',
  paragraphs: [
    "I'm Md. Ratul Hassan Shuvo, an undergraduate Computer Science and Engineering student at Varendra University in Rajshahi, Bangladesh. My technical work bridges software and hardware—from developing Android and web applications like KrishokBondhu, Study Buddy, and Health and Life to wiring and programming embedded robotics systems.",
    'Alongside engineering builds and early-stage sustainability research, I actively volunteer in university and external events where coordination, communication, and teamwork matter. Exploring my creative interests, I also participated as an actor in a university short film dedicated to our seniors, gaining valuable storytelling experience through performance. Outside the lab and editor, you will find me on the football pitch, training in the gym, or logging miles for marathon running.',
  ],
  interests: [
    'Android & Web Apps',
    'Robotics & Embedded Systems',
    'Research & Innovation',
    'Event Volunteering',
    'Football & Athletics',
    'Marathon Running & Fitness',
    'Film & Creative Performance',
  ],
  personalStatement:
    'I enjoy learning by building, experimenting, collaborating, and solving meaningful problems.',
  stats: [
    {
      id: 'projects',
      value: 10,
      suffix: '+',
      label: 'Projects and project concepts',
      detail: 'Apps, robotics, research & C programs',
    },
    {
      id: 'roles',
      value: 3,
      suffix: '',
      label: 'Leadership and organizational roles',
      detail: 'Hult Prize, RSVU & Robo Tech Valley',
    },
    {
      id: 'languages',
      value: 4,
      suffix: '',
      label: 'Programming languages',
      detail: 'C, C++, Java / Kotlin & JavaScript',
    },
  ],
};

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: 'ALL', label: 'All' },
  { id: 'APPS', label: 'Application Development' },
  { id: 'ROBOTICS', label: 'Robotics & Embedded Systems' },
  { id: 'RESEARCH', label: 'Research & Innovation' },
  { id: 'C', label: 'C Programming' },
];

export const projectsData: ProjectItem[] = [
  {
    id: 'krishokbondhu',
    number: '01',
    title: 'KrishokBondhu',
    filterCategory: 'APPS',
    categoryLabel: 'Application Development',
    status: 'Active Project',
    shortDescription:
      'A Bangla-language agricultural application designed to support Bangladeshi farmers through accessible digital solutions.',
    fullDescription:
      'KrishokBondhu is a Bangla-language agricultural application created to support Bangladeshi farmers with accessible digital solutions. Built across Android and web surfaces with a Bangla-first user experience so essential agricultural information remains approachable.',
    highlights: [
      'Bangla-first user experience designed for accessibility',
      'Focused on agricultural technology for Bangladeshi farmers',
      'Developed across Android and web application workflows',
    ],
    technologies: ['Android Studio', 'Java / Kotlin', 'JavaScript', 'Web'],
    imageUrl: '/src/assets/images/project_krishokbondhu_1795326391018.jpg',
    imageAlt: 'KrishokBondhu agricultural application displayed on a smartphone',
    githubUrl: null,
    demoUrl: null,
    role: 'Application Developer',
  },
  {
    id: 'study-buddy',
    number: '02',
    title: 'Study Buddy',
    filterCategory: 'APPS',
    categoryLabel: 'Application Development',
    status: 'Active Project',
    shortDescription:
      'A student-focused application designed to support learning, studying, and academic productivity.',
    fullDescription:
      'Study Buddy is an application built specifically around student workflows to support daily learning, structured studying, and consistent academic productivity.',
    highlights: [
      'Designed specifically for student learning workflows',
      'Supports organized studying and day-to-day focus',
      'Built to encourage steady academic productivity',
    ],
    technologies: ['Android Studio', 'Java / Kotlin', 'JavaScript', 'App Design'],
    imageUrl: '/src/assets/images/project_study_buddy_1795327082528.jpg',
    imageAlt: 'Study Buddy student learning and academic productivity application preview',
    githubUrl: null,
    demoUrl: null,
    role: 'Application Developer',
  },
  {
    id: 'health-and-life',
    number: '03',
    title: 'Health and Life',
    filterCategory: 'APPS',
    categoryLabel: 'Application Development',
    status: 'Active Project',
    shortDescription:
      'A health and lifestyle-focused application built to encourage balanced daily habits and wellness.',
    fullDescription:
      'Health and Life is a personal health and lifestyle-focused application shaped around practical, everyday wellbeing and an active routine.',
    highlights: [
      'Focused on personal health and balanced lifestyle habits',
      'Clean, accessible application layout for everyday use',
      'Reflects a strong personal interest in fitness and wellbeing',
    ],
    technologies: ['Android Studio', 'Java / Kotlin', 'JavaScript', 'App Design'],
    imageUrl: '/src/assets/images/project_health_life_1795327081938.jpg',
    imageAlt: 'Health and Life wellness and lifestyle mobile application preview',
    githubUrl: null,
    demoUrl: null,
    role: 'Application Developer',
  },
  {
    id: 'esp32-soccer-robot',
    number: '04',
    title: 'ESP32 Bluetooth Soccer Robot',
    filterCategory: 'ROBOTICS',
    categoryLabel: 'Robotics & Embedded Systems',
    status: 'Hardware Prototype',
    shortDescription:
      'An ESP32-based Bluetooth-controlled soccer robot with an Android BLE remote control, developed for a robot soccer competition.',
    fullDescription:
      'Designed and built for competitive robot soccer matches, this compact four-wheel drive chassis pairs an ESP32 microcontroller with geared motors and motor drivers. Commands stream over Bluetooth Low Energy (BLE) from an Android remote control interface.',
    highlights: [
      'ESP32 microcontroller firmware for responsive steering',
      'Bluetooth Low Energy (BLE) wireless communication',
      'Android BLE remote control integration',
      'Robotics hardware wiring, chassis assembly, and testing',
    ],
    technologies: ['ESP32', 'BLE', 'C++', 'Motor Drivers', 'Android Studio'],
    imageUrl: '/src/assets/images/project_soccer_robot_1795326390243.jpg',
    imageAlt: 'Custom ESP32 Bluetooth soccer robot prototype on a dark robotics workbench',
    githubUrl: null,
    demoUrl: null,
    role: 'Robotics & Embedded Systems Builder',
  },
  {
    id: 'line-follower-robot',
    number: '05',
    title: 'Line Follower Robot',
    filterCategory: 'ROBOTICS',
    categoryLabel: 'Robotics & Embedded Systems',
    status: 'Hardware Prototype',
    shortDescription:
      'An autonomous line-following robot developed collaboratively with a technical team for efficient path tracking.',
    fullDescription:
      'Developed collaboratively with a technical team to follow competition track paths autonomously. Uses infrared reflectance sensors feeding real-time correction logic to drive dual geared motors through turns and intersections.',
    highlights: [
      'IR sensor calibration for reliable line detection',
      'Motor control for balanced autonomous navigation',
      'Collaborative team build and hardware debugging',
    ],
    technologies: ['Sensors', 'Motor Drivers', 'Arduino IDE', 'C++'],
    imageUrl: '/src/assets/images/project_line_follower_1795326391195.jpg',
    imageAlt: 'Autonomous line follower robot tracking a white path line on a competition surface',
    githubUrl: null,
    demoUrl: null,
    role: 'Robotics Team Collaborator',
  },
  {
    id: 'smart-green-campus',
    number: '06',
    title: 'AI-Based Smart Green Campus',
    filterCategory: 'RESEARCH',
    categoryLabel: 'Research & Innovation',
    status: 'Research Concept',
    shortDescription:
      'A conceptual renewable-energy management framework exploring AI-assisted power distribution and energy optimization for sustainable campuses.',
    fullDescription:
      'Presented at the Student Idea and Project Showcase Competition, this research concept outlines an intelligent energy management framework for university campuses—exploring AI-assisted power distribution and renewable optimization.',
    highlights: [
      'AI-based predictive power distribution concept',
      'Renewable energy focus for sustainable campuses',
      'Presented at the Student Idea and Project Showcase Competition',
    ],
    technologies: ['Renewable Energy', 'AI Concept', 'Smart Energy Management'],
    imageUrl: '/src/assets/images/project_green_campus_1795326391712.jpg',
    imageAlt: 'Isometric model of an AI-managed solar-powered smart green university campus',
    githubUrl: null,
    demoUrl: null,
    role: 'Concept Researcher & Presenter',
  },
  {
    id: 'bioethanol-agri-waste',
    number: '07',
    title: 'Bioethanol from Agricultural Waste',
    filterCategory: 'RESEARCH',
    categoryLabel: 'Research & Innovation',
    status: 'Research Proposal',
    shortDescription:
      'A Bangladesh-focused research and concept pitch exploring the potential of converting agricultural waste into sustainable biofuel.',
    fullDescription:
      'Tailored to Bangladesh’s agricultural landscape, this research and concept pitch examines converting abundant agricultural residues into cleaner bioethanol, addressing sustainability and environmental impact.',
    highlights: [
      'Bioethanol conversion research concept',
      'Focused on Bangladeshi agricultural waste',
      'Sustainability and environmental impact analysis',
    ],
    technologies: ['Bioethanol Research', 'Agricultural Waste', 'Sustainability'],
    imageUrl: '/src/assets/images/project_bioethanol_1795326390768.jpg',
    imageAlt: 'Laboratory flasks of golden bioethanol beside dried rice straw biomass',
    githubUrl: null,
    demoUrl: null,
    role: 'Concept Researcher & Presenter',
  },
  {
    id: 'simple-calculator-c',
    number: '08',
    title: 'Simple Calculator',
    filterCategory: 'C',
    categoryLabel: 'C Programming',
    status: 'Completed',
    shortDescription:
      'A terminal-based calculator implementing fundamental arithmetic operations using C programming.',
    fullDescription:
      'A structured command-line utility written in C implementing fundamental arithmetic operations with modular functions, switch-case routing, and divide-by-zero input safeguards.',
    highlights: [
      'Modular arithmetic dispatch with switch-case logic',
      'Division-by-zero edge-case protection',
      'Clean interactive console prompt flow',
    ],
    technologies: ['C', 'Standard I/O', 'CLI'],
    imageAlt: 'C programming terminal preview for Simple Calculator',
    terminalPreview: {
      filename: 'calculator.c',
      lines: [
        'double calc(double a, double b, char op) {',
        '  switch (op) {',
        "    case '+': return a + b;",
        "    case '-': return a - b;",
        "    case '*': return a * b;",
        "    case '/': return b != 0 ? a / b : NAN;",
        '  }',
        '}',
      ],
    },
    githubUrl: null,
    demoUrl: null,
    role: 'Sole Developer',
  },
  {
    id: 'number-guessing-game-c',
    number: '09',
    title: 'Number Guessing Game',
    filterCategory: 'C',
    categoryLabel: 'C Programming',
    status: 'Completed',
    shortDescription:
      'An interactive number-guessing game featuring random number generation and user-input validation.',
    fullDescription:
      'An interactive console game built in C utilizing time-seeded pseudorandom number generation (srand/rand), bounded range validation, attempt tracking, and directional hints.',
    highlights: [
      'Time-seeded random number generation',
      'User-input validation and bounds checking',
      'Attempt counter and high/low feedback loop',
    ],
    technologies: ['C', 'stdlib.h', 'Input Validation'],
    imageAlt: 'C programming terminal preview for Number Guessing Game',
    terminalPreview: {
      filename: 'guess_game.c',
      lines: [
        'srand((unsigned) time(NULL));',
        'int target = (rand() % 100) + 1;',
        'while (scanf("%d", &guess) == 1) {',
        '  attempts++;',
        '  if (guess == target) break;',
        '  printf(guess < target ? "Higher\\n" : "Lower\\n");',
        '}',
      ],
    },
    githubUrl: null,
    demoUrl: null,
    role: 'Sole Developer',
  },
  {
    id: 'tic-tac-toe-c',
    number: '10',
    title: 'Tic-Tac-Toe',
    filterCategory: 'C',
    categoryLabel: 'C Programming',
    status: 'Completed',
    shortDescription:
      'A classic two-player game implemented using multidimensional arrays, game-loop logic, and win-condition evaluation.',
    fullDescription:
      'A complete two-player console implementation of Tic-Tac-Toe in C using a 2D character array board, turn alternation, input validation, and row/column/diagonal win-condition evaluation.',
    highlights: [
      '3x3 multidimensional char array board state',
      'Win-condition evaluation across rows, columns & diagonals',
      'Turn validation and draw-state detection',
    ],
    technologies: ['C', '2D Arrays', 'Game Loop Logic'],
    imageAlt: 'C programming terminal preview for Tic-Tac-Toe',
    terminalPreview: {
      filename: 'tictactoe.c',
      lines: [
        'char board[3][3] = { /* 1..9 */ };',
        'int check_win(char b[3][3]) {',
        '  for (int i = 0; i < 3; i++) {',
        '    if (b[i][0] == b[i][1] && b[i][1] == b[i][2]) return 1;',
        '    if (b[0][i] == b[1][i] && b[1][i] == b[2][i]) return 1;',
        '  }',
        '  return (b[0][0]==b[1][1] && b[1][1]==b[2][2]);',
        '}',
      ],
    },
    githubUrl: null,
    demoUrl: null,
    role: 'Sole Developer',
  },
];

export const timelineData: TimelineEntry[] = [
  {
    id: 'hult-prize',
    type: 'Leadership',
    role: 'Event Management Team Member',
    organization: 'Hult Prize at Varendra University',
    location: 'Rajshahi, Bangladesh',
    period: 'University Leadership',
    description:
      'Coordinating event logistics, stage flow, and participant communication for campus-wide social entrepreneurship qualifiers and idea pitching sessions.',
    focusAreas: ['Event Management', 'Team Coordination', 'Communication'],
  },
  {
    id: 'rsvu',
    type: 'Leadership',
    role: 'Assistant Event Management Secretary',
    organization: 'Robotic Society of Varendra University (RSVU)',
    location: 'Rajshahi, Bangladesh',
    period: 'Society Leadership',
    description:
      'Supporting technical robotics workshops, campus hardware showcases, and member coordination alongside the society executive committee.',
    focusAreas: ['Event Coordination', 'Robotics Community', 'Leadership'],
  },
  {
    id: 'robo-tech-valley',
    type: 'Community',
    role: 'Campus Ambassador',
    organization: 'Robo Tech Valley',
    location: 'Varendra University',
    period: 'Campus Representation',
    description:
      'Connecting engineering students at Varendra University with robotics initiatives, workshops, and broader technical community programs.',
    focusAreas: ['Outreach', 'Collaboration', 'Student Community'],
  },
  {
    id: 'bsc-cse',
    type: 'Education',
    role: 'Bachelor of Science in Computer Science and Engineering',
    organization: 'Varendra University',
    location: 'Rajshahi, Bangladesh',
    period: 'July 2025 – Present',
    description:
      'Undergraduate study covering structured programming, algorithms, software engineering, and embedded hardware experimentation.',
    focusAreas: ['Computer Science', 'Application Development', 'Embedded Systems'],
  },
];

export const volunteeringData = {
  heading: 'Volunteering & Community Involvement',
  subtitle:
    'Alongside formal campus roles, I regularly step in as an active volunteer for events both inside and outside university—supporting smooth execution on the ground.',
  pillars: [
    {
      id: 'university-volunteering',
      category: 'On-Campus',
      title: 'University Event Volunteering',
      description:
        'Supporting academic showcases, technical sessions, and student-led campus programs through setup, registration desks, and attendee guidance.',
      qualities: ['Event Support', 'Campus Community', 'Reliability'],
    },
    {
      id: 'external-volunteering',
      category: 'Off-Campus',
      title: 'External Event Participation',
      description:
        'Contributing as an active volunteer in events outside campus—adapting quickly to new teams, welcoming participants, and assisting organizers.',
      qualities: ['External Events', 'Adaptability', 'Community Spirit'],
    },
    {
      id: 'coordination-teamwork',
      category: 'Operations',
      title: 'Coordination & Team Collaboration',
      description:
        'Working closely with fellow volunteers and event leads to keep schedules moving, solve logistical bottlenecks, and communicate clearly under pressure.',
      qualities: ['Team Collaboration', 'Communication', 'Responsibility'],
    },
  ] as VolunteeringPillar[],
};

export const beyondTheCodeData = {
  heading: 'Beyond the Code',
  subtitle:
    'Discipline, teamwork, and curiosity do not stop at a desk. Outside engineering and coding, sport, endurance training, and community keep me grounded.',
  /**
   * Replace any imageUrl below with your own personal photographs in /public/images/
   * whenever you are ready.
   */
  items: [
    {
      id: 'football',
      kicker: 'Football',
      title: 'Teamwork, strategy & match intensity.',
      description:
        'Football teaches spatial awareness, split-second decision-making, and trust across every teammate on the pitch—values that carry straight into engineering collaboration.',
      imageUrl: '/src/assets/images/beyond_football_soccer_1795327106159.jpg',
      imageAlt: 'Match football on a green turf pitch under evening floodlights',
      focusTag: 'Strategy · Competitive Spirit',
    },
    {
      id: 'marathon',
      kicker: 'Athletics & Marathon Running',
      title: 'Endurance, pacing & quiet discipline.',
      description:
        'Training for long distances and participating in marathon running builds patience, mental composure, and steady consistency—mile after mile.',
      imageUrl: '/src/assets/images/beyond_marathon_1795327082801.jpg',
      imageAlt: 'Running shoes on an athletics track lane at early dawn',
      focusTag: 'Endurance · Athletics',
    },
    {
      id: 'fitness',
      kicker: 'Fitness',
      title: 'Strength training & an active lifestyle.',
      description:
        'Consistent gym sessions and physical conditioning keep energy high, sharpen focus for long build sprints, and reinforce daily self-discipline.',
      imageUrl: '/src/assets/images/beyond_fitness_1795327081977.jpg',
      imageAlt: 'Cast-iron dumbbells and kettlebell arranged on dark gym flooring',
      focusTag: 'Gym Training · Consistency',
    },
    {
      id: 'community',
      kicker: 'Community',
      title: 'Showing up inside & outside campus.',
      description:
        'Volunteering at university and community events keeps me connected to people, shared goals, and practical service beyond the screen.',
      imageUrl: '/src/assets/images/beyond_community_1795327081847.jpg',
      imageAlt: 'Event volunteer coordination notebook, schedule checklist, and lanyards',
      focusTag: 'Volunteering · Shared Impact',
    },
  ] as BeyondInterestItem[],
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    items: [
      { name: 'C', iconKey: 'terminal' },
      { name: 'C++', iconKey: 'cpu' },
      { name: 'Java / Kotlin', iconKey: 'smartphone' },
      { name: 'JavaScript', iconKey: 'braces' },
    ],
  },
  {
    id: 'tools',
    title: 'Development Tools',
    items: [
      { name: 'Git & GitHub', iconKey: 'git-branch' },
      { name: 'VS Code', iconKey: 'code-2' },
      { name: 'Android Studio', iconKey: 'layers' },
      { name: 'Arduino IDE', iconKey: 'wrench' },
    ],
  },
  {
    id: 'hardware',
    title: 'Hardware & Robotics',
    items: [
      { name: 'ESP32', iconKey: 'microchip' },
      { name: 'Sensors', iconKey: 'radar' },
      { name: 'Motor Drivers', iconKey: 'cog' },
      { name: 'Bluetooth Low Energy (BLE)', iconKey: 'bluetooth' },
    ],
  },
  {
    id: 'professional',
    title: 'Professional Skills',
    items: [
      { name: 'Leadership', iconKey: 'compass' },
      { name: 'Team Building', iconKey: 'users' },
      { name: 'Public Speaking', iconKey: 'mic' },
      { name: 'Project Management', iconKey: 'kanban' },
      { name: 'Problem Solving', iconKey: 'lightbulb' },
      { name: 'Team Collaboration', iconKey: 'handshake' },
    ],
  },
  {
    id: 'creative',
    title: 'Creative Skills',
    items: [
      { name: 'Video Editing', iconKey: 'film' },
      { name: 'Photo Editing', iconKey: 'image' },
    ],
  },
];

export const achievementsData = {
  heading: 'Milestones & recognition.',
  primaryMilestone: {
    role: 'Contestant & Presenter',
    event: 'Student Idea and Project Showcase Competition',
    description:
      'Presented innovative engineering concepts and research frameworks before a panel of academic judges.',
    presentedConcepts: [
      {
        title: 'AI-Based Smart Green Campus',
        summary:
          'Renewable-energy distribution framework exploring AI-assisted optimization across university buildings.',
        projectId: 'smart-green-campus',
      },
      {
        title: 'Bioethanol from Agricultural Waste',
        summary:
          'Bangladesh-focused sustainability pitch evaluating crop residue conversion into cleaner biofuel.',
        projectId: 'bioethanol-agri-waste',
      },
    ],
  },
};

export const contactConfig = {
  heading: "Have an idea? Let's build something together.",
  intro:
    "Whether you're looking for an ambitious CSE intern, collaborating on a robotics or app build, or organizing an event—my inbox is always open.",
  /**
   * EmailJS Configuration (Optional for direct in-browser sending):
   * 1. Create a free account at https://www.emailjs.com/
   * 2. Connect your email service and create a template with variables:
   *    {{from_name}}, {{reply_to}}, {{message}}
   * 3. Fill in serviceId, templateId, and publicKey below.
   * When left empty, the form automatically provides an honest, pre-filled
   * mailto composer fallback directly addressed to ratulhasan01715@gmail.com.
   */
  emailJs: {
    serviceId: '',
    templateId: '',
    publicKey: '',
  },
};

export const creativeActivitiesData = {
  heading: 'Creative & Cultural Activities',
  featured: {
    role: 'Actor',
    context: 'Tribute to University Seniors',
    title: 'University Short Film',
    description:
      'Participated as an actor in a university short film dedicated to our seniors, gaining creative experience and exploring storytelling through performance.',
    ctaLabel: 'Watch Film',
    videoUrl: 'https://www.facebook.com/share/v/1Ezv3zc1t7/',
  },
};

