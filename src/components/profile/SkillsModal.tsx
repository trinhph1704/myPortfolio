import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { Profile } from '../../data/portfolioData';
import { useLanguage } from '../../contexts/LanguageContext';

// ─────────────────────────────────────────────
// SVG Logo registry  (inline, no external deps)
// ─────────────────────────────────────────────
const TECH_LOGOS: Record<string, ReactNode> = {
  javascript: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#F7DF1E" />
      <path d="M8.5 25.5l2.6-1.57c.5.89.95 1.64 2.03 1.64 1.04 0 1.7-.41 1.7-1.99V14h3.2v9.62c0 3.28-1.92 4.77-4.73 4.77-2.53 0-4.01-1.31-4.8-2.89zm9.44-.36l2.6-1.5c.68 1.1 1.57 1.91 3.13 1.91 1.31 0 2.16-.66 2.16-1.57 0-1.09-.86-1.47-2.32-2.1l-.8-.34c-2.3-.98-3.83-2.2-3.83-4.8 0-2.38 1.82-4.2 4.66-4.2 2.02 0 3.47.7 4.52 2.54l-2.48 1.59c-.55-.98-1.14-1.36-2.05-1.36-.94 0-1.53.6-1.53 1.36 0 .95.6 1.34 1.97 1.93l.8.34c2.71 1.16 4.24 2.35 4.24 5.02 0 2.88-2.26 4.43-5.3 4.43-2.96 0-4.87-1.41-5.77-3.25z" fill="#323330" />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#3178C6" />
      <path d="M5 17h5.5v1.5H8v6H6.5v-6H5V17zm8.25 0h4.75v1.5h-1.5v6H15v-6h-1.75V17zm-2 2.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z" fill="white" />
      <path d="M18 17h5.5c.83 0 1.5.67 1.5 1.5v.5c0 .55-.29 1.03-.72 1.3.43.27.72.75.72 1.3v.5c0 .83-.67 1.5-1.5 1.5H18V17zm1.5 1.5v1.25h3c.14 0 .25-.11.25-.25v-.75c0-.14-.11-.25-.25-.25h-3zm0 2.75v1.25h3c.14 0 .25-.11.25-.25v-.75c0-.14-.11-.25-.25-.25h-3z" fill="white" />
    </svg>
  ),
  html: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#E34F26" />
      <path d="M7 5l1.8 20.2L16 27.4l7.2-2.2L25 5H7zm14.7 6.7H12.5l.3 3h8.6l-.9 10-4.5 1.2-4.5-1.2-.3-3.4h3l.15 1.7 1.65.45 1.65-.45.17-1.9H11.6l-.8-9h10.2l-.3-1.4z" fill="white" />
    </svg>
  ),
  css: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#1572B6" />
      <path d="M7 5l1.8 20.2L16 27.4l7.2-2.2L25 5H7zm12.5 7l.3-3H12l.3 3h4.9l-.3 3H12.6l.2 2.3 3.2.85 3.2-.85.3-2.8h-3l.1-1H19.5l.15-2z" fill="white" />
    </svg>
  ),
  java: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#ED8B00" />
      <path d="M12.3 20.4s-.9.5.6.7c1.9.2 2.8.2 4.9-.2 0 0 .5.3 1.3.6-4.7 2-10.6-.1-6.8-1.1zm-.6-2.6s-1 .8.6.9c1.6.2 2.9.2 5-.2 0 0 .4.4 1 .6-4.4 1.3-9.3.1-6.6-1.3zm4.1-8.3c1 1.1-.3 2.1-.3 2.1s2.4-1.2 1.3-2.8c-1-1.5-1.8-2.2 2.4-4.8 0 0-6.5 1.6-3.4 5.5zm5.4 11.5s.7.6-.7.9c-2.6.8-10.7 1-13-.1-.8-.4.7-1 1.2-1.1.5-.1.8-.1.8-.1-.9-.6-5.9 1.3-2.5 1.8 9.1 1.5 16.6-.7 14.2-1.4zm-9.4-6.8s-4.2 1-1.5 1.4c1.1.1 3.4.1 5.5-.1 1.7-.1 3.5-.5 3.5-.5s-.6.3-1 .5c-4.2 1.1-12.3.6-9.9-.5 2-1 3.4-.8 3.4-.8zm7.5 4.2c4.2-2.2 2.3-4.3.9-4-.3.1-.5.2-.5.2s.1-.3.5-.4c3.7-1.3 6.5 3.8-.9 5.8 0-.1.1-.1 0-.5v-.1z" fill="white" />
      <path d="M16.5 3s2.4 2.4-2.3 6.1c-3.8 3-.9 4.7 0 6.6-2.2-2-3.8-3.7-2.7-5.4 1.6-2.4 6-3.5 5-7.3z" fill="white" />
    </svg>
  ),
  abap: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#003366" />
      {/* SAP brand stripe */}
      <rect x="0" y="22" width="32" height="10" rx="0" fill="#0070D2" opacity="0.4" />
      <rect x="0" y="25" width="32" height="7" rx="0" fill="#0070D2" opacity="0.3" />
      {/* SAP text - brand */}
      <text x="16" y="18" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="'Helvetica Neue',Arial,sans-serif" letterSpacing="0.5">SAP</text>
      {/* ABAP sub-label */}
      <text x="16" y="26.5" textAnchor="middle" dominantBaseline="middle" fill="#89B8E8" fontSize="5.5" fontFamily="'Helvetica Neue',Arial,sans-serif" letterSpacing="1.2">ABAP</text>
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#1a1a1a" />
      <path d="M16 5L5 11v10l11 6 11-6V11L16 5zm0 2.3l8.5 4.9v9.6L16 26.7l-8.5-4.9v-9.6L16 7.3zm-4 5.7v6l4 2.3 4-2.3V13h-2v5l-2 1.15L14 18v-5h-2z" fill="#339933" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#20232A" />
      <circle cx="16" cy="16" r="2.5" fill="#61DAFB" />
      <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
      <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 16 16)" />
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#000" />
      <defs>
        <linearGradient id="nxtg" x1="20.5" y1="10" x2="20.5" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="0.6" stopColor="white" stopOpacity="0.6" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Left vertical bar */}
      <rect x="10" y="10" width="2.2" height="12" fill="white" />
      {/* Right vertical bar — fades to transparent */}
      <rect x="19.8" y="10" width="2.2" height="12" fill="url(#nxtg)" />
      {/* Diagonal bar — left-bottom to right-top */}
      <path d="M12.2 22L22 10h-2.5L10 21.5V22h2.2z" fill="white" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#0F172A" />
      <path d="M16 9c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.1 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C19.62 10.15 18.5 9 16 9zm-5 7c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.1 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C14.62 17.15 13.5 16 11 16z" fill="#38BDF8" />
    </svg>
  ),
  antdesign: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#0170FE" />
      {/* Diamond outline */}
      <path d="M16 5L27 16L16 27L5 16z" fill="none" stroke="white" strokeWidth="1.4" strokeLinejoin="round" opacity="0.6" />
      {/* Ant head */}
      <circle cx="16" cy="13" r="2" fill="white" />
      {/* Antennae */}
      <path d="M14.8 11.5L12.5 9.2" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M17.2 11.5L19.5 9.2" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="12" cy="8.8" r="0.8" fill="white" />
      <circle cx="20" cy="8.8" r="0.8" fill="white" />
      {/* Ant body */}
      <ellipse cx="16" cy="18" rx="2.4" ry="3" fill="white" />
      {/* Legs */}
      <path d="M13.6 16.5L11 15.5M13.6 18L11 18M13.6 19.5L11 20.5" stroke="white" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M18.4 16.5L21 15.5M18.4 18L21 18M18.4 19.5L21 20.5" stroke="white" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  ),
  supabase: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#1C1C1C" />
      <path d="M18 5v13l9-13H18z" fill="#3ECF8E" />
      <path d="M14 27V14L5 27h9z" fill="#3ECF8E" fillOpacity="0.7" />
    </svg>
  ),
  firebase: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#1C1C1C" />
      <path d="M8 24l4.5-16.5 3.5 6.5L19 10l5 14H8z" fill="#FFA000" />
      <path d="M8 24l4.5-8 3.5 3.5L8 24z" fill="#F57F17" />
      <path d="M19 10l5 14-7.5-4.5L19 10z" fill="#FFCA28" />
    </svg>
  ),
  sqlserver: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#CC2927" />
      <ellipse cx="16" cy="10" rx="9" ry="3.5" fill="#FF6B6B" />
      <path d="M7 10v5c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5v-5c0 1.93-4.03 3.5-9 3.5S7 11.93 7 10z" fill="#CC2927" />
      <path d="M7 15v5c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5v-5c0 1.93-4.03 3.5-9 3.5S7 16.93 7 15z" fill="#990000" />
      <ellipse cx="16" cy="10" rx="9" ry="3.5" fill="none" stroke="#FF8A8A" strokeWidth="0.5" />
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#1C1C1C" />
      <circle cx="20" cy="16" r="4" fill="#1ABCFE" />
      <path d="M12 24a4 4 0 0 0 4-4v-4h-4a4 4 0 0 0 0 8z" fill="#0ACF83" />
      <path d="M8 12a4 4 0 0 1 4-4h4v8h-4a4 4 0 0 1-4-4z" fill="#FF7262" />
      <path d="M16 8h4a4 4 0 0 1 0 8h-4V8z" fill="#F24E1E" />
      <path d="M16 16h4a4 4 0 0 1 0 8h-4v-8z" fill="#A259FF" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#F05032" />
      <path d="M27.2 14.8L17.2 4.8a2.74 2.74 0 0 0-3.87 0L11.1 7.07l2.46 2.46a3.25 3.25 0 0 1 4.1 4.14l2.37 2.37a3.25 3.25 0 1 1-1.94 1.94l-2.21-2.21v5.83a3.25 3.25 0 1 1-2.67.07V15.6a3.25 3.25 0 0 1-1.76-4.26L8.99 8.88l-4.2 4.2a2.74 2.74 0 0 0 0 3.87l10 10a2.74 2.74 0 0 0 3.87 0l8.54-8.54a2.74 2.74 0 0 0 0-3.63z" fill="white" />
    </svg>
  ),
  vscode: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#007ACC" />
      <path d="M23.5 5L16 13l-5.5-4.5-3.5 2v17l3.5 2 5.5-4.5 7.5 8 3.5-2V7L23.5 5zM23 21.5l-5-4 5-4v8z" fill="white" />
    </svg>
  ),
  claudecode: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#CC785C" />
      <circle cx="16" cy="14" r="6" fill="#F5E6DC" />
      <path d="M10 23c0-3.31 2.69-5 6-5s6 1.69 6 5" stroke="#CC785C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M13 12.5c.5-1 1.5-1.5 3-1.5" stroke="#CC785C" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect width="32" height="32" rx="6" fill="#000" />
      <path d="M16 7L29 25H3L16 7z" fill="white" />
    </svg>
  ),
};

function getTechLogo(skill: string): ReactNode {
  // Strip spaces, dots, dashes, underscores for fuzzy matching
  const s = skill.toLowerCase().replace(/[\s.\-_]/g, '');

  if (s.includes('javascript') || s === 'js') return TECH_LOGOS.javascript;
  if (s.includes('typescript') || s === 'ts') return TECH_LOGOS.typescript;
  if (s === 'html' || s.startsWith('html')) return TECH_LOGOS.html;
  if (s === 'css' || s.startsWith('css')) return TECH_LOGOS.css;
  // Java must come AFTER javascript check
  if (s === 'java' || (s.includes('java') && !s.includes('javascript') && !s.includes('javax'))) return TECH_LOGOS.java;
  if (s.includes('abap') || s.includes('sap')) return TECH_LOGOS.abap;
  // Node.js → "nodejs", "node", "nodejsruntime", "nodejs"
  if (s.startsWith('node') || s.includes('nodejs')) return TECH_LOGOS.nodejs;
  // Next.js → "nextjs", "nextjsruntime", etc — must come BEFORE react
  if (s.includes('next')) return TECH_LOGOS.nextjs;
  if (s.includes('react')) return TECH_LOGOS.react;
  if (s.includes('tailwind')) return TECH_LOGOS.tailwind;
  // Ant Design → "antdesign", "antd", "ant"
  if (s.includes('antdesign') || s.includes('antd') || s === 'ant') return TECH_LOGOS.antdesign;
  if (s.includes('supabase')) return TECH_LOGOS.supabase;
  if (s.includes('firebase')) return TECH_LOGOS.firebase;
  // SQL Server → "sqlserver", "sql", "sqlsrv"
  if (s.includes('sql')) return TECH_LOGOS.sqlserver;
  if (s.includes('figma')) return TECH_LOGOS.figma;
  // Git must come BEFORE github/gitlab to avoid mismatch
  if (s.includes('git')) return TECH_LOGOS.git;
  // VS Code → "vscode", "visualstudiocode", "code"
  if (s.includes('vscode') || s.includes('visualstudio') || s === 'code') return TECH_LOGOS.vscode;
  // Claude Code → "claudecode", "claude"
  if (s.includes('claude')) return TECH_LOGOS.claudecode;
  if (s.includes('vercel')) return TECH_LOGOS.vercel;
  return null;
}

// ─────────────────────────────────────────────
// Category types & config
// ─────────────────────────────────────────────
type TechCategory = 'languages' | 'framework' | 'database' | 'tools';

function getTechCategory(skill: string): TechCategory {
  const normalized = skill.toLowerCase();
  if (normalized.includes('firebase') || normalized.includes('supabase')) return 'database';
  if (normalized.includes('sql')) return 'database';
  if (
    normalized.includes('next.js') ||
    normalized.includes('react') ||
    normalized.includes('tailwind') ||
    normalized.includes('ant design') ||
    normalized.includes('antdesign')
  ) return 'framework';
  if (
    normalized.includes('abap') ||
    normalized.includes('typescript') ||
    normalized.includes('javascript') ||
    normalized.includes('html') ||
    normalized.includes('css') ||
    normalized.includes('java') ||
    normalized.includes('node.js') ||
    normalized.includes('nodejs')
  ) return 'languages';
  return 'tools';
}

function getSoftSkillEmoji(skill: string): string {
  const s = skill.toLowerCase();
  if (s.includes('excel') || s.includes('word')) return '📊';
  if (s.includes('task') || (s.includes('quản lý') && s.includes('công việc'))) return '✅';
  if (s.includes('time') || s.includes('thời gian')) return '⏱️';
  if (s.includes('multitasking') || s.includes('đa nhiệm')) return '🧩';
  if (s.includes('problem') || s.includes('giải quyết')) return '🧠';
  if (s.includes('training') || s.includes('đào tạo')) return '🎓';
  if (s.includes('communication') || s.includes('giao tiếp')) return '💬';
  return '🤝';
}

const CATEGORY_CONFIG: Record<TechCategory, {
  accentFrom: string;
  border: string;
  badge: string;
  dot: string;
}> = {
  languages: {
    accentFrom: 'from-indigo-500/15',
    border: 'border-indigo-500/25',
    badge: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
    dot: 'bg-indigo-400',
  },
  framework: {
    accentFrom: 'from-fuchsia-500/15',
    border: 'border-fuchsia-500/25',
    badge: 'text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/20',
    dot: 'bg-fuchsia-400',
  },
  database: {
    accentFrom: 'from-cyan-500/15',
    border: 'border-cyan-500/25',
    badge: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
    dot: 'bg-cyan-400',
  },
  tools: {
    accentFrom: 'from-amber-500/15',
    border: 'border-amber-500/25',
    badge: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
    dot: 'bg-amber-400',
  },
};

// ─────────────────────────────────────────────
// SkillTile — logo card + label below
// ─────────────────────────────────────────────
function SkillTile({
  label,
  category,
  logo,
}: {
  label: string;
  category: TechCategory | 'soft';
  logo: ReactNode;
}) {
  return (
    <div className="group relative flex items-center justify-center">
      {/* Tooltip — visible only on hover */}
      <div
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-30
          opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
          transition-all duration-150 ease-out
          bg-[#111] border border-white/10 text-white text-[11px] font-medium
          px-2.5 py-1.5 rounded-lg shadow-2xl whitespace-nowrap"
        role="tooltip"
      >
        {label}
        {/* Arrow */}
        <span className="absolute top-full left-1/2 -translate-x-1/2 block w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#111]" />
      </div>

      {/* Logo tile */}
      <div
        className="w-12 h-12 rounded-xl border border-white/5 bg-white/[0.03]
          group-hover:bg-white/[0.08] group-hover:border-white/15
          group-hover:scale-110 group-hover:shadow-lg
          flex items-center justify-center
          transition-all duration-200 cursor-default"
      >
        {logo}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CategoryBox
// ─────────────────────────────────────────────
function CategoryBox({
  title,
  skills,
  category,
}: {
  title: string;
  skills: string[];
  category: TechCategory;
}) {
  const cfg = CATEGORY_CONFIG[category];

  return (
    <div className={`relative rounded-2xl border ${cfg.border} bg-white/[0.02] p-4`}>
      {/* Top gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b ${cfg.accentFrom} to-transparent pointer-events-none`} />

      {/* Header */}
      <div className="relative flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          <h3 className="text-[11px] font-semibold tracking-widest uppercase text-white/60">{title}</h3>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${cfg.badge}`}>
          {skills.length}
        </span>
      </div>

      {/* Grid */}
      <div className="relative grid grid-cols-4 sm:grid-cols-5 gap-2 pt-1">
        {skills.map((skill) => {
          const logo = getTechLogo(skill);
          return (
            <SkillTile
              key={skill}
              label={skill}
              category={category}
              logo={
                logo ?? (
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-base">
                    🛠️
                  </div>
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SkillsModal
// ─────────────────────────────────────────────
export default function SkillsModal({
  profile,
  isOpen,
  onClose,
}: {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // ── Danh sách skills cố định — luôn hiển thị đủ dù profile.technicalSkills thiếu ──
  // ── Danh sách skills cố định — dùng trực tiếp, không merge từ profile để tránh trùng ──
  const FIXED_LANGUAGES  = ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Java', 'ABAP', 'Node.js'];
  const FIXED_FRAMEWORKS = ['React', 'Next.js', 'Tailwind CSS', 'Ant Design'];
  const FIXED_DATABASES  = ['Supabase', 'Firebase', 'SQL Server'];
  const FIXED_TOOLS      = ['Figma', 'Git', 'VS Code', 'Claude Code', 'Vercel'];

  const categorized = useMemo(() => {
    const softSkills = profile.softSkills ?? [];
    return {
      softSkills,
      languages: FIXED_LANGUAGES,
      framework: FIXED_FRAMEWORKS,
      database:  FIXED_DATABASES,
      tools:     FIXED_TOOLS,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.softSkills]);

  const totalCount =
    categorized.softSkills.length +
    FIXED_LANGUAGES.length +
    FIXED_FRAMEWORKS.length +
    FIXED_DATABASES.length +
    FIXED_TOOLS.length;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl border border-white/10 bg-portfolio-bg-secondary shadow-2xl"
          >
            {/* ── Header ── */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 border-b border-white/5 bg-portfolio-bg-secondary/95 backdrop-blur-sm">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-portfolio-text-primary">
                  {t('viewAllSkills')}
                </h2>
                <p className="text-xs text-portfolio-text-muted mt-0.5">
                  {totalCount} kỹ năng · 4 nhóm công nghệ
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-portfolio-text-muted hover:text-portfolio-text-primary hover:bg-white/5 transition"
                aria-label={t('close')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* ── Soft Skills ── */}
              {categorized.softSkills.length > 0 && (
                <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-portfolio-accent" />
                    <h3 className="text-[11px] font-semibold tracking-widest uppercase text-white/60">
                      {t('labelSoftSkills')}
                    </h3>
                    <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/40 bg-white/5">
                      {categorized.softSkills.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-1">
                    {categorized.softSkills.map((skill) => (
                      <SkillTile
                        key={skill}
                        label={skill}
                        category="soft"
                        logo={
                          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-xl leading-none">
                            {getSoftSkillEmoji(skill)}
                          </div>
                        }
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* ── Technical Skills ── */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 px-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
                  <h3 className="text-[11px] font-semibold tracking-widest uppercase text-white/60">
                    {t('labelTechnicalSkills')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {categorized.languages.length > 0 && (
                    <CategoryBox title={t('categoryProgrammingLanguages')} skills={categorized.languages} category="languages" />
                  )}
                  {categorized.framework.length > 0 && (
                    <CategoryBox title={t('categoryFramework')} skills={categorized.framework} category="framework" />
                  )}
                  {categorized.database.length > 0 && (
                    <CategoryBox title={t('categoryDatabase')} skills={categorized.database} category="database" />
                  )}
                  {categorized.tools.length > 0 && (
                    <CategoryBox title={t('categoryTools')} skills={categorized.tools} category="tools" />
                  )}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="px-6 pb-4 pt-1">
              <p className="text-[10px] text-center text-white/15">
                Hover vào logo để xem tên công nghệ
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}