import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { fadeInUp, staggerContainer, cardHover, viewportOnce } from '../lib/animations';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        className="bg-card-light dark:bg-card-dark rounded-2xl border border-border-light dark:border-border-dark overflow-hidden h-full flex flex-col"
      >
        {/* Project Image/Preview */}
        {project.images.length > 0 && (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Title & Links */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              {(project.githubUrl || project.repoUrl) && (
                <motion.a
                  href={project.githubUrl || project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-surface-light dark:bg-surface-dark hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github className="w-4 h-4" />
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-surface-light dark:bg-surface-dark hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`View ${project.title} live`}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-text-muted-light dark:text-text-muted-dark text-sm leading-relaxed mb-4 flex-1">
            {project.shortDescription || project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {(project.technologies || project.tech || []).slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="tech-badge"
              >
                {tech}
              </span>
            ))}
            {(project.technologies || project.tech || []).length > 5 && (
              <span className="tech-badge">+{(project.technologies || project.tech || []).length - 5}</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

interface ProjectsProps {
  projects: Project[];
  showAll?: boolean;
}

export function Projects({ projects, showAll = false }: ProjectsProps) {
  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="section">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2 variants={fadeInUp} className="section-title">
            Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>

          {!showAll && projects.length > 6 && (
            <motion.div
              variants={fadeInUp}
              className="text-center mt-10"
            >
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl font-medium hover:border-primary transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show More Projects
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
