import { useNavigate } from 'react-router';
import { Home, MapPin, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="p-8 min-h-screen dark:bg-gray-950 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mx-auto mb-6">
          <MapPin className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Страница не найдена</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">К сожалению, запрошенная страница не найдена. Проверьте URL или вернитесь на главную.</p>

        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Home className="w-4 h-4" />
            На главную
          </button>

          <button onClick={() => navigate('/tours')} className="inline-flex items-center gap-2 px-4 py-2 border text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            К турам
          </button>

          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-4 py-2 border text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            Назад
          </button>
        </div>
      </div>
    </div>
  );
}
