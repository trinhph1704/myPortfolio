import { useState } from 'react';
import { Profile } from '../../data/portfolioData';
import { useLanguage } from '../../contexts/LanguageContext';
import SkillsModal from './SkillsModal';

interface ProfileInfoProps {
  profile: Profile;
}

function InfoItem({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-lg flex-shrink-0" aria-hidden>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-portfolio-text-muted text-xs uppercase tracking-wider mb-0.5">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-portfolio-text-primary text-sm hover:text-portfolio-accent transition-colors break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-portfolio-text-primary text-sm">{value}</p>
        )}
      </div>
    </div>
  );
}

export default function ProfileInfo({ profile }: ProfileInfoProps) {
  const { t } = useLanguage();
  const [skillsOpen, setSkillsOpen] = useState(false);
  const socialLinks = [
    { key: 'linkedin', href: profile.linkedin, label: 'LinkedIn' },
    { key: 'github', href: profile.github, label: 'GitHub' },
    { key: 'facebook', href: profile.facebook, label: 'Facebook' },
    { key: 'tiktok', href: profile.tiktok, label: 'TikTok' },
    { key: 'instagram', href: profile.instagram, label: 'Instagram' },
    { key: 'threads', href: profile.threads, label: 'Threads' },
  ].filter((s) => s.href && s.href !== '#');
  const hasSocial = socialLinks.length > 0;

  return (
    <div className="space-y-4">
      {/* Ngày sinh + Nơi sống xếp dọc, cùng cột, song song không lệch */}
      <div className="space-y-4">
        <InfoItem icon="📅" label={t('labelBirthDate')} value={profile.birthDate} />
        <InfoItem icon="📍" label={t('labelLocation')} value={profile.location} />
      </div>

      <InfoItem
        icon="📞"
        label={t('labelPhone')}
        value={profile.phone}
        href={`tel:${profile.phone.replace(/\s/g, '')}`}
      />
      <InfoItem
        icon="✉️"
        label={t('labelEmail')}
        value={profile.email}
        href={`mailto:${profile.email}`}
      />
      <InfoItem
        icon="🎓"
        label={t('labelSchool')}
        value={profile.major ? `${profile.university} - ${profile.major}` : profile.university}
      />
      <InfoItem
        icon="🌐"
        label={t('labelLanguages')}
        value={profile.languages
          .map((l) => `${l.name}${l.level ? ` (${l.level})` : ''}`)
          .join(', ')}
      />

      {/* Dấu gạch ngang dưới Ngoại ngữ */}
      <div className="border-t border-white/10 pt-4" />

      {/* MẠNG XÃ HỘI */}
      {hasSocial && (
        <div className="pt-2">
          <p className="text-portfolio-text-muted text-xs uppercase tracking-wider mb-3">
            {t('labelSocial')}
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ key, href, label }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-text-muted hover:text-portfolio-accent transition-colors"
                aria-label={label}
              >
                {key === 'linkedin' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )}
                {key === 'github' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                )}
                {key === 'facebook' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )}
                {key === 'tiktok' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                )}
                {key === 'instagram' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                )}
                {key === 'threads' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.708-1.202-.003-2.256-.432-3.14-1.272-.927-.883-1.4-2.02-1.4-3.38 0-1.484.544-2.745 1.619-3.756.992-.93 2.256-1.408 3.763-1.408.576 0 1.123.08 1.634.234v-2.31c-.574-.134-1.14-.2-1.69-.2-2.21 0-4.012 1.792-4.012 4.002 0 1.59.877 2.95 2.157 3.69.91.52 1.957.78 3.11.78 1.153 0 2.2-.26 3.11-.78.502-.287.944-.637 1.315-1.04.12 1.244.502 2.28 1.14 3.1.886 1.102 2.14 1.704 3.73 1.708 1.202-.003 2.256-.432 3.14-1.272.927-.883 1.4-2.02 1.4-3.38 0-1.484-.544-2.745-1.619-3.756-.992-.93-2.256-1.408-3.763-1.408-.576 0-1.123.08-1.634.234v2.31c.574.134 1.14.2 1.69.2 2.21 0 4.012-1.792 4.012-4.002 0-1.59-.877-2.95-2.157-3.69-.91-.52-1.957-.78-3.11-.78-1.153 0-2.2.26-3.11.78-.502.287-.944.637-1.315 1.04-.12-1.244-.502-2.28-1.14-3.1-.886-1.102-2.14-1.704-3.73-1.708z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Skills summary (2 labels + 1 "view all" line) */}
      {(profile.softSkills.length > 0 || profile.technicalSkills.length > 0) && (
        <div className="pt-2 space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 rounded-xl border border-white/5 bg-portfolio-bg-tertiary/40 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-portfolio-text-muted text-xs uppercase tracking-wider">{t('labelSoftSkills')}</p>
                <span className="text-sm font-semibold text-portfolio-accent">{profile.softSkills.length}</span>
              </div>
            </div>
            <div className="flex-1 rounded-xl border border-white/5 bg-portfolio-bg-tertiary/40 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-portfolio-text-muted text-xs uppercase tracking-wider">{t('labelTechnicalSkills')}</p>
                <span className="text-sm font-semibold text-portfolio-accent">{profile.technicalSkills.length}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSkillsOpen(true)}
            className="w-full rounded-xl border border-white/10 bg-portfolio-bg-tertiary/30 px-3 py-2.5 text-sm font-semibold text-portfolio-text-primary hover:border-portfolio-accent/40 hover:text-portfolio-accent transition"
          >
            {t('viewAllSkills')}
          </button>
        </div>
      )}

      {profile.careerGoal && (
        <div className="pt-2 border-t border-white/5">
          <p className="text-portfolio-text-muted text-xs uppercase tracking-wider mb-2">
            {t('labelCareerGoal')}
          </p>
          <p className="text-portfolio-text-primary text-sm leading-relaxed">{profile.careerGoal}</p>
        </div>
      )}

      <SkillsModal profile={profile} isOpen={skillsOpen} onClose={() => setSkillsOpen(false)} />
    </div>
  );
}
