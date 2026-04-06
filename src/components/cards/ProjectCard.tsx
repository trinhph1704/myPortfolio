import { motion } from 'framer-motion';
import { Project } from '../../data/portfolioData';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProjectCardProps {
  project: Project;
  index?: number;
  expanded?: boolean;
  onExpand?: () => void;
  onBack?: () => void;
}

export default function ProjectCard({ project, index = 0, expanded = false, onExpand, onBack }: ProjectCardProps) {
  const { t } = useLanguage();
  const hasLiveDemo = Boolean(project.link && project.link !== '#');

  const handleDetailClick = () => {
    if (expanded && onBack) onBack();
    else if (!expanded && onExpand) onExpand();
  };

  if (expanded) {
    return (
      <motion.article
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="col-span-full p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-portfolio-bg-secondary to-portfolio-bg-tertiary border border-portfolio-accent/30 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-portfolio-text-primary">{project.title}</h3>
              <p className="text-portfolio-text-muted text-sm mt-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-md bg-portfolio-bg-tertiary text-portfolio-text-muted border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-portfolio-accent hover:text-portfolio-accent-muted transition-colors whitespace-nowrap"
              >
                LIVE DEMO →
              </a>
            ) : (
              <span className="text-sm text-portfolio-text-muted whitespace-nowrap">LIVE DEMO</span>
            )}
          </div>
          {project.details && project.details.length > 0 && (
            <div className="p-4 rounded-lg bg-portfolio-bg-tertiary/70 border border-white/5 space-y-2">
              {project.details.map((item, i) => (
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
            {t('viewOtherProjects')}
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
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group p-5 rounded-xl bg-gradient-to-br from-portfolio-bg-secondary to-portfolio-bg-tertiary border border-white/5 hover:border-portfolio-accent/30 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-portfolio-text-primary group-hover:text-portfolio-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-portfolio-text-muted text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs rounded bg-portfolio-bg-tertiary text-portfolio-text-muted border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <button
            onClick={handleDetailClick}
            className="flex-shrink-0 inline-flex w-full sm:w-auto items-center justify-center gap-1 px-3 py-2 rounded-lg bg-portfolio-accent/15 text-portfolio-accent text-xs font-semibold border border-portfolio-accent/30 hover:bg-portfolio-accent/25 transition whitespace-nowrap"
          >
            {t('details')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-portfolio-accent hover:text-portfolio-accent-muted transition-colors whitespace-nowrap"
              >
               
              </a>
            ) : (
              <span className="text-xs text-portfolio-text-muted whitespace-nowrap">LIVE DEMO</span>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-portfolio-accent hover:text-portfolio-accent-muted transition-colors whitespace-nowrap"
              >
                
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
