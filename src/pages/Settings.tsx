import { User, Lock, Bell, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCurrentUser, updateUser} from '../entities/Users/model/services/user';
import { useToast } from '../shared/ui/Toast';

export function Settings() {
  const { showToast } = useToast();
  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [emailNotify, setEmailNotify] = useState(true);
  const [pushNotify, setPushNotify] = useState(false);
  const [smsNotify, setSmsNotify] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const me = await getCurrentUser();
        if (me) {
          setUserId(me.id);
          setName(me.full_name || '');
          setEmail(me.email || '');
          setPhone(me.phone || '');
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);
  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="mb-8">
        <h1 className="text-gray-900 dark:text-white mb-2">Настройки</h1>
        <p className="text-gray-600 dark:text-gray-400">Управление настройками системы</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-gray-900 dark:text-white">Профиль</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Компания</label>
              <input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Телефон</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
            <button onClick={async () => {
              try {
                if (!userId) throw new Error('User not loaded');
                await updateUser(userId, { full_name: name, email, phone, settings: { notifications: { email: emailNotify, push: pushNotify, sms: smsNotify } } } as any);
                showToast('Профиль успешно обновлён', 'success');
              } catch (e:any) {
                showToast(e?.message || 'Ошибка обновления профиля', 'error');
              }
            }} className="w-full px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              Сохранить изменения
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 dark:bg-red-950 rounded-lg">
                <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-gray-900 dark:text-white">Безопасность</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Текущий пароль</label>
              <input
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Новый пароль</label>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Подтвердите пароль</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="space-y-2">
              <button  className="w-full px-6 py-3 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors">
                Изменить пароль
              </button>
              <button onClick={() => { (function(){ if (typeof Notification !== 'undefined') { if (Notification.permission === 'granted') { new Notification('Тест уведомления', { body: 'Уведомления включены' }); showToast('Тестовое уведомление отправлено', 'info'); } else { Notification.requestPermission().then(p => { if (p === 'granted') { new Notification('Тест уведомления', { body: 'Уведомления включены' }); showToast('Тестовое уведомление отправлено', 'info'); } else { showToast('Разрешение на уведомления отклонено', 'error'); } }).catch(() => showToast('Запрос на уведомления не поддерживается', 'error')); } } else { showToast('Уведомления не поддерживаются в этом браузере', 'error'); } })() }} className="w-full px-6 py-2 border rounded">Отправить тестовое уведомление</button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 dark:bg-green-950 rounded-lg">
                <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-gray-900 dark:text-white">Уведомления</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 dark:text-white">Email уведомления</p>
                <p className="text-gray-600 dark:text-gray-400">Получать письма о новых бронированиях</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={emailNotify} onChange={(e)=>setEmailNotify(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 dark:text-white">Push уведомления</p>
                <p className="text-gray-600 dark:text-gray-400">Мгновенные уведомления в браузере</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={pushNotify} onChange={(e)=>setPushNotify(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 dark:text-white">SMS уведомления</p>
                <p className="text-gray-600 dark:text-gray-400">Получать СМС о важных событиях</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={smsNotify} onChange={(e)=>setSmsNotify(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-gray-900 dark:text-white">Региональные настройки</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Язык</label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option>Русский</option>
                <option>English</option>
                <option>中文</option>
                <option>Español</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Часовой пояс</label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option>GMT+3 (Москва)</option>
                <option>GMT+0 (UTC)</option>
                <option>GMT-5 (Нью-Йорк)</option>
                <option>GMT+8 (Пекин)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Валюта</label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option>USD ($)</option>
                <option>RUB (₽)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
            <button className="w-full px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              Сохранить настройки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
