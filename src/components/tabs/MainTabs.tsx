import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import TabContent, { type MainTab, type DevSubTab } from './TabContent';
import DevSubTabs from './DevSubTabs';
import { useLanguage } from '../../contexts/LanguageContext';
import { briefIntroBullets } from '../../contexts/LanguageContext';
import { CV_URL } from '../../constants/urls';

const mainTabIds: MainTab[] = ['non-it', 'frontend', 'fullstack', 'sap'];
const mainTabKeys = ['tabNonIt', 'tabFrontend', 'tabFullstack', 'tabSap'] as const;

export default function MainTabs() {
  const [activeTab, setActiveTab] = useState<MainTab>('non-it');
  const [devSubTab, setDevSubTab] = useState<DevSubTab>('projects');
  const [introExpanded, setIntroExpanded] = useState(false);
  const { t, language } = useLanguage();

  const isDevTab = activeTab !== 'non-it';

  const heroCopy = useMemo(
    () =>
      language === 'vi'
        ? {
            title: 'Developer đa ngăn kéo, ưu tiên impact',
            subtitle: 'React · Fullstack · SAP ABAP',
            cta: 'Đặt lịch phỏng vấn',
            secondary: 'Tải CV PDF',
            metrics: [
              { label: 'Hiệu năng cải thiện', value: '+40%' },
              { label: 'Dự án giao đúng hạn', value: '100%' },
              { label: 'Thị trường phục vụ', value: 'VI / EN' },
            ],
          }
        : {
            title: 'Impact-first developer',
            subtitle: 'React · Fullstack · SAP ABAP',
            cta: 'Book an interview',
            secondary: 'Download CV PDF',
            metrics: [
              { label: 'Performance gains', value: '+40%' },
              { label: 'On-time delivery', value: '100%' },
              { label: 'Markets served', value: 'VI / EN' },
            ],
          },
    [language]
  );

  return (
    <div className="w-full pt-16 lg:pt-8 flex-1">
      {/* Hero + CTA */}
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-r from-portfolio-bg-secondary via-portfolio-bg-tertiary to-portfolio-bg-secondary mb-6">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(79,70,229,0.25),transparent_30%)]" aria-hidden />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between p-6 lg:p-8">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-portfolio-text-muted">{heroCopy.subtitle}</p>
            <h1 className="text-2xl lg:text-3xl font-bold text-portfolio-text-primary">
              {heroCopy.title}
            </h1>
            {introExpanded ? (
              <ul className="text-sm text-portfolio-text-muted leading-relaxed space-y-2 list-none">
                {briefIntroBullets[language].map((bullet, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-portfolio-accent flex-shrink-0 mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-portfolio-text-muted leading-relaxed line-clamp-3 lg:line-clamp-none">
                {t('briefIntro')}
              </p>
            )}
            <div className="flex gap-3 pt-2">
              <a
                href="mailto:phanvanbin232@gmail.com?subject=Interview%20Request&body=Hi%20Trinh,%20let's%20talk%20about%20..."
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-portfolio-accent text-portfolio-text-primary font-semibold text-sm shadow-lg shadow-portfolio-accent/30 transition hover:-translate-y-0.5"
              >
                {heroCopy.cta}
                <span aria-hidden>→</span>
              </a>
              <a
                href={CV_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-portfolio-text-primary text-sm font-semibold hover:border-portfolio-accent/40 hover:text-portfolio-accent transition"
              >
                {heroCopy.secondary}
              </a>
              <button
                onClick={() => setIntroExpanded(!introExpanded)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-portfolio-text-muted text-sm font-semibold hover:border-portfolio-accent/30 hover:text-portfolio-accent transition"
              >
                {introExpanded ? t('hideDetails') : t('seeDetails')}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap w-full lg:w-auto items-center justify-between lg:justify-end gap-2 lg:gap-4">
            {heroCopy.metrics.map((metric) => (
              <div
                key={metric.label}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 shadow-inner min-w-0 flex-1 lg:flex-initial lg:flex-none"
              >
                <div className="text-xs uppercase tracking-[0.12em] text-portfolio-text-muted font-semibold whitespace-nowrap">
                  {metric.label}
                </div>
                <div className="text-xl font-bold text-portfolio-accent leading-tight">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/5 pb-4">
        {mainTabIds.map((tabId, i) => (
          <button
            key={tabId}
            onClick={() => {
              setActiveTab(tabId);
              if (tabId !== 'non-it') setDevSubTab('projects');
            }}
            className={`relative px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              ''
            }`}
          >
            {activeTab === tabId && (
              <motion.span
                layoutId="mainTab"
                className={`absolute inset-0 rounded-lg ${
                  'bg-portfolio-accent/15 border border-portfolio-accent/25'
                }`}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span
              className={`relative z-10 inline-flex items-center gap-1.5 ${
                activeTab === tabId
                  ? 'text-portfolio-accent'
                  : 'text-portfolio-text-muted hover:text-portfolio-text-primary'
              }`}
            >
              {t(mainTabKeys[i])}
            </span>
          </button>
        ))}
      </div>

      {isDevTab && (
        <DevSubTabs active={devSubTab} onChange={setDevSubTab} showCapstone={activeTab === 'sap'} />
      )}

      <TabContent mainTab={activeTab} devSubTab={devSubTab} />
    </div>
  );
}
