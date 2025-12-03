import { LayoutDashboard, MapPin, Users, Route, Settings, Plus, Building2, Library } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tours', label: 'Туры', icon: MapPin },
    { id: 'add-tour', label: 'Добавить тур', icon: Plus },
    { id: 'users', label: 'Пользователи', icon: Users },
    { id: 'company', label: 'Компании', icon: Building2 },
    { id: 'reservation', label: 'Бронирование', icon: Library },
    { id: 'routes', label: 'Маршруты', icon: Route },
    { id: 'settings', label: 'Настройки', icon: Settings },
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
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
