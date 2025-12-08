import { useState } from 'react';
import isnatance from '../../shared/lib/axios/axios';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'client' | 'admin'>('client');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = () => {
    if (!fullName.trim()) return 'Введите имя';
    if (!email.includes('@')) return 'Введите корректный email';
    if (password.length < 6) return 'Пароль должен быть не менее 6 символов';
    if (password !== confirmPassword) return 'Пароли не совпадают';
    if (!agree) return 'Примите условия использования';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    try {
      const payload: any = {
        full_name: fullName,
        email,
        phone,
        role,
        password,
      };
      if (company.trim()) payload.company = company;

      const response = await isnatance.post('/auth/register', payload);

      const token = response?.data?.token || response?.data?.access || response?.data?.access_token;
      if (token) {
        localStorage.setItem('token', token);
        setSuccess('Успешно! Вы будете перенаправлены...');
        setTimeout(() => (window.location.href = '/'), 900);
        return;
      }

      setSuccess('Регистрация прошла успешно.');
      setTimeout(() => (window.location.href = '/'), 1200);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.response?.data?.detail || 'Ошибка регистрации';
      setError(typeof msg === 'string' ? msg : 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Создать аккаунт</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Выберите роль и заполните поля, чтобы зарегистрироваться.</p>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        {success && <div className="mb-4 text-sm text-green-600">{success}</div>}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">ФИО</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" className="w-full px-4 py-2 border rounded-lg bg-transparent" placeholder="Иван Иванов" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Компания (опционально)</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} type="text" className="w-full px-4 py-2 border rounded-lg bg-transparent" placeholder="Название компании" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-4 py-2 border rounded-lg bg-transparent" placeholder="mail@domain.com" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Телефон</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="w-full px-4 py-2 border rounded-lg bg-transparent" placeholder="+7 900 000 00 00" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Пароль</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full px-4 py-2 border rounded-lg bg-transparent" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Повторите пароль</label>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="w-full px-4 py-2 border rounded-lg bg-transparent" placeholder="••••••••" />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Роль</label>
          <div className="flex gap-3">
            <label className={`px-3 py-2 rounded-lg border ${role === 'client' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-transparent border-gray-200 dark:border-gray-800'}`}>
              <input type="radio" name="role" value="client" checked={role === 'client'} onChange={() => setRole('client')} className="hidden" />
              Клиент
            </label>
            <label className={`px-3 py-2 rounded-lg border ${role === 'admin' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-transparent border-gray-200 dark:border-gray-800'}`}>
              <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} className="hidden" />
              Админ
            </label>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <input id="agree" type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="w-4 h-4" />
          <label htmlFor="agree" className="text-sm text-gray-600 dark:text-gray-300">Я принимаю условия использования</label>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow">
            {loading ? 'Регистрация...' : 'Создать аккаунт'}
          </button>
          <button type="button" onClick={() => { setFullName(''); setEmail(''); setPassword(''); setConfirmPassword(''); setPhone(''); setCompany(''); setAgree(false); setRole('client'); }} className="px-4 py-2 border rounded-lg">Сброс</button>
        </div>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Уже есть аккаунт? <a href="/login" className="text-blue-600">Войти</a></p>
      </form>
    </div>
  );
}
