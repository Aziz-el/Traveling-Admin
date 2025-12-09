import { useParams, useNavigate } from 'react-router';
import { Tour } from '../app/App';
import { ImageWithFallback } from '../shared/ui/ImageWithFallback';
import { InteractiveMap } from '../shared/components/InteractiveMap';
import { formatDateRange } from '../shared/utils/formatDate';

interface TourDetailsProps {
  tours: Tour[];
}

export default function TourDetails({ tours }: TourDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = tours.find(t => t.id === id);

  if (!tour) {
    return (
      <div className="p-8">
        <h2 className="text-lg font-medium">Тур не найден</h2>
        <button onClick={() => navigate('/tours')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Назад к турам</button>
      </div>
    );
  }

  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h1 className="text-2xl font-semibold mb-2">{tour.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{tour.company} • {tour.category}</p>
          <div className="mb-4">
            <ImageWithFallback src={tour.image} alt={tour.name} className="w-full h-64 object-cover rounded" />
          </div>
          <div className="mb-4 text-gray-700 dark:text-gray-300">{tour.description}</div>
          <div className="flex gap-4 mb-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Цена: <span className="text-gray-900 dark:text-white">${tour.price}</span></div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Статус: <span className="text-gray-900 dark:text-white">{tour.status}</span></div>
          </div>
          { (tour.startTime || tour.endTime) && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">{formatDateRange(tour.startTime, tour.endTime)}</div>
          ) }
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="mb-4">Карта</h3>
          <div className="h-64">
            <InteractiveMap tours={[tour]} />
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Координаты: {tour.startLat.toFixed(4)}, {tour.startLng.toFixed(4)} → {tour.endLat.toFixed(4)}, {tour.endLng.toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
}
