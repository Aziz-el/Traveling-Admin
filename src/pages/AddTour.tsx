import React, { useState } from 'react';
import { Tour } from '../app/App';
import { useCompaniesStore } from '../entities/Companies/model/useCompanyStore';
import { useNavigate } from 'react-router';
import { InteractiveMap } from '../shared/components/InteractiveMap';
import { ImageWithFallback } from '../shared/ui/ImageWithFallback';
import { useTourStore } from '../entities/Tour/model/useTourStore';

interface AddTourProps {
  categoryImages: Record<string, string>;
}

export function AddTour({  categoryImages }: AddTourProps) {
  let onAddTour = useTourStore().addTour;
  const companies = useCompaniesStore(state => state.companies);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Азия' as Tour['category'],
    company: companies[0] ?? 'GitLens Travel',
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
    // Перейти на список туров — тур добавлен в состояние в `App`
    navigate('/tours');

    setFormData(prev => ({
      ...prev,
      name: '',
      description: '',
      price: '',
      category: 'Азия',
      company: companies[0] ?? 'GitLens Travel',
      startTime: '',
      endTime: '',
      startLat: '',
      startLng: '',
      endLat: '',
      endLng: '',
      status: 'Активный',
      image: '',
    }));
    setPreviewTour(null);

    alert('Тур успешно создан!');
  };

  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="mb-8">
        <h1 className="mb-2 text-gray-900 dark:text-white">Добавить тур</h1>
        <p className="text-gray-600 dark:text-gray-400">Создайте новый туристический маршрут</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-700 dark:text-gray-300">
                Название тура *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Например: Токио - Киото Экспресс"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 dark:text-gray-300">
                Описание
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none resize-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Краткое описание тура"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">
                  Категория *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <label className="block mb-2 text-gray-700 dark:text-gray-300">
                  Компания *
                </label>
                <select
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    {companies.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">Начало (дата и время) *</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">Окончание (дата и время) *</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">
                  Цена ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1500"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">
                  Статус *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Активный">Активный</option>
                  <option value="Неактивный">Неактивный</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-gray-700 dark:text-gray-300">
                URL изображения (опционально)
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Оставьте пустым для автоматического выбора по категории"
              />
              {(formData.image || categoryImages[formData.category]) && (
                <div className="mt-3 overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={formData.image || categoryImages[formData.category]}
                    alt="Предпросмотр"
                    className="object-cover w-full h-40"
                  />
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
              <h3 className="mb-4 text-gray-900 dark:text-white">Координаты маршрута</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">
                    Старт: Широта *
                  </label>
                  <input
                    type="number"
                    name="startLat"
                    value={formData.startLat}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="35.6762"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">
                    Старт: Долгота *
                  </label>
                  <input
                    type="number"
                    name="startLng"
                    value={formData.startLng}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="139.6503"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">
                    Финиш: Широта *
                  </label>
                  <input
                    type="number"
                    name="endLat"
                    value={formData.endLat}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="35.0116"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">
                    Финиш: Долгота *
                  </label>
                  <input
                    type="number"
                    name="endLng"
                    value={formData.endLng}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="135.7681"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
              <button
                type="button"
                onClick={handlePreview}
                className="flex-1 px-6 py-3 text-blue-600 transition-colors border border-blue-600 rounded-lg dark:border-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                Показать на карте
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                Создать тур
              </button>
            </div>
          </form>
        </div>

        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
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
