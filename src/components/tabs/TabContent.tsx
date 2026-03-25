import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPortfolioByLang } from '../../data/portfolioTranslations';
import { useLanguage } from '../../contexts/LanguageContext';
import ProjectCard from '../cards/ProjectCard';
import ExperienceCard from '../cards/ExperienceCard';
import NonItExpModal from '../ui/NonItExpModal';

export type MainTab = 'non-it' | 'frontend' | 'fullstack' | 'sap';
export type DevSubTab = 'projects' | 'experience' | 'capstone';

interface TabContentProps {
  mainTab: MainTab;
  devSubTab: DevSubTab;
}

export default function TabContent({ mainTab, devSubTab }: TabContentProps) {
  const { language } = useLanguage();
  const portfolio = getPortfolioByLang(language);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [nonItModalId, setNonItModalId] = useState<string | null>(null);

  useEffect(() => {
    setExpandedId(null);
    setNonItModalId(null);
  }, [mainTab, devSubTab]);

  const contentVariants = {
    enter: { opacity: 0, y: 8 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  const nonItExp = nonItModalId
    ? portfolio.nonItExperiences.find((e) => e.id === nonItModalId) ?? null
    : null;

  const renderContent = () => {
    if (mainTab === 'non-it') {
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {portfolio.nonItExperiences.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={i}
                useModal
                onOpenModal={() => setNonItModalId(exp.id)}
              />
            ))}
          </div>
          <NonItExpModal experience={nonItExp} onClose={() => setNonItModalId(null)} />
        </>
      );
    }

    if (mainTab === 'frontend') {
      if (devSubTab === 'projects') {
        const expanded = portfolio.frontendProjects.find((p) => p.id === expandedId);
        if (expanded) {
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <ProjectCard
                project={expanded}
                expanded
                onBack={() => setExpandedId(null)}
              />
            </div>
          );
        }
        return (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {portfolio.frontendProjects.map((proj, i) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                index={i}
                onExpand={() => setExpandedId(proj.id)}
              />
            ))}
          </div>
        );
      }
      const expanded = portfolio.frontendExperience.find((e) => e.id === expandedId);
      if (expanded) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <ExperienceCard
              experience={expanded}
              expanded
              onBack={() => setExpandedId(null)}
            />
          </div>
        );
      }
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {portfolio.frontendExperience.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={i}
              onExpand={() => setExpandedId(exp.id)}
            />
          ))}
        </div>
      );
    }

    if (mainTab === 'fullstack') {
      if (devSubTab === 'projects') {
        const expanded = portfolio.fullstackProjects.find((p) => p.id === expandedId);
        if (expanded) {
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <ProjectCard project={expanded} expanded onBack={() => setExpandedId(null)} />
            </div>
          );
        }
        return (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {portfolio.fullstackProjects.map((proj, i) => (
              <ProjectCard key={proj.id} project={proj} index={i} onExpand={() => setExpandedId(proj.id)} />
            ))}
          </div>
        );
      }
      const expanded = portfolio.fullstackExperience.find((e) => e.id === expandedId);
      if (expanded) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <ExperienceCard experience={expanded} expanded onBack={() => setExpandedId(null)} />
          </div>
        );
      }
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {portfolio.fullstackExperience.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} onExpand={() => setExpandedId(exp.id)} />
          ))}
        </div>
      );
    }

    if (mainTab === 'sap') {
      if (devSubTab === 'projects') {
        const expanded = portfolio.sapProjects.find((p) => p.id === expandedId);
        if (expanded) {
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <ProjectCard project={expanded} expanded onBack={() => setExpandedId(null)} />
            </div>
          );
        }
        return (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {portfolio.sapProjects.map((proj, i) => (
              <ProjectCard key={proj.id} project={proj} index={i} onExpand={() => setExpandedId(proj.id)} />
            ))}
          </div>
        );
      }

      if (devSubTab === 'capstone') {
        const expanded = portfolio.capstoneProjects.find((p) => p.id === expandedId);
        if (expanded) {
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <ProjectCard project={expanded} expanded onBack={() => setExpandedId(null)} />
            </div>
          );
        }
        return (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {portfolio.capstoneProjects.map((proj, i) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                index={i}
                onExpand={() => setExpandedId(proj.id)}
              />
            ))}
          </div>
        );
      }

      const expanded = portfolio.sapExperience.find((e) => e.id === expandedId);
      if (expanded) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <ExperienceCard experience={expanded} expanded onBack={() => setExpandedId(null)} />
          </div>
        );
      }
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {portfolio.sapExperience.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} onExpand={() => setExpandedId(exp.id)} />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${mainTab}-${devSubTab}`}
        variants={contentVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25 }}
        className="pt-6"
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
}
