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
  function onOpenMobileMenu() {
    setMobileOpen(true);
    document.body.style.overflow = 'hidden';
    
  }
  function onCloseMobileMenu() {
    setMobileOpen(false);
    document.body.style.overflow = 'auto';
  }
  return (
    token ?
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex w-full h-full bg-gray-50 dark:bg-gray-950">
        <Sidebar mobileOpen={mobileOpen} onClose={() => onCloseMobileMenu()} onToggle={() => onOpenMobileMenu()} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 p-4 md:ml-64">{children}</main>
      </div>
    </div>
    :<Navigate to="/" replace={true} />
  )
}
