import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../data/portfolioData';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const { t } = useLanguage();
  const hasLiveDemo = Boolean(project?.link && project.link !== '#');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              className="w-full max-w-lg max-h-[85vh] overflow-y-auto pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
            >
              <div className="bg-portfolio-bg-secondary border border-white/10 rounded-xl shadow-2xl shadow-black/50 p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 id="project-modal-title" className="text-xl font-semibold text-portfolio-text-primary">
                      {project.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded bg-portfolio-accent/20 text-portfolio-accent border border-portfolio-accent/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg text-portfolio-text-muted hover:text-portfolio-text-primary hover:bg-portfolio-bg-tertiary transition-colors flex-shrink-0"
                    aria-label={t('close')}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-portfolio-text-muted text-sm leading-relaxed mb-4">{project.description}</p>
                {project.details && project.details.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-portfolio-text-primary mb-2">{t('projectDetails')}</h3>
                    <ul className="space-y-2">
                      {project.details.map((item, i) => (
                        <li key={i} className="flex gap-2 text-portfolio-text-muted text-sm">
                          <span className="text-portfolio-accent mt-1.5 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {hasLiveDemo && (
                  <div className="flex gap-3 pt-2 border-t border-white/5">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-portfolio-accent hover:text-portfolio-accent-muted transition-colors"
                    >
                      {t('liveDemo')} →
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
