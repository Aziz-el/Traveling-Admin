import React, { useEffect, useState } from 'react';
import { useCompaniesStore } from '../entities/Companies/model/useCompanyStore';
import { useNavigate } from 'react-router';
import ConfirmModal from '../shared/ui/ConfirmModal';
import { InteractiveMap } from '../shared/components/InteractiveMap';
import { useTourStore } from '../entities/Tour/model/useTourStore';
import { useToast } from '../shared/ui/Toast';
import CustomInput from '../shared/ui/input';
import { CustomSelect } from '../shared/ui/select';

export interface TourType {
  title: string;
  image_url: string;
  description: string;
  schedule: {
    [key: string]: {
      title: string;
      desc: string;
    };
  };
  price: number;
  location: string;
  duration: string;
  id: string;
  company_id: number;
  rating: number;
  is_active: boolean;
  capacity: number;
  lat?: number;
  lng?: number;
}

interface ScheduleDay {
  key: string;
  title: string;
  desc: string;
}

export function AddTour() {
  const addTour = useTourStore().addTour;
    let companyStore = useCompaniesStore()
  const companies = companyStore.companies
  useEffect(()=>{
   companyStore.fetchCompanies()
  },[])
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    duration: '',
    company_id: '1',
    capacity: '',
    image_url: '',
    is_active: true,
    lat: '',
    lng: '',
  });

  const [scheduleItems, setScheduleItems] = useState<ScheduleDay[]>([
    { key: 'day_1', title: '', desc: '' }
  ]);

  const [previewTour, setPreviewTour] = useState<TourType | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState('');
  const { showToast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleScheduleChange = (index: number, field: 'title' | 'desc', value: string) => {
    setScheduleItems(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addScheduleDay = () => {
    const newDayNumber = scheduleItems.length + 1;
    setScheduleItems(prev => [
      ...prev,
      { key: `day_${newDayNumber}`, title: '', desc: '' }
    ]);
  };

  const removeScheduleDay = (index: number) => {
    if (scheduleItems.length > 1) {
      setScheduleItems(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handlePreview = () => {
    if (!formData.lat || !formData.lng) {
      showToast('Пожалуйста, заполните координаты для предпросмотра', 'error');
      return;
    }

    const schedule: TourType['schedule'] = {};
    scheduleItems.forEach(item => {
      schedule[item.key] = {
        title: item.title || 'День',
        desc: item.desc || 'Описание'
      };
    });

    const tour: TourType = {
      id: Date.now().toString(),
      title: formData.title || 'Предпросмотр',
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      location: formData.location,
      duration: formData.duration,
      company_id: parseInt(formData.company_id),
      capacity: parseInt(formData.capacity) || 0,
      image_url: formData.image_url,
      is_active: formData.is_active,
      rating: 0,
      schedule: schedule,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng)
    };

    setPreviewTour(tour);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.location || !formData.duration) {
      showToast('Пожалуйста, заполните все обязательные поля', 'error');
      return;
    }

    const hasEmptySchedule = scheduleItems.some(item => !item.title.trim() || !item.desc.trim());
    if (hasEmptySchedule) {
      showToast('Пожалуйста, заполните все поля расписания', 'error');
      return;
    }

    const schedule: TourType['schedule'] = {};
    scheduleItems.forEach(item => {
      schedule[item.key] = {
        title: item.title,
        desc: item.desc
      };
    });

    const tour: TourType = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      location: formData.location,
      duration: formData.duration,
      company_id: parseInt(formData.company_id),
      capacity: parseInt(formData.capacity) || 0,
      image_url: formData.image_url,
      is_active: formData.is_active,
      rating: 0,
      schedule: schedule,
      lat: formData.lat ? parseFloat(formData.lat) : undefined,
      lng: formData.lng ? parseFloat(formData.lng) : undefined
    };

    addTour(tour as any);
    setConfirmMsg('Тур успешно создан');
    setConfirmOpen(true);

    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      duration: '',
      company_id: "1",
      capacity: '',
      image_url: '',
      is_active: true,
      lat: '',
      lng: '',
    });
    setScheduleItems([{ key: 'day_1', title: '', desc: '' }]);
    setPreviewTour(null);
  
  };

  return (
    <div className="p-8 dark:bg-gray-950">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">Добавить тур</h1>
        <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">Создайте новый туристический маршрут</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Основная информация</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Название тура *
                  </label>
                  <CustomInput
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Например: Токио - Киото Экспресс"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Описание
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none resize-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Подробное описание тура"
                  />
                </div>

                <div className="sm:grid grid-cols-2 gap-4 grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Локация *
                    </label>
                    <CustomInput
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Токио, Япония"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Продолжительность *
                    </label>
                    <CustomInput
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="7 дней / 6 ночей"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Детали тура</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Компания *
                    </label>
                    <CustomSelect
                      name="company_id"
                      value={formData.company_id}
                      onChange={handleInputChange}
                      options={companies.map(c => ({ value: String(c.id), label: c.name }))}
                      className="text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Цена ($) *
                    </label>
                    <CustomInput
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Вместимость (человек)
                    </label>
                    <CustomInput
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="20"
                    />
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Активный тур
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    URL изображения
                  </label>
                  <CustomInput
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
            <div className="pb-6">
              <div className="sm:flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Расписание тура</h2>
                <button
                  type="button"
                  onClick={addScheduleDay}
                  className="inline-flex items-center justify-center w-full gap-2 px-3 py-2 mt-2 text-sm text-blue-600 transition-colors border border-blue-600 rounded-md sm:w-auto sm:mt-0 sm:rounded-lg dark:border-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  + Добавить день
                </button>
              </div>

              <div className="space-y-4">
                {scheduleItems.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        День {index + 1}
                      </span>
                      {scheduleItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeScheduleDay(index)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-sm text-red-600 transition-colors rounded-md dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900"
                          title="Удалить день расписания"
                          aria-label={`Удалить день ${index + 1}`}
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleScheduleChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Заголовок дня"
                      />
                      <textarea
                        value={item.desc}
                        onChange={(e) => handleScheduleChange(index, 'desc', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg outline-none resize-none dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Описание дня"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex flex-col gap-4 pt-6 border-t border-gray-200 sm:flex-row dark:border-gray-800">
              <button
                type="button"
                onClick={handlePreview}
                className="w-full px-4 py-3 text-sm text-blue-600 transition-colors border border-blue-600 rounded-lg sm:flex-1 dark:border-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 sm:text-base"
              >
                Показать на карте
              </button>
              <button
                type="submit"
                className="w-full px-4 py-3 text-sm text-white transition-colors bg-blue-600 rounded-lg sm:flex-1 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 sm:text-base"
              >
                Создать тур
              </button>
            </div>
          </form>
        </div>

        {/* Карта предпросмотра */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Предпросмотр на карте</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {previewTour ? 'Локация отображена на карте' : 'Нажмите "Показать на карте" для предпросмотра'}
            </p>
          </div>
          <div className="h-[calc(100%-80px)]">
            <InteractiveMap tours={previewTour ? [previewTour] : []} />
          </div>
        </div>
      </div>
      <ConfirmModal open={confirmOpen} title="Готово" message={confirmMsg} onClose={() => { setConfirmOpen(false); navigate('/tours'); }} />
    </div>
  );
}