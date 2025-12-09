import { useState } from 'react';
import { Tour } from '../app/App';
import { InteractiveMap } from '../shared/components/InteractiveMap';
import { ImageWithFallback } from '../shared/ui/ImageWithFallback';

interface AddTourProps {
  onAddTour: (tour: Tour) => void;
  categoryImages: Record<string, string>;
}

export function AddTour({ onAddTour, categoryImages }: AddTourProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Азия' as Tour['category'],
    company: 'GitLens Travel',
    startTime: '',
    endTime: '',
    startLat: '',
    startLng: '',
    endLat: '',
    endLng: '',
    status: 'Активный' as Tour['status'],
    image: '',
  });

  const [previewTour, setPreviewTour] = useState<Tour | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      if (name === 'category') {
        updated.image = categoryImages[value] || '';
      }
      
      return updated;
    });
  };

  const handlePreview = () => {
    if (!formData.startLat || !formData.startLng || !formData.endLat || !formData.endLng) {
      alert('Пожалуйста, заполните все координаты');
      return;
    }

    if (!formData.startTime || !formData.endTime) {
      alert('Пожалуйста, заполните дату и время начала и окончания');
      return;
    }

    const tour: Tour = {
      id: Date.now().toString(),
      name: formData.name || 'Предпросмотр',
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      category: formData.category,
      company: formData.company,
      startLat: parseFloat(formData.startLat),
      startLng: parseFloat(formData.startLng),
      endLat: parseFloat(formData.endLat),
      endLng: parseFloat(formData.endLng),
      status: formData.status,
      image: formData.image || categoryImages[formData.category],
      startTime: formData.startTime ? formData.startTime.replace('T', ' ') : '',
      endTime: formData.endTime ? formData.endTime.replace('T', ' ') : ''
    };

    setPreviewTour(tour);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    if (!formData.name || !formData.price || !formData.startLat || !formData.startLng || !formData.endLat || !formData.endLng || !formData.startTime || !formData.endTime) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const tour: Tour = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      company: formData.company,
      startLat: parseFloat(formData.startLat),
      startLng: parseFloat(formData.startLng),
      endLat: parseFloat(formData.endLat),
      endLng: parseFloat(formData.endLng),
      status: formData.status,
      image: formData.image || categoryImages[formData.category],
      startTime: formData.startTime ? formData.startTime.replace('T', ' ') : '',
      endTime: formData.endTime ? formData.endTime.replace('T', ' ') : ''
    };

    onAddTour(tour);
    
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Азия',
      company: 'GitLens Travel',
      startTime: '',
      endTime: '',
      startLat: '',
      startLng: '',
      endLat: '',
      endLng: '',
      status: 'Активный',
      image: '',
    });
    setPreviewTour(null);

    alert('Тур успешно создан!');
  };

  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="mb-8">
        <h1 className="text-gray-900 dark:text-white mb-2">Добавить тур</h1>
        <p className="text-gray-600 dark:text-gray-400">Создайте новый туристический маршрут</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Название тура *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Например: Токио - Киото Экспресс"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Описание
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Краткое описание тура"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Категория *
                </label>
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
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Компания *
                </label>
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
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Начало (дата и время) *</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Окончание (дата и время) *</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Цена ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="1500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Статус *
                </label>
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
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                URL изображения (опционально)
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Оставьте пустым для автоматического выбора по категории"
              />
              {(formData.image || categoryImages[formData.category]) && (
                <div className="mt-3 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={formData.image || categoryImages[formData.category]}
                    alt="Предпросмотр"
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Координаты маршрута</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Старт: Широта *
                  </label>
                  <input
                    type="number"
                    name="startLat"
                    value={formData.startLat}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="35.6762"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Старт: Долгота *
                  </label>
                  <input
                    type="number"
                    name="startLng"
                    value={formData.startLng}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="139.6503"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Финиш: Широта *
                  </label>
                  <input
                    type="number"
                    name="endLat"
                    value={formData.endLat}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="35.0116"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Финиш: Долгота *
                  </label>
                  <input
                    type="number"
                    name="endLng"
                    value={formData.endLng}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="135.7681"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
              <button
                type="button"
                onClick={handlePreview}
                className="flex-1 px-6 py-3 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
              >
                Показать на карте
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Создать тур
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-gray-900 dark:text-white">Предпросмотр маршрута</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {previewTour ? 'Маршрут отображен на карте' : 'Нажмите "Показать на карте" для предпросмотра'}
            </p>
          </div>
          <div className="h-[calc(100%-80px)]">
            <InteractiveMap tours={previewTour ? [previewTour] : []} />
          </div>
        </div>
      </div>
    </div>
  );
}
