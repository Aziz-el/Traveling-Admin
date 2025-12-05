import { LayoutDashboard, MapPin, Users, Route, Settings, Plus, Building2, Library } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/' },
    { id: 'tours', label: 'Туры', icon: MapPin, to: '/tours' },
    { id: 'add-tour', label: 'Добавить тур', icon: Plus, to: '/add-tour' },
    { id: 'users', label: 'Пользователи', icon: Users, to: '/users' },
    { id: 'company', label: 'Компании', icon: Building2, to: '/company' },
    { id: 'reservation', label: 'Бронирование', icon: Library, to: '/reservation' },
    { id: 'routes', label: 'Маршруты', icon: Route, to: '/routes' },
    { id: 'settings', label: 'Настройки', icon: Settings, to: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-slate-900 text-[30px] font-bold">TravelAdmin</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
