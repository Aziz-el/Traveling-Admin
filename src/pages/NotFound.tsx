import { useNavigate } from 'react-router';
import { Home, MapPin, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="
      min-h-[697px]
      flex items-center justify-center
      px-4 py-10
      dark:bg-gray-950
    ">
      <div className="
        w-full max-w-md sm:max-w-lg
        bg-white dark:bg-gray-900
        rounded-xl
        border border-gray-200 dark:border-gray-800
        shadow-sm
        p-6 sm:p-8
        text-center
      ">
        <div className="
          flex items-center justify-center
          w-14 h-14 sm:w-16 sm:h-16
          bg-blue-50 dark:bg-blue-500/10
          rounded-full
          mx-auto
          mb-5 sm:mb-6
        ">
          <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
        </div>

        <h1 className="
          text-2xl sm:text-3xl
          font-bold
          text-gray-900 dark:text-white
          mb-2
        ">
          Страница не найдена
        </h1>

        <p className="
          text-sm sm:text-base
          text-gray-600 dark:text-gray-400
          mb-6
        ">
          К сожалению, запрошенная страница не найдена. Проверьте URL или вернитесь на главную.
        </p>

        <div className="
          flex flex-col sm:flex-row
          gap-3
          justify-center
        ">
          <button
            onClick={() => navigate('/dashboard')}
            className="
              inline-flex items-center justify-center gap-2
              px-4 py-2.5
              bg-blue-600 text-white
              rounded-lg
              hover:bg-blue-700
              transition
            "
          >
            <Home className="w-4 h-4" />
            На главную
          </button>

          <button
            onClick={() => navigate('/tours')}
            className="
              inline-flex items-center justify-center gap-2
              px-4 py-2.5
              border
              text-gray-700 dark:text-gray-300
              rounded-lg
              hover:bg-gray-50 dark:hover:bg-gray-800
              transition
            "
          >
            <MapPin className="w-4 h-4" />
            К турам
          </button>

          <button
            onClick={() => navigate(-1)}
            className="
              inline-flex items-center justify-center gap-2
              px-4 py-2.5
              border
              text-gray-700 dark:text-gray-300
              rounded-lg
              hover:bg-gray-50 dark:hover:bg-gray-800
              transition
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>
        </div>
      </div>
    </div>
  );
}
