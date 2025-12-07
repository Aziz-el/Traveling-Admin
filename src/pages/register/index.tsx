import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Заглушка: здесь будет логика регистрации (API call)
      await new Promise((res) => setTimeout(res, 900));
      console.log('Registered', { name, email });
      // TODO: редирект/сохранение токена
    } catch (err) {
      setError('Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Регистрация</h2>
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        <div className="mb-3">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Имя</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-3">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Пароль</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
          <button type="button" onClick={() => { setName(''); setEmail(''); setPassword(''); }} className="px-4 py-2 border rounded">Сброс</button>
        </div>
      </form>
    </div>
  );
}
