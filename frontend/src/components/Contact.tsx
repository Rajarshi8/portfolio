import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle, Twitter, Linkedin, Mail } from 'lucide-react';
import { fadeInUp, staggerContainer, viewportOnce } from '../lib/animations';
import { submitContact } from '../utils/api';
import type { ContactFormData } from '../types';

const socialLinks = [
  { icon: Twitter, href: 'https://x.com/Rajo_7811', label: 'X (Twitter)' },
  { icon: Linkedin, href: 'https://linkedin.com/in/rajarshi-bhowmik-4419212b8', label: 'LinkedIn' },
];

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // honeypot
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.website) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section bg-surface-light dark:bg-surface-dark">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={fadeInUp} className="section-title text-center justify-center">
            Get in Touch
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-center text-text-muted-light dark:text-text-muted-dark mb-8 max-w-2xl mx-auto"
          >
            DM me on{' '}
            {socialLinks.map((link, index) => (
              <span key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {link.label}
                </a>
                {index < socialLinks.length - 1 ? ' or ' : ' '}
              </span>
            ))}
            if you want to chat or hire me for internship or freelance.
          </motion.p>

          {/* Contact Form */}
          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="bg-card-light dark:bg-card-dark rounded-2xl p-6 md:p-8 border border-border-light dark:border-border-dark"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="mt-6">
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="What's this about?"
              />
            </div>

            {/* Message */}
            <div className="mt-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                placeholder="Your message..."
              />
            </div>

            {/* Honeypot - hidden from users */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Status Messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Thanks for your message! I'll get back to you soon.
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                {errorMessage || 'Something went wrong. Please try again.'}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              className="mt-6 w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'loading' ? (
                <>
                  <div className="spinner w-5 h-5 border-2 border-white/30 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
