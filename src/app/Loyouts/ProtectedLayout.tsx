import React, { useState } from 'react'
import { redirect } from 'react-router';
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
    if (!token) {
      if (typeof window !== 'undefined') window.location.href = '/';
      redirect("/");
    }
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex h-full bg-gray-50 dark:bg-gray-950">
        <Sidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex-1 ml-64">{children}</div>
      </div>
    </div>
  )
}
