import { useLanguage } from '../../contexts/LanguageContext';

const footerText = {
  vi: {
    madeWith: 'Được tạo với',
    and: 'và',
    copyright: '©',
    year: '2025',
    rights: 'Phan Hồng Trinh. All rights reserved.',
  },
  en: {
    madeWith: 'Built with',
    and: 'and',
    copyright: '©',
    year: '2025',
    rights: 'Phan Hong Trinh. All rights reserved.',
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const t = footerText[language];

  return (
    <footer className="mt-auto border-t border-white/5 py-6 px-6 lg:px-10">
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-portfolio-text-muted">
          {t.madeWith}{' '}
          <span className="text-portfolio-accent font-medium">React</span> {t.and}{' '}
          <span className="text-portfolio-accent font-medium">Tailwind CSS</span>
        </p>
        <p className="text-sm text-portfolio-text-muted">
          {t.copyright} {t.year} {t.rights}
        </p>
      </div>
    </footer>
  );
}
