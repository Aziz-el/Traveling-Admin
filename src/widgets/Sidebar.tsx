import { LayoutDashboard, Plus, MapPin, Building2, Users, Route, Settings, CalendarCheck, Moon, Sun, Star, Menu,Dock} from 'lucide-react';
import { Link } from 'react-router';

interface SidebarProps {
  activeSection?: string;
  setActiveSection?: (s: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  mobileOpen?: boolean;
  onClose?: () => void;
  onToggle?: () => void;
}

export function Sidebar({ activeSection, setActiveSection, isDarkMode, toggleDarkMode, mobileOpen, onClose, onToggle }: SidebarProps) {
  const menuItems = [
    { id: '', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add-tour', label: 'Добавить тур', icon: Plus },
    { id: 'tours', label: 'Туры', icon: MapPin },
    { id: 'companies', label: 'Компании', icon: Building2 },
    { id: 'bookings', label: 'Бронирования', icon: CalendarCheck },
    { id: 'users', label: 'Пользователи', icon: Users },
    // { id: 'routes', label: 'Маршруты', icon: Route },
    {id: 'reviews', label: 'Отзывы', icon: Star },
    // { id: 'settings', label: 'Настройки', icon: Settings },
    {id:'applications',label:"Заявки",icon :Dock}
  ];

  return (
    <>
      {/* Mobile topbar with H1 and burger - shows on mobile only */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center h-12 px-3 bg-white border-b border-gray-200 md:hidden dark:bg-gray-900 dark:border-gray-800">
        <button onClick={() => onToggle && onToggle()} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="ml-3 text-blue-600 dark:text-blue-400">TravelAdmin</h1>
      </div>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 left-0 flex-col hidden w-64 h-screen overflow-y-auto bg-white border-r border-gray-200 md:flex dark:bg-gray-900 dark:border-gray-800">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-blue-600 dark:text-blue-400">TravelAdmin</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1 ">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = activeSection === item.id;
          if (setActiveSection) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              to={`/${item.id}`}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={toggleDarkMode}
            className="flex items-center w-full gap-3 px-4 py-3 text-gray-700 transition-colors rounded-lg dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span>{isDarkMode ? 'Светлая тема' : 'Темная тема'}</span>
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      { (
        <>
        
<div
  className={`fixed inset-0 z-30 transform transition-transform duration-300 ease-in-out ${
    mobileOpen ? 'translate-x-0' : '-translate-x-full'
  }`}
>
            <div className="absolute inset-0 bg-black/30" onClick={onClose} ></div>
          <aside className="absolute bottom-0 left-0 w-full p-4 overflow-y-auto bg-white border-r border-gray-200 top-12 dark:bg-gray-900 dark:border-gray-800">
            <div className="flex items-center justify-end p-2 border-b border-gray-200 dark:border-gray-800">
              <button onClick={onClose} className="text-gray-600 dark:text-gray-300">✕</button>
            </div>

            <nav className="flex-1 p-2 mt-2 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={`/${item.id}`}
                    onClick={onClose}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 `}
                  >
                    <div className="flex items-center gap-3 div w-[200px] ">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="p-2 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => {
                  toggleDarkMode();
                  onClose && onClose();
                }}
                className="flex items-center w-full gap-3 px-4 py-3 text-gray-700 transition-colors rounded-lg dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{isDarkMode ? 'Светлая тема' : 'Темная тема'}</span>
              </button>
            </div>
          </aside>
        </div>
        </>
      )}
    </>
  );
}
