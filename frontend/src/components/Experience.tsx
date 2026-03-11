import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Trophy, Calendar, MapPin, Code2 } from 'lucide-react';
import { fadeInUp, staggerContainer, viewportOnce } from '../lib/animations';
import type { Experience as ExperienceType } from '../types';


interface ExperienceItemProps {
    experience: ExperienceType;
    index: number;
}

function ExperienceItem({ experience, index }: ExperienceItemProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
        });
    };

    const getIcon = () => {
        switch (experience.type) {
            case 'education':
                return <GraduationCap className="w-5 h-5" />;
            case 'achievement':
                return <Trophy className="w-5 h-5" />;
            case 'hackathon':
                return <Code2 className="w-5 h-5" />;
            default:
                return <Briefcase className="w-5 h-5" />;
        }
    };

    const getLabel = () => {
        switch (experience.type) {
            case 'work':
                return 'Work';
            case 'education':
                return 'Education';
            case 'achievement':
                return 'Leadership';
            case 'hackathon':
                return 'Hackathon';
            default:
                return experience.type;
        }
    };

    return (
        <motion.div
            variants={fadeInUp}
            className="bg-card-light dark:bg-card-dark rounded-xl p-5 border border-border-light dark:border-border-dark hover:border-primary/50 transition-colors h-full"
        >
            {/* Icon */}
            <div className="w-10 h-10 mb-4 flex items-center justify-center rounded-full bg-primary text-white">
                {getIcon()}
            </div>

            {/* Content */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <h4 className="text-lg font-bold">{experience.role}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {getLabel()}
                </span>
            </div>

            <p className="text-primary font-medium mb-2">
                {experience.type === 'work' ? 'at ' : experience.type === 'hackathon' ? '' : ''}{experience.company}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted-light dark:text-text-muted-dark mb-3">
                <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(experience.startDate)}
                    {' - '}
                    {experience.current ? 'Present' : experience.endDate ? formatDate(experience.endDate) : ''}
                </span>
                {experience.location && (
                    <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {experience.location}
                    </span>
                )}
            </div>

            <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                {experience.description}
            </p>

            {/* Tech Stack */}
            {experience.tech && experience.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {experience.tech.map((tech) => (
                        <span key={tech} className="tech-badge">
                            {tech}
                        </span>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

interface ExperienceProps {
    work: ExperienceType[];
    education: ExperienceType[];
    achievements: ExperienceType[];
    hackathons: ExperienceType[];
}

export function Experience({ work, education, achievements, hackathons }: ExperienceProps) {
    return (
        <section id="experience" className="section bg-background-light dark:bg-background-dark">
            <div className="container mx-auto px-4 md:px-6">
                {/* Work Experience */}
                {work.length > 0 && (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="mb-16"
                    >
                        <motion.h2 variants={fadeInUp} className="section-title">
                            Experience
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {work.map((exp, index) => (
                                <ExperienceItem key={exp._id} experience={exp} index={index} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="mb-16"
                    >
                        <motion.h2 variants={fadeInUp} className="section-title">
                            Education
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {education.map((exp, index) => (
                                <ExperienceItem key={exp._id} experience={exp} index={index} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Achievements / Volunteering */}
                {achievements.length > 0 && (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="mb-16"
                    >
                        <motion.h2 variants={fadeInUp} className="section-title">
                            Volunteering & Leadership
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {achievements.map((exp, index) => (
                                <ExperienceItem key={exp._id} experience={exp} index={index} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Hackathon Experiences */}
                {hackathons.length > 0 && (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >
                        <motion.h2 variants={fadeInUp} className="section-title">
                            Hackathon Experiences
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {hackathons.map((exp, index) => (
                                <ExperienceItem key={exp._id} experience={exp} index={index} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
