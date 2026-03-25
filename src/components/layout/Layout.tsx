import { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from './Footer';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useLanguage } from '../../contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen bg-portfolio-bg-primary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-portfolio-bg-secondary border border-white/5 text-portfolio-text-primary hover:bg-portfolio-bg-tertiary transition-colors"
          aria-label={t('openMenu')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Language switcher - fixed top right */}
        <div className="fixed top-4 right-4 z-30">
          <LanguageSwitcher />
        </div>
        <MainContent>{children}</MainContent>
        <Footer />
      </div>
    </div>
  );
}
