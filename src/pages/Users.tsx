import { Users as UsersIcon, UserCheck, UserX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUserStore } from '../entities/Users/model/useUserStore';
import UsersSkeleton from '../shared/ui/skeletons/UsersSkeleton';

export function Users() {
  const users = useUserStore((s) => s.users);
  const fetchUsers = useUserStore((s) => s.fetchUsers);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await fetchUsers();
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchUsers]);

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.is_active).length;
  const withPhone = users.filter(u => u.phone && u.phone.trim() !== '').length;

  const roleLabel = (role?: string) => {
    if (!role) return '-';
    if (role === 'admin') return 'Админ';
    if (role === 'client') return 'Клиент';
    if (role === 'company') return 'Компания';
    return role;
  }

  return (
    <div className="h-full p-8 dark:bg-gray-950">
      <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:items-center sm:justify-between max-md:mt-5">
  <div>
    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
      Пользователи
    </h1>
    <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
     Список пользователей из бэкенда
    </p>
  </div>
</div>

      {loading ? (
        <UsersSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950">
              <UsersIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">{totalUsers > 0 ? `+${Math.round((activeUsers/totalUsers)*100)}%` : '-'} </span>
          </div>
          <h3 className="mb-1 text-gray-600 dark:text-gray-400">Всего пользователей</h3>
          <p className="text-gray-900 dark:text-white">{totalUsers}</p>
        </div>

        <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950">
              <UserCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">{activeUsers}</span>
          </div>
          <h3 className="mb-1 text-gray-600 dark:text-gray-400">Активные</h3>
          <p className="text-gray-900 dark:text-white">{activeUsers}</p>
        </div>

        <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950">
              <UserX className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">{withPhone}</span>
          </div>
          <h3 className="mb-1 text-gray-600 dark:text-gray-400">Контакты (телефон)</h3>
          <p className="text-gray-900 dark:text-white">{withPhone}</p>
        </div>
        </div>
      )}

      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-gray-900 dark:text-white">Все пользователи</h2>
        </div>

        {/* Mobile: card list */}
        <div className="md:hidden">
          <div className="p-4 space-y-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 animate-pulse" />
              ))
            ) : (
              users.map((user) => (
                <div key={user.id} className="p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.full_name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{user.email}</div>
                    </div>
                    <div className="text-xs text-right text-gray-600 dark:text-gray-400">{roleLabel(user.role)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Desktop: table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">ID</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Имя</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Телефон</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Роль</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 6 }).map((_, r) => (
                  <tr key={r} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 animate-pulse">
                    <td className="px-6 py-4 text-gray-900 dark:text-white">#</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white"><div className="h-4 bg-gray-300 rounded w-28 dark:bg-gray-700" /></td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400"><div className="w-40 h-4 bg-gray-300 rounded dark:bg-gray-700" /></td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400"><div className="h-4 bg-gray-300 rounded w-28 dark:bg-gray-700" /></td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white"><div className="w-20 h-4 bg-gray-300 rounded dark:bg-gray-700" /></td>
                    <td className="px-6 py-4"><div className="w-20 h-4 bg-gray-300 rounded dark:bg-gray-700" /></td>
                  </tr>
                ))
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 text-gray-900 dark:text-white">#{user.id}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">{user.full_name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.phone || '-'}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">{roleLabel(user.role)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full ${
                        user.is_active
                          ? 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                        {user.is_active ? <UserCheck className="w-4 h-4 mr-1" /> : <UserX className="w-4 h-4 mr-1" />}
                        {user.is_active ? 'Активный' : 'Неактивен'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
