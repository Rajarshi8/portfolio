import { ReactNode } from 'react';
import { Home, FolderOpen, Briefcase, Cpu, Mail } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import Dock from './ui/dock';

interface LayoutProps {
  children: ReactNode;
}

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const dockItems = [
  { icon: Home,       label: 'Home',       onClick: () => scrollTo('#home') },
  { icon: FolderOpen, label: 'Projects',   onClick: () => scrollTo('#projects') },
  { icon: Briefcase,  label: 'Experience', onClick: () => scrollTo('#experience') },
  { icon: Cpu,        label: 'Skills',     onClick: () => scrollTo('#skills') },
  { icon: Mail,       label: 'Contact',    onClick: () => scrollTo('#contact') },
];

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-300">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />

      {/* Floating navigation dock */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <Dock items={dockItems} className="py-0" />
        </div>
      </div>
    </div>
  );
}
