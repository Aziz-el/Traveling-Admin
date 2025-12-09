import React, { useState } from 'react';
import instance from '../../shared/lib/axios/axios';
import {  Plane} from 'lucide-react';

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
      if (role === 'admin' && company.trim()) payload.company = company;

      const res = await instance.post('/auth/register', payload);
      const token = res?.data?.token || res?.data?.access || res?.data?.access_token;
      if (token) localStorage.setItem('token', token);
      window.location.href = '/';
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1613356522023-e95206f99214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnNldCUyMHRyYXZlbHxlbnwxfHx8fDE3NjUxODE4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="w-full max-w-[700px] mx-auto relative z-10">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Создать аккаунт</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Выберите роль и заполните поля</p>

          {error && <div className="mb-3 text-sm text-red-500">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">ФИО</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Иван Иванов" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="mail@domain.com" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Телефон</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="+7 900 000 00 00" />
              </div>
              <div>
                <label className="block text-sm text-white/90 mb-1">&nbsp;</label>
                <div className="w-full h-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Пароль</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Повторите пароль</label>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="••••••••" />
              </div>
            </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Роль</label>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setRole('client')} className={`px-3 py-2 rounded-lg ${role === 'client' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white'}`}>Клиент</button>
                  <button type="button" onClick={() => setRole('admin')} className={`px-3 py-2 rounded-lg ${role === 'admin' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white'}`}>Админ</button>
                </div>
              </div>

            {role === 'admin' && (
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Компания</label>
                <input value={company} onChange={(e) => setCompany(e.target.value)} type="text" className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Название компании" />
              </div>
            )}

            <div className="flex items-center gap-3">
              <input id="agree" type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="w-4 h-4" />
              <label htmlFor="agree" className="text-sm text-white/90">Я принимаю условия использования</label>
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" disabled={loading} className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow">{loading ? 'Регистрация...' : 'Создать аккаунт'}</button>
              <button type="button" onClick={() => { setFullName(''); setEmail(''); setPassword(''); setConfirmPassword(''); setPhone(''); setCompany(''); setAgree(false); setRole('client'); }} className="px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300">Сброс</button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-white/90">Уже есть аккаунт? <a href="/login" className="text-blue-200">Войти</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}