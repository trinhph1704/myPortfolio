import { motion } from 'framer-motion';
import type { DevSubTab } from './TabContent';
import { useLanguage } from '../../contexts/LanguageContext';

interface DevSubTabsProps {
  active: DevSubTab;
  onChange: (tab: DevSubTab) => void;
  showCapstone?: boolean;
}

export default function DevSubTabs({ active, onChange, showCapstone = false }: DevSubTabsProps) {
  const { t } = useLanguage();

  const tabs: { id: DevSubTab; labelKey: 'tabProjects' | 'tabExperience' | 'tabCapstone' }[] = [
    { id: 'projects', labelKey: 'tabProjects' },
    { id: 'experience', labelKey: 'tabExperience' },
    ...(showCapstone
      ? [{ id: 'capstone' as DevSubTab, labelKey: 'tabCapstone' as const }]
      : []),
  ];

  return (
    <div className="flex gap-2 p-1 rounded-lg bg-portfolio-bg-secondary border border-white/5 w-fit mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="relative px-4 py-2 text-sm font-medium rounded-md transition-colors"
        >
          {active === tab.id && (
            <motion.span
              layoutId="devSubTab"
              className="absolute inset-0 rounded-md bg-portfolio-accent/20 border border-portfolio-accent/30"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span
            className={[
              'relative z-10',
              tab.id === 'capstone'
                ? `fire-title ${active === tab.id ? 'fire-title-active' : ''}`
                : active === tab.id
                ? 'text-portfolio-accent'
                : 'text-portfolio-text-muted hover:text-portfolio-text-primary',
            ].join(' ')}
          >
            {t(tab.labelKey)}
          </span>
        </button>
      ))}
    </div>
  );
}
