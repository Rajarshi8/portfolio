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
        title: 'Netflix Clone',
        slug: 'netflix-clone',
        description: 'A pixel-perfect Netflix clone built with HTML and CSS.',
        technologies: ['HTML', 'CSS'],
        images: [],
        liveUrl: 'https://netflixclone-nine-mu.vercel.app/',
        featured: true,
        order: 3,
        date: new Date().toISOString(),
    },
];

const fallbackExperience = {
    work: [
        {
            _id: '1',
            company: 'Team Byte Gurus',
            role: 'UI Designer',
            type: 'work' as const,
            startDate: '2023-01-01',
            current: true,
            description: 'Leading UI/UX design for various web projects.',
            location: 'Remote',
            tech: ['Figma', 'Adobe XD', 'HTML', 'CSS'],
            order: 1,
        },
    ],
    education: [
        {
            _id: '2',
            company: 'JIS College of Engineering',
            role: 'B.Tech in AI & ML',
            type: 'education' as const,
            startDate: '2023-08-01',
            current: true,
            description: 'Pursuing Bachelor of Technology in Computer Science with specialization in Artificial Intelligence and Machine Learning.',
            location: 'Kalyani, West Bengal',
            order: 1,
        },
    ],
    achievements: [
        {
            _id: '3',
            company: 'Tech Defenders',
            role: 'Vice President',
            type: 'achievement' as const,
            startDate: '2024-05-01',
            current: true,
            description: 'Managing and coordinating multiple technical events, fostering innovation and collaboration.',
            location: 'JIS College of Engineering',
            order: 1,
        },
    ],
    hackathons: [
        {
            _id: '4',
            company: 'Team Pookies',
            role: 'Hack4Bengal 4.0 - Virtual Hack',
            type: 'hackathon' as const,
            startDate: '2025-04-01',
            current: false,
            description: 'Developed Fakebuster AI during virtual hackathon.',
            location: 'Virtual Hackathon, April 2025',
            order: 1,
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
