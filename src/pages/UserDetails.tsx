
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getUserById, updateUser } from '../entities/Users/model/services/user';
import { UserItem } from '../entities/Users/model/types';
import { useAuth } from '../shared/hooks/useAuth';

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

  if (loading) return <div className="p-6">Загрузка...</div>;
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
    <div className="p-6 h-[697px] max-w-3xl mx-auto">
      <div className="bg-white mt-10 dark:bg-[#071024] rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20  rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">{user.full_name ? user.full_name.charAt(0).toUpperCase() : '?'}</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.full_name}</h2>
            <div className="text-sm text-gray-500 dark:text-gray-300">{user.email} • {user.phone}</div>
            <div className="mt-2 flex items-center gap-2">
              <div className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs">{user.role}</div>
              <div className={`px-2 py-1 rounded-full text-xs ${user.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{user.is_active ? 'Активен' : 'Отключен'}</div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {hasRole('admin') && (
              <button onClick={onToggleActive} disabled={saving} className={`px-3 py-1 rounded ${saving ? 'bg-gray-200' : user.is_active ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {saving ? 'Сохранение...' : user.is_active ? 'Отключить' : 'Активировать'}
              </button>
            )}
            <button onClick={() => navigate(-1)} className="px-3 py-1 rounded border dark:text-gray-300">Назад</button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#051226]">
            <div className="text-xs text-gray-400 ">ID</div>
            <div className="font-medium text-gray-900 dark:text-white">{user.id}</div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#051226]">
            <div className="text-xs text-gray-400">Роль</div>
            <div className="font-medium text-gray-900 dark:text-white">{user.role}</div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#051226]">
            <div className="text-xs text-gray-400">Email</div>
            <div className="font-medium text-gray-900 dark:text-white">{user.email}</div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#051226]">
            <div className="text-xs text-gray-400">Телефон</div>
            <div className="font-medium text-gray-900 dark:text-white">{user.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
