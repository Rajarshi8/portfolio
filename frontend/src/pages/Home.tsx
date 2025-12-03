import { useCallback } from 'react';
import { Hero, Projects, Experience, Skills, Contact } from '../components';
import { useFetch } from '../hooks';
import { getSiteData, getProjects, getExperience } from '../utils/api';

// Fallback data for when API is not available
const fallbackSite = {
    skills: [
        'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js',
        'MongoDB', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap',
        'Python', 'PHP', 'Git', 'Vercel'
    ],
};

const fallbackProjects = [
    {
        _id: '1',
        title: 'Fakebuster AI',
        slug: 'fakebuster-ai',
        description: 'A deepfake detection tool using advanced AI algorithms to analyze and identify manipulated media content.',
        technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Python', 'AI/ML'],
        images: [],
        liveUrl: 'https://somyadipghosh.is-a.dev/fakebuster/home.html',
        featured: true,
        order: 1,
        date: new Date().toISOString(),
    },
    {
        _id: '2',
        title: 'HireHub',
        slug: 'hirehub',
        description: 'AI-powered recruitment platform designed to streamline the hiring process.',
        technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
        images: [],
        liveUrl: 'https://somyadipghosh.is-a.dev/hirehub/',
        featured: true,
        order: 2,
        date: new Date().toISOString(),
    },
    {
        _id: '3',
        title: 'SynapseAudit',
        slug: 'synapseaudit',
        description: 'Security Audit SaaS Platform with automated code scanning, vulnerability detection, and real-time security monitoring.',
        technologies: ['React', 'Node.js', 'Appwrite', 'Clerk', 'Tailwind CSS'],
        images: [],
        liveUrl: 'https://synapseaudit.digidenone.tech/',
        githubUrl: 'https://github.com/Rajarshi8/SynapseAudit-Website',
        featured: true,
        order: 3,
        date: new Date().toISOString(),
    },
];

const fallbackExperience = {
    work: [
        {
            _id: '1',
            company: 'Digidenone',
            role: 'Developer',
            type: 'work' as const,
            startDate: '2025-06-01',
            current: true,
            description: 'Developing scalable web applications using modern frameworks and cloud technologies. Implementing AI/ML features to enhance user experience and automate business processes. Collaborating with cross-functional teams to deliver high-quality software solutions.',
            location: 'Remote',
            tech: ['Web Development', 'AI/ML', 'Cloud Technologies'],
            order: 1,
        },
        {
            _id: '2',
            company: 'SaiKet Systems',
            role: 'Frontend Developer Intern',
            type: 'work' as const,
            startDate: '2025-05-01',
            endDate: '2025-06-30',
            current: false,
            description: 'Designed and implemented responsive user interfaces using HTML, CSS, JavaScript, and modern frameworks. Optimized web application performance resulting in improved load times and user engagement. Collaborated with backend teams to integrate RESTful APIs and ensure seamless data flow.',
            location: 'Kalyani, West Bengal',
            tech: ['HTML', 'CSS', 'JavaScript', 'RESTful APIs'],
            order: 2,
        },
        {
            _id: '3',
            company: 'Team Byte Gurus',
            role: 'Developer',
            type: 'work' as const,
            startDate: '2024-09-01',
            current: true,
            description: 'Building innovative tech solutions as part of a collaborative development team. Contributing to full-stack projects utilizing MongoDB, Django, and modern web technologies.',
            location: 'Kalyani, West Bengal',
            tech: ['MongoDB', 'Django', 'Full-Stack Development'],
            order: 3,
        },
    ],
    education: [
        {
            _id: '4',
            company: "Saint Anthony's School",
            role: 'School Education',
            type: 'education' as const,
            startDate: '2008-01-01',
            endDate: '2023-05-01',
            current: false,
            description: 'Completed schooling.',
            location: 'India',
            order: 1,
        },
        {
            _id: '5',
            company: 'JIS College of Engineering',
            role: 'B.Tech in AI & Machine Learning',
            type: 'education' as const,
            startDate: '2023-08-01',
            current: true,
            description: 'Currently pursuing B.Tech in AI and Machine Learning.',
            location: 'West Bengal, India',
            order: 2,
        },
    ],
    achievements: [
        {
            _id: '6',
            company: 'Tech Defenders',
            role: 'Vice President',
            type: 'achievement' as const,
            startDate: '2024-05-01',
            current: true,
            description: 'As the Vice President and a core team member of Team Tech Defenders, I have successfully managed and coordinated multiple technical events, fostering innovation, collaboration, and community engagements.',
            location: 'JIS College of Engineering',
            tech: ['Event Management', 'Leadership'],
            order: 1,
        },
        {
            _id: '7',
            company: 'Team Byte Gurus',
            role: 'Team Leader & Founder',
            type: 'achievement' as const,
            startDate: '2024-09-01',
            current: true,
            description: 'As a core team member and team lead of Team Byte Gurus, I developed a Smart Classroom Management System aimed at streamlining academic operations and enhancing classroom efficiency, while also managing the entire team to ensure smooth collaboration and timely project delivery.',
            location: 'India',
            tech: ['Laravel', 'PHP', 'MySQL'],
            order: 2,
        },
        {
            _id: '8',
            company: 'InnovoCon 2025',
            role: 'Social Media Manager & Organizer',
            type: 'achievement' as const,
            startDate: '2024-12-01',
            endDate: '2025-02-28',
            current: false,
            description: 'Managed social media accounts and executed promotional strategies to enhance event visibility and engagement across digital platforms. Successfully increased audience reach and participation through targeted content and consistent branding.',
            location: 'JIS College of Engineering',
            tech: ['Social Media', 'Marketing'],
            order: 3,
        },
    ],
    hackathons: [
        {
            _id: '9',
            company: 'Team Byte Gurus',
            role: 'Smart India Hackathon 2024 - Internal Hackathon',
            type: 'hackathon' as const,
            startDate: '2024-08-01',
            endDate: '2024-08-31',
            current: false,
            description: 'Developed a Smart Classroom Management System website using Laravel, focusing on efficient classroom operations, user management, and real-time data handling.',
            location: 'JIS College of Engineering, August 2024',
            tech: ['Laravel', 'PHP', 'MySQL'],
            order: 1,
        },
        {
            _id: '10',
            company: 'Team codeARC',
            role: 'ICDMAI Hackathon 2024',
            type: 'hackathon' as const,
            startDate: '2025-01-01',
            endDate: '2025-01-31',
            current: false,
            description: 'Developed a real-time Attrition Prevention Dashboard using HTML, CSS, and JavaScript.',
            location: 'Adamas University, January 2025',
            tech: ['HTML', 'CSS', 'JavaScript'],
            order: 2,
        },
        {
            _id: '11',
            company: 'Team ByteGurus',
            role: 'Diversion 2K25',
            type: 'hackathon' as const,
            startDate: '2025-02-01',
            endDate: '2025-02-28',
            current: false,
            description: 'Designed and developed an AI Powered Financial advisory platform designed to help users make informed decisions regarding property investments and financial planning.',
            location: 'Institute of Engineering and Management, February 2025',
            tech: ['AI', 'Python', 'JavaScript'],
            order: 3,
        },
        {
            _id: '12',
            company: 'Organizer',
            role: 'InnovoCon 2025',
            type: 'hackathon' as const,
            startDate: '2025-02-01',
            endDate: '2025-02-28',
            current: false,
            description: 'I played a key role in organizing InnovoCon 2025, overseeing end-to-end planning and execution to ensure the event\'s overall success.',
            location: 'JIS College of Engineering, February 2025',
            tech: ['Event Management', 'Leadership'],
            order: 4,
        },
        {
            _id: '13',
            company: 'Team Xcelerate',
            role: 'Binary KGEC 2025',
            type: 'hackathon' as const,
            startDate: '2025-03-01',
            endDate: '2025-03-31',
            current: false,
            description: 'Developed a Smart Interview Management System website using PHP, aimed at streamlining interview scheduling, candidate tracking, and evaluation processes.',
            location: 'Kalyani Government Engineering College, March 2025',
            tech: ['PHP', 'MySQL'],
            order: 5,
        },
        {
            _id: '14',
            company: 'Team Pookies',
            role: 'Hack4Bengal 4.0 - Virtual Hack',
            type: 'hackathon' as const,
            startDate: '2025-04-01',
            endDate: '2025-04-30',
            current: false,
            description: 'We developed Fakebuster AI during Hack4Bengal 4.0 Virtual Hackathon, an innovative solution designed to detect and combat misinformation and fake content using advanced artificial intelligence techniques.',
            location: 'Virtual Hackathon, April 2025',
            tech: ['AI', 'Python', 'JavaScript'],
            order: 6,
        },
    ],
};

export function Home() {
    // Fetch data from API with fallbacks
    const { data: siteData } = useFetch(
        useCallback(() => getSiteData().catch(() => fallbackSite as any), []),
        []
    );

    const { data: projectsData } = useFetch(
        useCallback(() => getProjects().catch(() => ({ projects: fallbackProjects })), []),
        []
    );

    const { data: experienceData } = useFetch(
        useCallback(() => getExperience().catch(() => ({ grouped: fallbackExperience } as any)), []),
        []
    );

    const projects = projectsData?.projects || fallbackProjects;
    const skills = siteData?.skills || fallbackSite.skills;
    const experience = experienceData?.grouped || fallbackExperience;

    return (
        <>
            <Hero />
            <Projects projects={projects} />
            <Experience
                work={experience.work || []}
                education={experience.education || []}
                achievements={experience.achievements || []}
                hackathons={experience.hackathons || []}
            />
            <Skills skills={skills} />
            <Contact />
        </>
    );
}
