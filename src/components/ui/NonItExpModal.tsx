import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience } from '../../data/portfolioData';
import { useLanguage } from '../../contexts/LanguageContext';

interface NonItExpModalProps {
  experience: Experience | null;
  onClose: () => void;
}

export default function NonItExpModal({ experience, onClose }: NonItExpModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (experience) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [experience, onClose]);

  return (
    <AnimatePresence>
      {experience && (
      <motion.div
        key={experience.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', bounce: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-portfolio-bg-secondary to-portfolio-bg-tertiary border border-white/10 shadow-2xl p-6 lg:p-8"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 id="modal-title" className="text-xl font-semibold text-portfolio-text-primary">
                {experience.title}
              </h2>
              <p className="text-portfolio-accent text-sm font-medium mt-1">{experience.company}</p>
              <span className="text-xs text-portfolio-text-muted">{experience.period}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-portfolio-text-muted hover:text-portfolio-text-primary hover:bg-portfolio-bg-tertiary transition"
              aria-label={t('close')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-portfolio-text-muted text-sm mb-4">{experience.description}</p>
          {experience.link && experience.link !== '#' && (
            <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-portfolio-accent hover:text-portfolio-accent-muted transition-colors mb-4"
            >
              {t('visitWebsite')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {experience.details && experience.details.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-portfolio-text-muted font-semibold">
                {t('jobDetails')}
              </p>
              <ul className="space-y-2">
                {experience.details.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-portfolio-text-primary">
                    <span className="text-portfolio-accent flex-shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={onClose}
            className="mt-6 w-full py-3 rounded-lg bg-portfolio-accent/20 text-portfolio-accent font-semibold border border-portfolio-accent/30 hover:bg-portfolio-accent/30 transition"
          >
            {t('close')}
          </button>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
