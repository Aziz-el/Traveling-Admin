import React from 'react'
import { Tour } from '../../../../app/App';

export default function FormModal({editingTour, setEditingTour, formData, setFormData, handleUpdate,handleInputChange}: {editingTour:Tour, setEditingTour:React.Dispatch<React.SetStateAction<Tour | null>>, formData:Tour, setFormData:React.Dispatch<React.SetStateAction<Tour | null>>, handleUpdate:(e:React.FormEvent<HTMLFormElement>)=>void, handleInputChange:(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>void}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-gray-900 dark:text-white">Редактировать тур</h2>
              <p className="text-gray-600 dark:text-gray-400">{editingTour.name}</p>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">Название</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">Описание</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none resize-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">Категория</label>
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
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">Компания</label>
                  <select
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="GitLens Travel">GitLens Travel</option>
                    <option value="Aviasales Tours">Aviasales Tours</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">Цена ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">Статус</label>
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
                <label className="block mb-2 text-gray-700 dark:text-gray-300">URL изображения</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">Старт: Широта</label>
                  <input
                    type="number"
                    name="startLat"
                    value={formData.startLat}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">Старт: Долгота</label>
                  <input
                    type="number"
                    name="startLng"
                    value={formData.startLng}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">Финиш: Широта</label>
                  <input
                    type="number"
                    name="endLat"
                    value={formData.endLat}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">Финиш: Долгота</label>
                  <input
                    type="number"
                    name="endLng"
                    value={formData.endLng}
                    onChange={handleInputChange}
                    step="0.0001"
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="flex-1 px-6 py-3 text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}
