import { LayoutDashboard, Plus, MapPin, Building2, Users, Route, Settings, CalendarCheck, Moon, Sun } from 'lucide-react';
import {NavLink} from 'react-router';
interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Sidebar({ activeSection, setActiveSection, isDarkMode, toggleDarkMode }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add-tour', label: 'Добавить тур', icon: Plus },
    { id: 'tours', label: 'Туры', icon: MapPin },
    { id: 'companies', label: 'Компании', icon: Building2 },
    { id: 'bookings', label: 'Бронирования', icon: CalendarCheck },
    { id: 'users', label: 'Пользователи', icon: Users },
    { id: 'routes', label: 'Маршруты', icon: Route },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-blue-600 dark:text-blue-400">TravelAdmin</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={`/${item.id}`}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span>{isDarkMode ? 'Светлая тема' : 'Темная тема'}</span>
        </button>
      </div>
    </aside>
  );
}
