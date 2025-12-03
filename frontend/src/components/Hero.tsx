import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MapPin, FileText, ChevronDown } from 'lucide-react';
import { fadeInUp, staggerContainer, viewportOnce, float } from '../lib/animations';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Rajarshi8', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/rajarshi-bhowmik-4419212b8', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/Rajo_7811', label: 'Twitter' },
  { icon: Mail, href: 'mailto:bhowmickrajarshi38@gmail.com', label: 'Email' },
];

export function Hero() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-20"
    >
      <div className="container mx-auto px-4 md:px-6 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Location Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark mb-8"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">India</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-hero font-bold mb-6 leading-tight"
          >
            Hey, I'm{' '}
            <span className="gradient-text">Rajarshi</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-text-muted-light dark:text-text-muted-dark mb-8 max-w-2xl mx-auto"
          >
            Full stack developer building scalable SaaS products and web apps.
            Hackathon participant, freelancer, and dev community leader passionate
            about impactful tech.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-5 h-5" />
              Resume
            </motion.a>
            
            <motion.button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark font-medium rounded-xl hover:border-primary transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-4"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary hover:text-primary transition-all"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        variants={float}
        animate="animate"
      >
        <motion.button
          onClick={scrollToProjects}
          className="p-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark"
          whileHover={{ scale: 1.1 }}
          aria-label="Scroll to projects"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}
