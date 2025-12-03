import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Rajarshi8', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/rajarshi-bhowmik-4419212b8', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/Rajo_7811', label: 'Twitter' },
  { icon: Mail, href: 'mailto:bhowmickrajarshi38@gmail.com', label: 'Email' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border-light dark:border-border-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-surface-light dark:bg-surface-dark hover:bg-primary/10 hover:text-primary transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-text-muted-light dark:text-text-muted-dark">
            <span>© {currentYear} Rajarshi Bhowmik</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
