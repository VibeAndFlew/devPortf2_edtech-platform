export interface Course {
  id: string; title: string; description: string; category: string; level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: string; lessons: number; enrolled: number; rating: number; instructor: string;
  thumbnail: string; progress?: number; status: 'active' | 'draft' | 'archived';
  tags: string[]; price: number; certificate: boolean; startDate: string; syllabus: string[];
}

export interface LiveClass {
  id: string; title: string; course: string; instructor: string; date: string; time: string;
  duration: number; status: 'upcoming' | 'live' | 'recorded' | 'cancelled';
  attendees: number; maxAttendees: number; recording: string; description: string;
  materials: string[]; chatActive: boolean; qaActive: boolean;
}

export interface Student {
  id: string; name: string; email: string; avatar: string; enrolledCourses: number;
  completedCourses: number; totalHours: number; streak: number; joinDate: string;
  lastActive: string; achievements: string[]; points: number; level: number;
  status: 'active' | 'inactive' | 'suspended';
}

export interface Assignment {
  id: string; title: string; course: string; dueDate: string; maxScore: number;
  submitted: number; pending: number; type: 'quiz' | 'essay' | 'project' | 'coding' | 'presentation';
  status: 'open' | 'closed' | 'grading'; description: string; instructions: string;
}

export interface Certificate {
  id: string; studentName: string; courseName: string; issueDate: string; expiryDate: string;
  credentialId: string; status: 'valid' | 'expired' | 'revoked'; skills: string[];
  grade: string; issuer: string; hoursCompleted: number;
}

export interface TutorSession {
  id: string; studentName: string; subject: string; status: 'requested' | 'active' | 'completed' | 'cancelled';
  duration: number; rating?: number; topics: string[]; timestamp: string; mode: 'chat' | 'voice';
  messages: { role: 'student' | 'tutor'; content: string; timestamp: string }[];
}

export interface Activity {
  id: string; type: 'enrolled' | 'completed' | 'achievement' | 'live_class' | 'certificate' | 'assignment';
  title: string; description: string; timestamp: string; icon?: string;
}

export const courses: Course[] = [
  { id: 'c1', title: 'Python Fundamentals', description: 'Learn Python from scratch with hands-on projects', category: 'Programming', level: 'beginner', duration: '8 weeks', lessons: 24, enrolled: 1234, rating: 4.8, instructor: 'Dr. Sarah Chen', thumbnail: '/courses/python.svg', progress: 65, status: 'active', tags: ['python', 'beginner', 'scripting'], price: 0, certificate: true, startDate: '2026-06-01', syllabus: ['Variables', 'Loops', 'Functions', 'OOP', 'Modules'] },
  { id: 'c2', title: 'React & Next.js Mastery', description: 'Build production-ready web apps with React and Next.js', category: 'Programming', level: 'intermediate', duration: '12 weeks', lessons: 36, enrolled: 892, rating: 4.9, instructor: 'Alex Rivera', thumbnail: '/courses/react.svg', progress: 30, status: 'active', tags: ['react', 'nextjs', 'typescript'], price: 49.99, certificate: true, startDate: '2026-05-15', syllabus: ['JSX', 'Components', 'State', 'Routing', 'SSR'] },
  { id: 'c3', title: 'UI/UX Design Principles', description: 'Master modern design systems and user experience', category: 'Design', level: 'beginner', duration: '6 weeks', lessons: 18, enrolled: 1567, rating: 4.7, instructor: 'Maya Johnson', thumbnail: '/courses/design.svg', progress: 80, status: 'active', tags: ['design', 'figma', 'ux'], price: 0, certificate: true, startDate: '2026-06-10', syllabus: ['Typography', 'Color', 'Layout', 'Prototyping', 'Testing'] },
  { id: 'c4', title: 'Data Science with Python', description: 'Analyze data and build ML models using Python', category: 'Data Science', level: 'intermediate', duration: '10 weeks', lessons: 30, enrolled: 678, rating: 4.6, instructor: 'Dr. Sarah Chen', thumbnail: '/courses/datascience.svg', progress: 0, status: 'active', tags: ['python', 'data', 'ml'], price: 79.99, certificate: true, startDate: '2026-07-01', syllabus: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Deep Learning'] },
  { id: 'c5', title: 'Digital Marketing 101', description: 'Grow your brand with modern digital marketing', category: 'Business', level: 'beginner', duration: '4 weeks', lessons: 12, enrolled: 2341, rating: 4.5, instructor: 'Mark Williams', thumbnail: '/courses/marketing.svg', status: 'active', tags: ['marketing', 'seo', 'social'], price: 0, certificate: false, startDate: '2026-05-20', syllabus: ['SEO', 'Content', 'Analytics', 'Ads'] },
  { id: 'c6', title: 'Advanced TypeScript', description: 'Deep dive into TypeScript advanced patterns', category: 'Programming', level: 'advanced', duration: '8 weeks', lessons: 20, enrolled: 445, rating: 4.9, instructor: 'Alex Rivera', thumbnail: '/courses/typescript.svg', progress: 15, status: 'active', tags: ['typescript', 'patterns', 'advanced'], price: 89.99, certificate: true, startDate: '2026-06-15', syllabus: ['Generics', 'Decorators', 'Utility Types', 'Module Augmentation', 'Compiler API'] },
  { id: 'c7', title: 'Machine Learning A-Z', description: 'Comprehensive ML course from basics to advanced', category: 'Data Science', level: 'advanced', duration: '16 weeks', lessons: 48, enrolled: 234, rating: 4.8, instructor: 'Dr. Sarah Chen', thumbnail: '/courses/ml.svg', status: 'active', tags: ['ml', 'python', 'ai'], price: 149.99, certificate: true, startDate: '2026-08-01', syllabus: ['Regression', 'Classification', 'Clustering', 'NLP', 'Reinforcement Learning'] },
  { id: 'c8', title: 'Spanish for Beginners', description: 'Start speaking Spanish with confidence', category: 'Languages', level: 'beginner', duration: '8 weeks', lessons: 24, enrolled: 3456, rating: 4.6, instructor: 'Carmen Lopez', thumbnail: '/courses/spanish.svg', progress: 45, status: 'active', tags: ['spanish', 'language', 'conversation'], price: 0, certificate: true, startDate: '2026-05-01', syllabus: ['Greetings', 'Grammar', 'Vocabulary', 'Culture', 'Conversation'] },
  { id: 'c9', title: 'System Design & Architecture', description: 'Design scalable distributed systems', category: 'Programming', level: 'expert', duration: '10 weeks', lessons: 25, enrolled: 156, rating: 4.9, instructor: 'Dr. James Park', thumbnail: '/courses/systemdesign.svg', status: 'draft', tags: ['architecture', 'distributed', 'scalability'], price: 199.99, certificate: true, startDate: '2026-09-01', syllabus: ['Microservices', 'Caching', 'Databases', 'Message Queues', 'Monitoring'] },
  { id: 'c10', title: 'Japanese Intermediate', description: 'Take your Japanese to the next level', category: 'Languages', level: 'intermediate', duration: '12 weeks', lessons: 30, enrolled: 567, rating: 4.7, instructor: 'Yuki Tanaka', thumbnail: '/courses/japanese.svg', status: 'active', tags: ['japanese', 'language', 'intermediate'], price: 29.99, certificate: true, startDate: '2026-07-15', syllabus: ['Kanji', 'Grammar', 'Reading', 'Listening', 'Speaking'] },
  { id: 'c11', title: 'Business Strategy', description: 'Develop strategic thinking for business growth', category: 'Business', level: 'advanced', duration: '6 weeks', lessons: 15, enrolled: 789, rating: 4.4, instructor: 'Mark Williams', thumbnail: '/courses/strategy.svg', status: 'active', tags: ['strategy', 'business', 'leadership'], price: 59.99, certificate: true, startDate: '2026-06-20', syllabus: ['Analysis', 'Strategy', 'Execution', 'Innovation', 'Growth'] },
  { id: 'c12', title: 'Motion Design with Framer Motion', description: 'Create beautiful animations for web', category: 'Design', level: 'intermediate', duration: '4 weeks', lessons: 12, enrolled: 1123, rating: 4.8, instructor: 'Maya Johnson', thumbnail: '/courses/motion.svg', progress: 10, status: 'active', tags: ['animation', 'react', 'framer'], price: 0, certificate: false, startDate: '2026-05-25', syllabus: ['Layout', 'Gestures', 'Variants', 'Scroll', 'SVG'] },
];

export const liveClasses: LiveClass[] = [
  { id: 'l1', title: 'Python Q&A Session', course: 'Python Fundamentals', instructor: 'Dr. Sarah Chen', date: '2026-05-22', time: '15:00', duration: 60, status: 'live', attendees: 234, maxAttendees: 500, recording: '', description: 'Weekly Q&A for Python students', materials: ['slides.pdf'], chatActive: true, qaActive: true },
  { id: 'l2', title: 'React Hooks Deep Dive', course: 'React & Next.js Mastery', instructor: 'Alex Rivera', date: '2026-05-25', time: '18:00', duration: 90, status: 'upcoming', attendees: 0, maxAttendees: 300, recording: '', description: 'Deep dive into useEffect, useMemo, custom hooks', materials: ['code-examples.zip'], chatActive: true, qaActive: true },
  { id: 'l3', title: 'Design Systems Workshop', course: 'UI/UX Design Principles', instructor: 'Maya Johnson', date: '2026-05-20', time: '14:00', duration: 120, status: 'recorded', attendees: 345, maxAttendees: 400, recording: 'https://example.com/recording/1', description: 'Build a design system from scratch', materials: ['figma-file.fig'], chatActive: false, qaActive: false },
  { id: 'l4', title: 'Data Cleaning Techniques', course: 'Data Science with Python', instructor: 'Dr. Sarah Chen', date: '2026-05-28', time: '16:00', duration: 60, status: 'upcoming', attendees: 0, maxAttendees: 250, recording: '', description: 'Hands-on data cleaning with pandas', materials: ['notebook.ipynb'], chatActive: true, qaActive: true },
  { id: 'l5', title: 'SEO Best Practices', course: 'Digital Marketing 101', instructor: 'Mark Williams', date: '2026-05-18', time: '11:00', duration: 45, status: 'recorded', attendees: 567, maxAttendees: 600, recording: 'https://example.com/recording/2', description: 'Latest SEO strategies for 2026', materials: ['checklist.pdf'], chatActive: false, qaActive: false },
  { id: 'l6', title: 'TypeScript Generics Explained', course: 'Advanced TypeScript', instructor: 'Alex Rivera', date: '2026-06-01', time: '17:00', duration: 90, status: 'upcoming', attendees: 0, maxAttendees: 200, recording: '', description: 'Master TypeScript generics with real examples', materials: ['exercises.ts'], chatActive: true, qaActive: true },
  { id: 'l7', title: 'Spanish Conversation Practice', course: 'Spanish for Beginners', instructor: 'Carmen Lopez', date: '2026-05-19', time: '10:00', duration: 60, status: 'recorded', attendees: 789, maxAttendees: 800, recording: 'https://example.com/recording/3', description: 'Practice Spanish conversation in small groups', materials: [], chatActive: false, qaActive: false },
  { id: 'l8', title: 'ML Models Deployment', course: 'Machine Learning A-Z', instructor: 'Dr. Sarah Chen', date: '2026-06-05', time: '15:00', duration: 120, status: 'upcoming', attendees: 0, maxAttendees: 150, recording: '', description: 'Deploy ML models to production', materials: ['deployment-guide.pdf', 'sample-app.zip'], chatActive: true, qaActive: true },
  { id: 'l9', title: 'Cancelled: Business Strategy', course: 'Business Strategy', instructor: 'Mark Williams', date: '2026-05-15', time: '13:00', duration: 60, status: 'cancelled', attendees: 0, maxAttendees: 100, recording: '', description: 'Scheduled strategy session', materials: [], chatActive: false, qaActive: false },
];

export const students: Student[] = [
  { id: 's1', name: 'Vibhanshu Buldeo', email: 'v.buldeo@eduverse.io', avatar: '/avatars/1.svg', enrolledCourses: 6, completedCourses: 2, totalHours: 84, streak: 12, joinDate: '2026-01-15', lastActive: '2026-05-22', achievements: ['Quick Learner', 'Streak Master', 'Course Completer'], points: 4580, level: 7, status: 'active' },
  { id: 's2', name: 'Emily Davis', email: 'emily@example.com', avatar: '/avatars/2.svg', enrolledCourses: 4, completedCourses: 1, totalHours: 42, streak: 5, joinDate: '2026-02-20', lastActive: '2026-05-21', achievements: ['Early Bird'], points: 2100, level: 4, status: 'active' },
  { id: 's3', name: 'Michael Brown', email: 'michael@example.com', avatar: '/avatars/3.svg', enrolledCourses: 8, completedCourses: 3, totalHours: 120, streak: 23, joinDate: '2025-11-01', lastActive: '2026-05-22', achievements: ['Quick Learner', 'Streak Master', 'Top Performer', 'Helping Hand'], points: 8900, level: 12, status: 'active' },
  { id: 's4', name: 'Sophia Wilson', email: 'sophia@example.com', avatar: '/avatars/4.svg', enrolledCourses: 3, completedCourses: 0, totalHours: 28, streak: 0, joinDate: '2026-04-10', lastActive: '2026-05-20', achievements: [], points: 950, level: 2, status: 'active' },
  { id: 's5', name: 'James Taylor', email: 'james@example.com', avatar: '/avatars/5.svg', enrolledCourses: 5, completedCourses: 1, totalHours: 56, streak: 8, joinDate: '2026-01-05', lastActive: '2026-05-22', achievements: ['Course Completer'], points: 3200, level: 5, status: 'active' },
  { id: 's6', name: 'Olivia Martinez', email: 'olivia@example.com', avatar: '/avatars/6.svg', enrolledCourses: 7, completedCourses: 4, totalHours: 150, streak: 45, joinDate: '2025-09-15', lastActive: '2026-05-22', achievements: ['Quick Learner', 'Streak Master', 'Course Completer', 'Top Performer', 'Helping Hand', 'Mentor'], points: 15200, level: 18, status: 'active' },
  { id: 's7', name: 'William Anderson', email: 'william@example.com', avatar: '/avatars/7.svg', enrolledCourses: 2, completedCourses: 0, totalHours: 15, streak: 3, joinDate: '2026-05-01', lastActive: '2026-05-21', achievements: [], points: 450, level: 1, status: 'active' },
  { id: 's8', name: 'Emma Thomas', email: 'emma@example.com', avatar: '/avatars/8.svg', enrolledCourses: 9, completedCourses: 5, totalHours: 180, streak: 67, joinDate: '2025-06-01', lastActive: '2026-05-22', achievements: ['Quick Learner', 'Streak Master', 'Course Completer', 'Top Performer', 'Mentor'], points: 21000, level: 22, status: 'active' },
  { id: 's9', name: 'Daniel Garcia', email: 'daniel@example.com', avatar: '/avatars/9.svg', enrolledCourses: 4, completedCourses: 2, totalHours: 60, streak: 0, joinDate: '2026-03-15', lastActive: '2026-05-15', achievements: ['Course Completer'], points: 1800, level: 3, status: 'inactive' },
  { id: 's10', name: 'Ava Robinson', email: 'ava@example.com', avatar: '/avatars/10.svg', enrolledCourses: 1, completedCourses: 0, totalHours: 8, streak: 1, joinDate: '2026-05-20', lastActive: '2026-05-22', achievements: [], points: 200, level: 1, status: 'active' },
  { id: 's11', name: 'Henry Clark', email: 'henry@example.com', avatar: '/avatars/11.svg', enrolledCourses: 6, completedCourses: 2, totalHours: 72, streak: 14, joinDate: '2025-12-01', lastActive: '2026-05-21', achievements: ['Quick Learner', 'Streak Master'], points: 4100, level: 6, status: 'active' },
  { id: 's12', name: 'Mia Lewis', email: 'mia@example.com', avatar: '/avatars/12.svg', enrolledCourses: 3, completedCourses: 1, totalHours: 35, streak: 6, joinDate: '2026-02-01', lastActive: '2026-05-22', achievements: ['Early Bird'], points: 1100, level: 2, status: 'suspended' },
];

export const assignments: Assignment[] = [
  { id: 'a1', title: 'Python Variables Quiz', course: 'Python Fundamentals', dueDate: '2026-05-25', maxScore: 100, submitted: 45, pending: 23, type: 'quiz', status: 'open', description: 'Test your knowledge of Python variables', instructions: 'Answer all 10 questions' },
  { id: 'a2', title: 'React Component Project', course: 'React & Next.js Mastery', dueDate: '2026-06-01', maxScore: 100, submitted: 12, pending: 34, type: 'project', status: 'open', description: 'Build a reusable component library', instructions: 'Create 5 React components with TypeScript' },
  { id: 'a3', title: 'Design System Audit', course: 'UI/UX Design Principles', dueDate: '2026-05-20', maxScore: 100, submitted: 89, pending: 5, type: 'essay', status: 'grading', description: 'Audit an existing design system', instructions: 'Submit a 2-page audit report' },
  { id: 'a4', title: 'Data Analysis Report', course: 'Data Science with Python', dueDate: '2026-06-10', maxScore: 100, submitted: 3, pending: 45, type: 'project', status: 'open', description: 'Analyze the provided dataset', instructions: 'Use pandas to analyze and visualize' },
  { id: 'a5', title: 'Marketing Campaign Plan', course: 'Digital Marketing 101', dueDate: '2026-05-15', maxScore: 100, submitted: 120, pending: 15, type: 'presentation', status: 'closed', description: 'Create a marketing campaign plan', instructions: '5-10 slide presentation' },
  { id: 'a6', title: 'TypeScript Utility Types', course: 'Advanced TypeScript', dueDate: '2026-06-20', maxScore: 100, submitted: 8, pending: 12, type: 'coding', status: 'open', description: 'Implement advanced utility types', instructions: 'Complete the coding exercises' },
  { id: 'a7', title: 'ML Model Comparison', course: 'Machine Learning A-Z', dueDate: '2026-06-15', maxScore: 100, submitted: 5, pending: 28, type: 'project', status: 'open', description: 'Compare 3 ML models on a dataset', instructions: 'Train and evaluate models' },
  { id: 'a8', title: 'Spanish Vocabulary Test', course: 'Spanish for Beginners', dueDate: '2026-05-22', maxScore: 100, submitted: 156, pending: 45, type: 'quiz', status: 'grading', description: 'Test your Spanish vocabulary', instructions: 'Complete the vocabulary quiz' },
];

export const certificates: Certificate[] = [
  { id: 'cert1', studentName: 'Vibhanshu Buldeo', courseName: 'Python Fundamentals', issueDate: '2026-04-15', expiryDate: '2029-04-15', credentialId: 'CERT-PY-2026-001', status: 'valid', skills: ['Python', 'OOP', 'Debugging'], grade: 'A', issuer: 'Eduverse', hoursCompleted: 40 },
  { id: 'cert2', studentName: 'Vibhanshu Buldeo', courseName: 'UI/UX Design Principles', issueDate: '2026-05-01', expiryDate: '2029-05-01', credentialId: 'CERT-UX-2026-002', status: 'valid', skills: ['Figma', 'Typography', 'Prototyping'], grade: 'A-', issuer: 'Eduverse', hoursCompleted: 30 },
  { id: 'cert3', studentName: 'Emily Davis', courseName: 'Python Fundamentals', issueDate: '2026-03-20', expiryDate: '2029-03-20', credentialId: 'CERT-PY-2026-003', status: 'valid', skills: ['Python', 'Algorithms'], grade: 'B+', issuer: 'Eduverse', hoursCompleted: 35 },
  { id: 'cert4', studentName: 'Michael Brown', courseName: 'Digital Marketing 101', issueDate: '2025-12-01', expiryDate: '2028-12-01', credentialId: 'CERT-MK-2025-004', status: 'valid', skills: ['SEO', 'Content Strategy', 'Analytics'], grade: 'A', issuer: 'Eduverse', hoursCompleted: 25 },
  { id: 'cert5', studentName: 'Sophia Wilson', courseName: 'Spanish for Beginners', issueDate: '2024-01-15', expiryDate: '2027-01-15', credentialId: 'CERT-SP-2024-005', status: 'expired', skills: ['Spanish', 'Conversation'], grade: 'B', issuer: 'Eduverse', hoursCompleted: 30 },
  { id: 'cert6', studentName: 'Olivia Martinez', courseName: 'React & Next.js Mastery', issueDate: '2026-04-01', expiryDate: '2029-04-01', credentialId: 'CERT-RN-2026-006', status: 'valid', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind'], grade: 'A+', issuer: 'Eduverse', hoursCompleted: 60 },
];

export const tutorSessions: TutorSession[] = [
  { id: 't1', studentName: 'Vibhanshu Buldeo', subject: 'Python', status: 'active', duration: 25, topics: ['Loops', 'Functions'], timestamp: '2026-05-22T14:30:00Z', mode: 'chat', messages: [
    { role: 'student', content: 'Hi! I need help with Python functions', timestamp: '2026-05-22T14:30:00Z' },
    { role: 'tutor', content: 'Sure! What specifically are you struggling with?', timestamp: '2026-05-22T14:30:15Z' },
    { role: 'student', content: 'I dont understand how return values work', timestamp: '2026-05-22T14:31:00Z' },
    { role: 'tutor', content: 'Great question! A return value is what a function sends back to the caller. Think of it like a vending machine - you put in input, and it returns a product.', timestamp: '2026-05-22T14:31:30Z' },
  ]},
  { id: 't2', studentName: 'Emily Davis', subject: 'React', status: 'completed', duration: 45, rating: 5, topics: ['Hooks', 'State Management'], timestamp: '2026-05-21T10:00:00Z', mode: 'chat', messages: [
    { role: 'student', content: 'Can you explain useEffect?', timestamp: '2026-05-21T10:00:00Z' },
    { role: 'tutor', content: 'Of course! useEffect lets you perform side effects in function components.', timestamp: '2026-05-21T10:00:20Z' },
  ]},
  { id: 't3', studentName: 'Michael Brown', subject: 'Data Science', status: 'completed', duration: 60, rating: 5, topics: ['Pandas', 'Data Cleaning'], timestamp: '2026-05-20T15:00:00Z', mode: 'voice', messages: [
    { role: 'student', content: 'How do I handle missing values in pandas?', timestamp: '2026-05-20T15:00:00Z' },
    { role: 'tutor', content: 'Use df.dropna() to remove them or df.fillna() to replace them with a value.', timestamp: '2026-05-20T15:00:30Z' },
  ]},
  { id: 't4', studentName: 'Sophia Wilson', subject: 'Design', status: 'requested', duration: 0, topics: ['Color Theory'], timestamp: '2026-05-22T16:00:00Z', mode: 'chat', messages: [] },
  { id: 't5', studentName: 'James Taylor', subject: 'TypeScript', status: 'completed', duration: 30, rating: 4, topics: ['Types', 'Interfaces'], timestamp: '2026-05-19T09:00:00Z', mode: 'chat', messages: [
    { role: 'student', content: 'Whats the difference between type and interface?', timestamp: '2026-05-19T09:00:00Z' },
    { role: 'tutor', content: 'Interfaces can be extended/merged, types are aliases. Use interfaces for objects, types for unions/primitives.', timestamp: '2026-05-19T09:00:25Z' },
  ]},
  { id: 't6', studentName: 'Olivia Martinez', subject: 'Python', status: 'cancelled', duration: 0, topics: ['Async/Await'], timestamp: '2026-05-18T14:00:00Z', mode: 'voice', messages: [] },
];

export const activities: Activity[] = [
  { id: 'act1', type: 'completed', title: 'Completed Python Quiz', description: 'Scored 95% on Variables Quiz', timestamp: '2 hours ago' },
  { id: 'act2', type: 'achievement', title: 'Streak Master Unlocked', description: 'Maintained a 7-day learning streak', timestamp: '5 hours ago' },
  { id: 'act3', type: 'live_class', title: 'Joined Python Q&A', description: 'Attended live session with Dr. Chen', timestamp: '1 day ago' },
  { id: 'act4', type: 'enrolled', title: 'Enrolled in Motion Design', description: 'Started Framer Motion course', timestamp: '2 days ago' },
  { id: 'act5', type: 'assignment', title: 'Submitted Design Audit', description: 'Design System Audit submitted', timestamp: '3 days ago' },
  { id: 'act6', type: 'certificate', title: 'Earned Python Certificate', description: 'Completed Python Fundamentals with A grade', timestamp: '5 days ago' },
  { id: 'act7', type: 'completed', title: 'Completed React Module', description: 'Finished React Hooks chapter', timestamp: '1 week ago' },
  { id: 'act8', type: 'achievement', title: 'Quick Learner Badge', description: 'Completed 5 lessons in one day', timestamp: '1 week ago' },
];

export const currentStudent: Student = students[0];
