import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Project, Experience, Site } from '../models/index.js';
import { logger } from '../utils/logger.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(mongoURI);
    logger.info('Connected to MongoDB for seeding');

    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Experience.deleteMany({}),
      Site.deleteMany({}),
    ]);
    logger.info('Cleared existing data');

    // Seed Site Settings
    await Site.create({
      heroTitle: "Hey, I'm Rajarshi",
      heroSubtitle: 'Full Stack Developer',
      heroDescription: 'Full stack developer building scalable SaaS products and web apps. Hackathon participant, freelancer, and dev community leader passionate about impactful tech.',
      profileImage: '/img/profileop.jpg',
      resumeUrl: '/resume.pdf',
      location: 'West Bengal, India',
      currentRole: 'Web Developer',
      email: 'bhowmickrajarshi38@gmail.com',
      socialLinks: [
        { platform: 'github', url: 'https://github.com/Rajarshi8', icon: 'github' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/rajarshi-bhowmik-4419212b8', icon: 'linkedin' },
        { platform: 'twitter', url: 'https://x.com/Rajo_7811', icon: 'twitter' },
        { platform: 'email', url: 'mailto:bhowmickrajarshi38@gmail.com', icon: 'mail' },
      ],
      skills: [
        'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js',
        'MongoDB', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap',
        'Python', 'PHP', 'Laravel', 'Git', 'Vercel'
      ],
      aboutText: "I'm a full-stack web developer and AI enthusiast, currently studying AI and Machine Learning at JIS College of Engineering. With experience in frontend development, JavaScript, and backend technologies, I've contributed to several projects.",
      themeDefault: 'dark',
    });
    logger.info('Seeded site settings');

    // Seed Projects
    const projects = await Project.insertMany([
      {
        title: 'Fakebuster AI',
        slug: 'fakebuster-ai',
        shortDescription: 'A deepfake detection tool using advanced AI algorithms to analyze and identify manipulated media content.',
        longDescription: 'FakeBuster is a deepfake detection tool that uses advanced AI algorithms to analyze and identify manipulated media content. It can spot manipulated videos, images, and audio, even when the fakes are subtle. FakeBuster is mainly used in video conferencing and online media to expose synthetic or tampered content.',
        tech: ['React', 'JavaScript', 'Tailwind CSS', 'Python', 'AI/ML'],
        images: ['/img/projects/fakebuster.jpg'],
        liveUrl: 'https://somyadipghosh.is-a.dev/fakebuster/home.html',
        featured: true,
        order: 1,
      },
      {
        title: 'HireHub',
        slug: 'hirehub',
        shortDescription: 'AI-powered recruitment platform designed to streamline the hiring process.',
        longDescription: 'HireHub is an AI-powered recruitment platform designed to streamline the hiring process. It helps companies find, evaluate, and connect with top candidates faster by using automation and machine learning. The platform includes features like resume screening, candidate matching, and interview scheduling.',
        tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
        images: ['/img/projects/hirehub.jpg'],
        liveUrl: 'https://somyadipghosh.is-a.dev/hirehub/',
        featured: true,
        order: 2,
      },
      {
        title: 'Netflix Clone',
        slug: 'netflix-clone',
        shortDescription: 'A pixel-perfect Netflix clone built with HTML and CSS.',
        longDescription: 'A Netflix clone which looks exactly like Netflix. This project demonstrates front-end development skills using HTML and CSS to recreate the Netflix UI.',
        tech: ['HTML', 'CSS'],
        images: ['/img/projects/netflix.jpg'],
        liveUrl: 'https://netflixclone-nine-mu.vercel.app/',
        featured: true,
        order: 3,
      },
      {
        title: 'Smart Classroom Management',
        slug: 'smart-classroom',
        shortDescription: 'Smart Classroom Management System for streamlining academic operations.',
        longDescription: 'Developed for Smart India Hackathon 2024, this system focuses on efficient classroom operations, user management, and real-time data handling with clean architecture, secure authentication, and responsive design.',
        tech: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
        images: [],
        featured: false,
        order: 4,
      },
    ]);
    logger.info(`Seeded ${projects.length} projects`);

    // Seed Experience
    const experiences = await Experience.insertMany([
      {
        company: 'Team Byte Gurus',
        role: 'UI Designer',
        type: 'work',
        startDate: new Date('2023-01-01'),
        current: true,
        description: 'Leading UI/UX design for various web projects and managing team collaboration.',
        location: 'Remote',
        tech: ['Figma', 'Adobe XD', 'HTML', 'CSS'],
        order: 1,
      },
      {
        company: 'Team CodeArc',
        role: 'Frontend Developer',
        type: 'work',
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-12-01'),
        current: false,
        description: 'Developed frontend solutions for web applications using modern JavaScript frameworks.',
        location: 'Remote',
        tech: ['React', 'JavaScript', 'Tailwind CSS'],
        order: 2,
      },
      {
        company: 'Tech Defenders',
        role: 'Vice President',
        type: 'work',
        startDate: new Date('2024-05-01'),
        current: true,
        description: 'Successfully managed and coordinated multiple technical events, fostering innovation, collaboration, and community engagements.',
        location: 'JIS College of Engineering',
        order: 3,
      },
      {
        company: 'JIS College of Engineering',
        role: 'B.Tech in AI & ML',
        type: 'education',
        startDate: new Date('2023-08-01'),
        current: true,
        description: 'Pursuing Bachelor of Technology in Computer Science with specialization in Artificial Intelligence and Machine Learning.',
        location: 'Kalyani, West Bengal',
        order: 1,
      },
      {
        company: "Saint Anthony's School",
        role: 'Higher Secondary Education',
        type: 'education',
        startDate: new Date('2008-01-01'),
        endDate: new Date('2023-05-01'),
        current: false,
        description: 'Completed primary and secondary education with focus on science and mathematics.',
        location: 'West Bengal',
        order: 2,
      },
      {
        company: 'Smart India Hackathon 2024',
        role: 'Internal Hackathon Nominee',
        type: 'achievement',
        startDate: new Date('2024-08-01'),
        description: 'Developed Smart Classroom Management System with Team Byte Gurus. Nominated for finals.',
        location: 'JIS College of Engineering',
        order: 1,
      },
      {
        company: 'ICDMAI Hackathon 2024',
        role: 'Participant',
        type: 'achievement',
        startDate: new Date('2025-01-01'),
        description: 'Developed real-time Attrition Prevention Dashboard with Team codeARC at Adamas University.',
        location: 'Adamas University',
        order: 2,
      },
      {
        company: 'Diversion 2K25',
        role: 'Participant',
        type: 'achievement',
        startDate: new Date('2025-02-01'),
        description: 'Designed AI Powered Financial advisory platform with Team ByteGurus at IEM.',
        location: 'Institute of Engineering and Management',
        order: 3,
      },
      {
        company: 'InnovoCon 2025',
        role: 'Organizer & Social Media Manager',
        type: 'achievement',
        startDate: new Date('2025-02-01'),
        description: 'Managed social media and organized the event end-to-end at JIS College of Engineering.',
        location: 'JIS College of Engineering',
        order: 4,
      },
      {
        company: 'Binary KGEC 2025',
        role: 'Participant',
        type: 'achievement',
        startDate: new Date('2025-03-01'),
        description: 'Developed Smart Interview Management System with Team Xcelerate.',
        location: 'Kalyani Government Engineering College',
        order: 5,
      },
      {
        company: 'Hack4Bengal 4.0',
        role: 'Participant',
        type: 'achievement',
        startDate: new Date('2025-04-01'),
        description: 'Developed Fakebuster AI with Team Pookies during virtual hackathon.',
        location: 'Virtual',
        order: 6,
      },
    ]);
    logger.info(`Seeded ${experiences.length} experience entries`);

    logger.info('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
