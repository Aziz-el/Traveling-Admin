import React, { useState } from 'react';
import { Plane, } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import instance from '../shared/lib/axios/axios';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await instance.post('/auth/login', {
        username: formData.username.trim(),
        password: formData.password,
      });

      const token = response?.data?.token || response?.data?.access || response?.data?.access_token;
      if (token) {
        try { localStorage.setItem('token', token); } catch {}
        navigate('/dashboard');
      } else {
        setError('Не удалось получить токен. Проверьте данные.');
      }
    } catch (err) {
      console.error('Login error', err);
      setError('Ошибка входа: неверный email или пароль, либо сервер недоступен.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const token = localStorage.getItem('token')
    if(token != undefined && token != null){
      window.location.href = '/dashboard'
    }
  return (
    <div className='relative flex items-center justify-center min-h-screen p-4'>
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1613356522023-e95206f99214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnNldCUyMHRyYXZlbHxlbnwxfHx8fDE3NjUxODE4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>
      <div className="bg-white relative bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-[500px]">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center">
            <h1 className='text-[20px] font-medium dark:text-white/90'>
              Вход
            </h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              username
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-gray-900 bg-white border rounded-lg dark:bg-gray-800 dark:text-white"
                placeholder="username"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Пароль
            </label>
            <div className="mt-1">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-gray-900 bg-white border rounded-lg dark:bg-gray-800 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
            disabled={!formData.username || !formData.password || loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
          {error && (
            <div className="mt-2 text-sm text-red-600">{error}</div>
          )}
          <div className='flex justify-between text-sm dark:text-white/90'>
            Нет аккаунта? 
            <Link to="/register" className="text-blue-800 hover:underline ">Создать аккаунт</Link>
          </div>
        </form>
      </div>
    </div>
  );
}