import { motion } from 'framer-motion';
import { Experience } from '../../data/portfolioData';
import { useLanguage } from '../../contexts/LanguageContext';

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
  expanded?: boolean;
  useModal?: boolean;
  onExpand?: () => void;
  onOpenModal?: () => void;
  onBack?: () => void;
}

export default function ExperienceCard({
  experience,
  index = 0,
  expanded = false,
  useModal = false,
  onExpand,
  onOpenModal,
  onBack,
}: ExperienceCardProps) {
  const { t, language } = useLanguage();
  const hasExperienceLink = Boolean(experience.link && experience.link !== '#');

  const handleDetailClick = () => {
    if (useModal && onOpenModal) {
      onOpenModal();
      return;
    }
    if (expanded && onBack) onBack();
    else if (!expanded && onExpand) onExpand();
  };

  if (expanded && !useModal) {
    return (
      <motion.article
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="col-span-full p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-portfolio-bg-secondary to-portfolio-bg-tertiary border border-portfolio-accent/30 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="text-xl font-semibold text-portfolio-text-primary">{experience.title}</h3>
              <p className="text-portfolio-accent text-sm font-medium mt-1">{experience.company}</p>
              <span className="text-xs text-portfolio-text-muted">{experience.period}</span>
            </div>
          </div>
          <p className="text-portfolio-text-muted text-sm">{experience.description}</p>
          {experience.techStack && experience.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {experience.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs rounded-md bg-portfolio-bg-tertiary text-portfolio-text-muted border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          {hasExperienceLink && (
            <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-portfolio-accent hover:text-portfolio-accent-muted transition-colors whitespace-nowrap"
            >
              {language === 'vi' ? 'Truy cập trang web' : 'Visit website'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {experience.details && experience.details.length > 0 && (
            <div className="p-4 rounded-lg bg-portfolio-bg-tertiary/70 border border-white/5 space-y-2">
              {experience.details.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm text-portfolio-text-muted">
                  <span className="text-portfolio-accent flex-shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={onBack}
            className="mt-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-portfolio-accent/20 text-portfolio-accent font-semibold border border-portfolio-accent/30 hover:bg-portfolio-accent/30 transition"
          >
            {t('viewOtherJobs')}
          </button>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group p-5 rounded-xl bg-gradient-to-br from-portfolio-bg-secondary to-portfolio-bg-tertiary border border-white/5 hover:border-portfolio-accent/20 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <h3 className="font-semibold text-portfolio-text-primary group-hover:text-portfolio-accent transition-colors">
          {experience.title}
        </h3>
        <span className="text-xs text-portfolio-accent font-medium flex-shrink-0">{experience.period}</span>
      </div>
      <p className="text-portfolio-text-muted text-sm mb-1">{experience.company}</p>
      <p className="text-portfolio-text-muted text-sm leading-relaxed mb-3 line-clamp-2">
        {experience.description}
      </p>
      {experience.techStack && experience.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {experience.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded bg-portfolio-bg-tertiary text-portfolio-text-muted border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      {hasExperienceLink && (
        <div className="mb-3">
          <a
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-portfolio-accent/15 text-portfolio-accent text-xs font-semibold border border-portfolio-accent/30 whitespace-nowrap hover:bg-portfolio-accent/25 transition"
          >
            {language === 'vi' ? 'Truy cập trang web' : 'Visit website'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}
      <button
        onClick={handleDetailClick}
        className="text-xs text-portfolio-accent hover:underline inline-flex items-center gap-1"
      >
        {t('clickToViewDetails')}
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </motion.article>
  );
}
