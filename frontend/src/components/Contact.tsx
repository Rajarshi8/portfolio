import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Monitor } from 'lucide-react';
import { CopyEmailButton } from './ui/copy-email-button';
import MotionButton from './ui/motion-button';

const EMAIL = 'bhowmickrajarshi38@gmail.com';
const PHONE = '+91 8637553008';

const emailClients = [
  {
    label: 'Gmail in browser',
    icon: Globe,
    href: `https://mail.google.com/mail/?view=cm&to=${EMAIL}`,
  },
  {
    label: 'Outlook in browser',
    icon: Globe,
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}`,
  },
  {
    label: 'Yahoo in browser',
    icon: Globe,
    href: `https://compose.mail.yahoo.com/?to=${EMAIL}`,
  },
  {
    label: 'Default email app',
    icon: Monitor,
    href: `mailto:${EMAIL}`,
  },
];

export function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="border-t border-border-light dark:border-border-dark">
        <div className="flex flex-col md:flex-row min-h-[140px]">

          {/* Left — Reach Me At */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-14 py-10 bg-card-light dark:bg-[#111]">
            <p className="text-[10px] font-bold tracking-[0.2em] text-text-muted-light dark:text-text-muted-dark uppercase mb-4">
              Reach Me At
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm text-text-light dark:text-[#ccc] hover:text-primary dark:hover:text-primary transition-colors mb-1.5 w-fit"
            >
              {EMAIL}
            </a>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="text-sm text-text-light dark:text-[#ccc] hover:text-primary dark:hover:text-primary transition-colors w-fit"
            >
              {PHONE}
            </a>
          </div>

          {/* Right — Say Hello */}
          <div className="flex items-center justify-center px-14 py-10 min-w-[260px] bg-surface-light dark:bg-[#1c1c1c] border-t md:border-t-0 md:border-l border-border-light dark:border-white/10">
            <MotionButton label="Say Hello." onClick={() => setOpen(true)} />
          </div>

        </div>
      </section>

      {/* MailtoUI Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-sm bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-[#222]">
                <span className="text-sm font-medium text-white">Compose new email with</span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Email client options */}
              <div className="divide-y divide-white/10">
                {emailClients.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-5 py-4 hover:bg-white/5 transition-colors text-sm text-gray-200"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                      <Icon className="w-4 h-4" />
                    </span>
                    {label}
                  </a>
                ))}
              </div>

              {/* Copy row */}
              <div className="border-t border-white/10 px-4 py-3">
                <CopyEmailButton email={EMAIL} />
              </div>

              {/* Footer */}
              <div className="px-5 py-3 bg-[#111] text-center">
                <span className="text-xs text-gray-600">Powered by MailtoUI</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
