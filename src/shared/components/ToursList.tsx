import { useState } from 'react';
import { Tour } from '../../app/App';
import { Edit, Trash2, MapPin, DollarSign } from 'lucide-react';
import { ImageWithFallback } from '../ui/ImageWithFallback';

interface ToursListProps {
  tours: Tour[];
  onUpdateTour: (id: string, tour: Tour) => void;
  onDeleteTour: (id: string) => void;
  categoryImages: Record<string, string>;
}

export function ToursList({ tours, onUpdateTour, onDeleteTour, categoryImages }: ToursListProps) {
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState<Tour | null>(null);

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour);
    setFormData(tour);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && editingTour) {
      onUpdateTour(editingTour.id, formData);
      setEditingTour(null);
      setFormData(null);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить тур "${name}"?`)) {
      onDeleteTour(id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: name === 'price' || name.includes('Lat') || name.includes('Lng') 
          ? parseFloat(value) || 0 
          : value,
      });
    }
  };

  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="mb-8">
        <h1 className="text-gray-900 dark:text-white mb-2">Туры</h1>
        <p className="text-gray-600 dark:text-gray-400">Управление всеми турами</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <div 
            key={tour.id} 
            className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="aspect-video relative overflow-hidden">
              <ImageWithFallback
                src={tour.image}
                alt={tour.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <span className={`px-3 py-1 rounded-full backdrop-blur-sm ${
                  tour.status === 'Активный' 
                    ? 'bg-green-500/90 text-white' 
                    : 'bg-gray-500/90 text-white'
                }`}>
                  {tour.status}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-3">
                <h3 className="text-gray-900 dark:text-white mb-1 truncate">{tour.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2 h-10">
                  {tour.description}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  {tour.category}
                </span>
                <span className="text-gray-600 dark:text-gray-400 truncate">{tour.company}</span>
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">
                    {tour.startLat.toFixed(2)}, {tour.startLng.toFixed(2)} → {tour.endLat.toFixed(2)}, {tour.endLng.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">${tour.price}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(tour)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Изменить
                </button>
                <button
                  onClick={() => handleDelete(tour.id, tour.name)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingTour && formData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-gray-900 dark:text-white">Редактировать тур</h2>
              <p className="text-gray-600 dark:text-gray-400">{editingTour.name}</p>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Название</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Описание</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Категория</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="Азия">Азия</option>
                    <option value="Европа">Европа</option>
                    <option value="Америка">Америка</option>
                    <option value="Африка">Африка</option>
                    <option value="Океания">Океания</option>
                    <option value="Антарктида">Антарктида</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Компания</label>
                  <select
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="GitLens Travel">GitLens Travel</option>
                    <option value="Aviasales Tours">Aviasales Tours</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Цена ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Статус</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="Активный">Активный</option>
                    <option value="Неактивный">Неактивный</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">URL изображения</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Старт: Широта</label>
                  <input
                    type="number"
                    name="startLat"
                    value={formData.startLat}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Старт: Долгота</label>
                  <input
                    type="number"
                    name="startLng"
                    value={formData.startLng}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Финиш: Широта</label>
                  <input
                    type="number"
                    name="endLat"
                    value={formData.endLat}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Финиш: Долгота</label>
                  <input
                    type="number"
                    name="endLng"
                    value={formData.endLng}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTour(null);
                    setFormData(null);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
