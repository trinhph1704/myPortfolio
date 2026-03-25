import { useLanguage } from '../../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-2 rounded-lg bg-portfolio-bg-secondary/80 border border-white/5 backdrop-blur-sm">
      <svg
        className="w-5 h-5 text-portfolio-text-muted flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      <div className="flex rounded-md overflow-hidden border border-white/10">
        <button
          onClick={() => setLanguage('vi')}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
            language === 'vi'
              ? 'bg-portfolio-accent text-white'
              : 'bg-portfolio-bg-tertiary text-portfolio-text-muted hover:text-portfolio-text-primary'
          }`}
          aria-pressed={language === 'vi'}
          aria-label="Tiếng Việt"
        >
          VI
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
            language === 'en'
              ? 'bg-portfolio-accent text-white'
              : 'bg-portfolio-bg-tertiary text-portfolio-text-muted hover:text-portfolio-text-primary'
          }`}
          aria-pressed={language === 'en'}
          aria-label="English"
        >
          EN
        </button>
      </div>
    </div>
  );
}
