
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getUserById, updateUser } from '../entities/Users/model/services/user';
import { UserItem } from '../entities/Users/model/types';
import { useAuth } from '../shared/hooks/useAuth';
import UserDetailsSkeleton from '../shared/ui/skeletons/UserDetailsSkeleton';

export default function UserDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const { user: me, hasRole } = useAuth();
  const [user, setUser] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const id = params.id ?? me?.id;
        if (!id) return;
        const data = await getUserById(Number(id));
        setUser(data);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id, me]);

  if (loading) return <UserDetailsSkeleton variant={2} />;
  if (!user) return <div className="p-6">Пользователь не найден</div>;

  const onToggleActive = async () => {
    if (!hasRole('admin')) return;
    setSaving(true);
    try {
      const updated = await updateUser(user.id, { is_active: !user.is_active });
      setUser(updated);
    } catch (e) {
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white mt-10 dark:bg-[#071024] rounded-2xl p-6 shadow-lg border border-transparent dark:border-gray-800">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-none">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-3xl font-extrabold shadow-md ring-4 ring-white dark:ring-gray-900">{user.full_name ? user.full_name.charAt(0).toUpperCase() : '?'}</div>
          </div>

          <div className="flex-1 min-w-0 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white truncate">{user.full_name}</h2>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-300 truncate">{user.email} • {user.phone}</div>

            <div className="mt-3 flex flex-wrap items-center gap-2 justify-center md:justify-start">
              <div className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">{user.role}</div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${user.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{user.is_active ? 'Активен' : 'Отключен'}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 md:ml-auto">
            {hasRole('admin') && (
              <button
                onClick={onToggleActive}
                disabled={saving}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${saving ? 'opacity-60 cursor-not-allowed' : ''} ${user.is_active ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
              >
                {saving ? 'Сохранение...' : user.is_active ? 'Отключить' : 'Активировать'}
              </button>
            )}

            <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-md text-sm font-medium border dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">Назад</button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#051226] hover:shadow-md transition-shadow">
            <div className="text-xs text-gray-400 uppercase tracking-wide">ID</div>
            <div className="mt-2 font-semibold text-gray-900 dark:text-white">{user.id}</div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#051226] hover:shadow-md transition-shadow">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Роль</div>
            <div className="mt-2 font-semibold text-gray-900 dark:text-white">{user.role}</div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#051226] hover:shadow-md transition-shadow">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Email</div>
            <div className="mt-2 font-medium text-gray-900 dark:text-white">{user.email}</div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#051226] hover:shadow-md transition-shadow">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Телефон</div>
            <div className="mt-2 font-medium text-gray-900 dark:text-white">{user.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
