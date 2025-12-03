import { useParams, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react';
import { useFetch } from '../hooks';
import { getProject } from '../utils/api';
import { fadeInUp, staggerContainer } from '../lib/animations';

export function ProjectDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const { data: project, loading, error } = useFetch(
        useCallback(() => getProject(slug || ''), [slug]),
        [slug]
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="spinner" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4">
                <h1 className="text-2xl font-bold mb-4">Project not found</h1>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-8">
                    The project you're looking for doesn't exist.
                </p>
                <motion.button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home
                </motion.button>
            </div>
        );
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto"
                >
                    {/* Back Button */}
                    <motion.button
                        variants={fadeInUp}
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors mb-8"
                        whileHover={{ x: -5 }}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Projects
                    </motion.button>

                    {/* Project Header */}
                    <motion.div variants={fadeInUp} className="mb-8">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
                            <div className="flex items-center gap-3">
                                {(project.githubUrl || project.repoUrl) && (
                                    <motion.a
                                        href={project.githubUrl || project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Github className="w-5 h-5" />
                                    </motion.a>
                                )}
                                {project.liveUrl && (
                                    <motion.a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-medium"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        View Live
                                    </motion.a>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-text-muted-light dark:text-text-muted-dark">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(project.date)}
                            </span>
                            {project.featured && (
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                    Featured
                                </span>
                            )}
                        </div>
                    </motion.div>

                    {/* Project Image */}
                    {project.images.length > 0 && (
                        <motion.div
                            variants={fadeInUp}
                            className="rounded-2xl overflow-hidden mb-8 border border-border-light dark:border-border-dark"
                        >
                            <img
                                src={project.images[0]}
                                alt={project.title}
                                className="w-full"
                            />
                        </motion.div>
                    )}

                    {/* Description */}
                    <motion.div variants={fadeInUp} className="mb-8">
                        <h2 className="text-xl font-bold mb-4">About this project</h2>
                        <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed whitespace-pre-wrap">
                            {project.longDescription || project.description || project.shortDescription}
                        </p>
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div variants={fadeInUp}>
                        <h2 className="text-xl font-bold mb-4">Technologies used</h2>
                        <div className="flex flex-wrap gap-3">
                            {(project.technologies || project.tech || []).map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
