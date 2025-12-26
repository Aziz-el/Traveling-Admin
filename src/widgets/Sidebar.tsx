import {
  LayoutDashboard,
  Plus,
  MapPin,
  Building2,
  Users,
  CalendarCheck,
  Moon,
  Sun,
  Star,
  Menu,
  Dock,
  LucideProps
} from 'lucide-react'
import { Link } from 'react-router'
import checkAuth from '../features/Auth/model/services/checkAuth'
import { ForwardRefExoticComponent, useEffect, useState } from 'react'

interface SidebarProps {
  activeSection?: string
  setActiveSection?: (s: string) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
  mobileOpen?: boolean
  onClose?: () => void
  onToggle?: () => void
}

export function Sidebar({
  activeSection,
  setActiveSection,
  isDarkMode,
  toggleDarkMode,
  mobileOpen,
  onClose,
  onToggle
}: SidebarProps) {
  const menuItemsAdmin = [
    { id: '', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add-tour', label: 'Добавить тур', icon: Plus },
    { id: 'tours', label: 'Туры', icon: MapPin },
    { id: 'companies', label: 'Компании', icon: Building2 },
    { id: 'bookings', label: 'Бронирования', icon: CalendarCheck },
    { id: 'users', label: 'Пользователи', icon: Users },
    { id: 'reviews', label: 'Отзывы', icon: Star },
    { id: 'applications', label: 'Заявки', icon: Dock }
  ]

  const menuItemsCompany = [
    { id: '', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add-tour', label: 'Добавить тур', icon: Plus },
    { id: 'tours', label: 'Туры', icon: MapPin },
    { id: 'companies', label: 'Моя компании', icon: Building2 },
    { id: 'bookings', label: 'Мои Ббронирования', icon: CalendarCheck },
    { id: 'reviews', label: 'Мои отзывы', icon: Star },
    { id: 'applications', label: 'Мои заявки', icon: Dock }
  ]
  const menuItemsClient = [
    { id: '', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-company', label: 'Моя компании', icon: Building2 },
    { id: 'tours', label: 'Туры', icon: MapPin },
    { id: 'bookings', label: 'Мои Бронирования', icon: CalendarCheck },
    { id: 'reviews', label: 'Мои Отзывы', icon: Star },
    { id: 'applications', label: 'Мои Заявки', icon: Dock }
  ]
  let [role,setRole] = useState()

  useEffect(()=>{
    checkAuth()?.then(res=>{
      setRole(res.data.role)
    })
  }  ,[])
  let menuItems:{id:string,label:string,icon:ForwardRefExoticComponent<Omit<LucideProps, "ref">>}[] = []
  if(role=="admin"){
    menuItems = menuItemsAdmin
  }
  else if(role == "client"){
    menuItems = menuItemsClient
  }
  else if(role == "company"){
    menuItems = menuItemsCompany
  }
  return (
    <>
      {/* Mobile topbar (до 1024px) */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center h-12 px-3 bg-white border-b border-gray-200 lg:hidden dark:bg-gray-900 dark:border-gray-800">
        <button
          onClick={onToggle}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="ml-3 text-blue-600 dark:text-blue-400">
          TravelAdmin
        </h1>
      </div>

      {/* Desktop sidebar (от 1024px) */}
      <aside className="sticky top-0 left-0 flex-col hidden w-64 h-screen overflow-y-auto bg-white border-r border-gray-200 lg:flex dark:bg-gray-900 dark:border-gray-800">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-blue-600 dark:text-blue-400">TravelAdmin</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon
            const active = activeSection === item.id

            if (setActiveSection) {
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              )
            }

            return (
              <Link
                key={item.id}
                to={`/${item.id}`}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={toggleDarkMode}
            className="flex items-center w-full gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span>{isDarkMode ? 'Светлая тема' : 'Темная тема'}</span>
          </button>
        </div>
      </aside>

      {/* Mobile drawer (до 1024px) */}
      <div
        className={`fixed inset-0 z-30 lg:hidden transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />

        <aside className="absolute top-12 left-0 bottom-0 w-full bg-white dark:bg-gray-900 p-4 overflow-y-auto">
          <nav className="space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon
              return (
                <Link
                  key={item.id}
                  to={`/${item.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="mt-4 border-t border-gray-200 dark:border-gray-800 pt-2">
            <button
              onClick={() => {
                toggleDarkMode()
                onClose?.()
              }}
              className="flex items-center w-full gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>{isDarkMode ? 'Светлая тема' : 'Темная тема'}</span>
            </button>
          </div>
        </aside>
      </div>
    </>
  )
}
