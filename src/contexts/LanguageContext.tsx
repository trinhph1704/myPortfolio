import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Language = 'vi' | 'en';

const uiTranslations = {
  vi: {
    briefIntro:
      'Xin chào! Tôi là Phan Hồng Trinh - sinh viên Kỹ thuật Phần mềm FPT University. Portfolio này tổng hợp kinh nghiệm làm việc và dự án qua các giai đoạn: Non-IT (kho, bán hàng, quản lý cửa hàng), Front-end Developer Freelance, và SAP ABAP Developer Intern.',
    briefIntroFull:
      'Xin chào! Tôi là Phan Hồng Trinh - sinh viên Kỹ thuật Phần mềm FPT University (2021-2025). Tôi có kinh nghiệm thực tế với ReactJS, JavaScript, HTML, CSS (Tailwind CSS, Ant Design) qua các dự án freelance tại ARTSY, AngelDisableHelpLLC, ColorDanHub. Đồng thời có nền tảng SAP ABAP từ đào tạo (SAP311, SAP321, SAP341) và thực tập tại FPT Software. Từ vị trí nhân viên kho, bán hàng, quản lý cửa hàng (Nitori, Koreanmart, Vinmart+) đến Frontend và SAP — mỗi tab phản ánh một chặng đường phát triển. Mục tiêu: trở thành Full Stack Developer chuyên nghiệp, đóng góp cho team năng động.',
    seeDetails: 'chi tiết',
    hideDetails: 'thu gọn',
    // Main tabs
    tabNonIt: 'Non-IT',
    tabFrontend: 'Front-end Developer',
    tabFullstack: 'Full Stack Developer',
    tabSap: 'SAP Technical Developer',
    tabCapstone: 'Đồ án tốt nghiệp',
    // Dev sub tabs
    tabProjects: 'Dự án cá nhân',
    tabExperience: 'Kinh nghiệm làm việc',
    // Profile labels
    labelBirthDate: 'Ngày sinh',
    labelLocation: 'Nơi sống',
    labelPhone: 'Điện thoại',
    labelEmail: 'Email',
    labelSchool: 'Trường',
    labelLanguages: 'Ngoại ngữ',
    labelSocial: 'Mạng xã hội',
    labelSoftSkills: 'Kỹ năng mềm',
    labelTechnicalSkills: 'Kỹ năng kỹ thuật',
    labelCareerGoal: 'Mục tiêu nghề nghiệp',
    // Cards & modals
    clickToViewDetails: 'Nhấn để xem chi tiết',
    details: 'Chi tiết',
    liveDemo: 'Live Demo',
    source: 'Source',
    sourceCode: 'Source Code',
    jobDetails: 'Chi tiết công việc',
    projectDetails: 'Chi tiết dự án',
    close: 'Đóng',
    viewOtherProjects: 'Xem các dự án khác',
    viewOtherJobs: 'Xem các công việc khác',
    visitWebsite: 'Truy cập trang web',
    viewAllSkills: 'Xem tất cả kỹ năng',
    categoryProgrammingLanguages: 'Ngôn ngữ lập trình',
    categoryFramework: 'Framework',
    categoryDatabase: 'Cơ sở dữ liệu',
    categoryTools: 'Tool code & deploy',
    // Layout
    openMenu: 'Mở menu',
    closeMenu: 'Đóng menu',
  },
  en: {
    briefIntro:
      "Hello! I'm Phan Hong Trinh - Software Engineering student at FPT University. This portfolio summarizes work experience and projects across stages: Non-IT (warehouse, sales, store management), Frontend Developer Freelance, and SAP ABAP Developer Intern.",
    briefIntroFull:
      "Hello! I'm Phan Hong Trinh - Software Engineering student at FPT University (2021-2025). I have practical experience with ReactJS, JavaScript, HTML, CSS (Tailwind CSS, Ant Design) through freelance projects at ARTSY, AngelDisableHelpLLC, ColorDanHub. I also have SAP ABAP foundation from training (SAP311, SAP321, SAP341) and internship at FPT Software. From warehouse staff, sales, store manager (Nitori, Koreanmart, Vinmart+) to Frontend and SAP — each tab reflects a development journey. Goal: become a professional Full Stack Developer, contributing to dynamic teams.",
    seeDetails: 'details',
    hideDetails: 'collapse',
    tabNonIt: 'Non-IT',
    tabFrontend: 'Front-end Developer',
    tabFullstack: 'Full Stack Developer',
    tabSap: 'SAP Technical Developer',
    tabCapstone: 'Capstone Project',
    tabProjects: 'Personal Projects',
    tabExperience: 'Work Experience',
    labelBirthDate: 'Birth Date',
    labelLocation: 'Location',
    labelPhone: 'Phone',
    labelEmail: 'Email',
    labelSchool: 'School',
    labelLanguages: 'Languages',
    labelSocial: 'Social Media',
    labelSoftSkills: 'Soft Skills',
    labelTechnicalSkills: 'Technical Skills',
    labelCareerGoal: 'Career Goal',
    clickToViewDetails: 'Click to view details',
    details: 'Details',
    liveDemo: 'Live Demo',
    source: 'Source',
    sourceCode: 'Source Code',
    jobDetails: 'Job Details',
    projectDetails: 'Project Details',
    close: 'Close',
    viewOtherProjects: 'View other projects',
    viewOtherJobs: 'View other jobs',
    visitWebsite: 'Visit website',
    viewAllSkills: 'View all skills',
    categoryProgrammingLanguages: 'Programming Languages',
    categoryFramework: 'Framework',
    categoryDatabase: 'Database',
    categoryTools: 'Tools (code & deploy)',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
} as const;

export const briefIntroBullets: Record<Language, string[]> = {
  vi: [
    'Xin chào! Tôi là Phan Hồng Trinh - sinh viên Kỹ thuật Phần mềm FPT University (2021-2025)',
    'Kinh nghiệm thực tế với ReactJS, JavaScript, HTML, CSS (Tailwind CSS, Ant Design) qua các dự án freelance tại ARTSY, AngelDisableHelpLLC, ColorDanHub',
    'Nền tảng SAP ABAP từ đào tạo (SAP311, SAP321, SAP341) và thực tập tại FPT Software',
    'Kinh nghiệm từ nhân viên kho, bán hàng, quản lý cửa hàng (Nitori, Koreanmart, Vinmart+) đến Frontend và SAP',
    'Mục tiêu: trở thành Full Stack Developer chuyên nghiệp, đóng góp cho team năng động',
  ],
  en: [
    "Hello! I'm Phan Hong Trinh - Software Engineering student at FPT University (2021-2025)",
    'Practical experience with ReactJS, JavaScript, HTML, CSS (Tailwind CSS, Ant Design) through freelance projects at ARTSY, AngelDisableHelpLLC, ColorDanHub',
    'SAP ABAP foundation from training (SAP311, SAP321, SAP341) and internship at FPT Software',
    'Experience from warehouse staff, sales, store manager (Nitori, Koreanmart, Vinmart+) to Frontend and SAP',
    'Goal: become a professional Full Stack Developer, contributing to dynamic teams',
  ],
};

export type TranslationKey = keyof typeof uiTranslations.vi;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('vi');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => uiTranslations[language][key],
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
