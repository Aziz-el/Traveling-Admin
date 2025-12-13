import React, { useState } from 'react'
import { Navigate } from 'react-router';
import { Sidebar } from '../../widgets/Sidebar';

export default function ProtectedLayout({children}: {children: React.ReactNode}) {
   const [isDarkMode, setIsDarkMode] = useState(() => {
      const saved = localStorage.getItem('darkMode');
      return saved === 'true';
    });
    
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', String(!isDarkMode));
  };

   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    token ?
    <div className={isDarkMode ? 'dark' : ''}>
      {/* Mobile burger and h1 are rendered by Sidebar (no duplication) */}

      <div className="flex w-full h-full bg-gray-50 dark:bg-gray-950">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} onToggle={() => setMobileOpen(true)} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 md:ml-64 pt-12 p-4">{children}</main>
      </div>
    </div>
    :<Navigate to="/" replace={true} />
  )
}
