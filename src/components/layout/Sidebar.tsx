import { motion, AnimatePresence } from 'framer-motion';
import { getPortfolioByLang } from '../../data/portfolioTranslations';
import { useLanguage } from '../../contexts/LanguageContext';
import ProfileCard from '../profile/ProfileCard';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { language, t } = useLanguage();
  const profile = getPortfolioByLang(language).profile;

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[280px] lg:w-[300px] flex-shrink-0
          bg-portfolio-bg-secondary border-r border-white/5
          z-50 lg:relative lg:z-auto
          transform transition-transform duration-300 ease-out lg:transform-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="sticky top-0 h-full overflow-y-auto p-6 lg:p-8">
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg text-portfolio-text-muted hover:text-portfolio-text-primary hover:bg-portfolio-bg-tertiary transition-colors"
            aria-label={t('closeMenu')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ProfileCard profile={profile} />
        </div>
      </aside>
    </>
  );
}
