import { ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 min-w-0 min-h-screen bg-portfolio-bg-primary flex flex-col">
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-6 lg:py-10">{children}</div>
    </main>
  );
}
