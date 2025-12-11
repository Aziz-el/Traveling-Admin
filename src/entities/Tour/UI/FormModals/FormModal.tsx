import React, { useEffect } from 'react'

export default function FormModal({
  editingTour,
  setEditingTour,
  formData,
  setFormData,
  handleUpdate,
  handleInputChange
}: any) {

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  const handleScheduleChange = (day: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          [field]: value
        }
      }
    }))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={() => {
        setEditingTour(null)
        setFormData(null)
        document.body.style.overflow = 'auto'
      }}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-gray-900 dark:text-white">Редактировать тур</h2>
          <p className="text-gray-600 dark:text-white">{editingTour.title}</p>
        </div>

        <form  className="p-6 space-y-6">

          <div>
            <label className="block mb-1 dark:text-white">Название</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white border rounded-lg dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 dark:text-white">Описание</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 bg-white border rounded-lg resize-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 dark:text-white">URL изображения</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white border rounded-lg dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 dark:text-white">Локация</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white border rounded-lg dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 dark:text-white">Длительность</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white border rounded-lg dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 dark:text-white">Цена ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white border rounded-lg dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-1 dark:text-white">Вместимость</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white border rounded-lg dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium dark:text-white">Расписание</h3>

            {["day1", "day2", "day3"].map((day) => (
              <div key={day} className="p-4 border rounded-lg dark:border-gray-700">
                <p className="mb-2 font-medium dark:text-white">{day.toUpperCase()}</p>

                <input
                  type="text"
                  value={formData.schedule?.[day]?.title || ""}
                  onChange={(e) => handleScheduleChange(day, "title", e.target.value)}
                  placeholder="Название"
                  className="w-full px-4 py-2 mb-2 bg-white border rounded-lg dark:bg-gray-800 dark:text-white"
                />

                <textarea
                  value={formData.schedule?.[day]?.desc || ""}
                  onChange={(e) => handleScheduleChange(day, "desc", e.target.value)}
                  placeholder="Описание"
                  rows={2}
                  className="w-full px-4 py-2 bg-white border rounded-lg dark:bg-gray-800 dark:text-white"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block mb-1 dark:text-white">Активен?</label>
            <select
              name="is_active"
              value={formData.is_active ? "true" : "false"}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white border rounded-lg dark:bg-gray-800 dark:text-white"
            >
              <option value="true">Активный</option>
              <option value="false">Неактивный</option>
            </select>
          </div>

          <div className="flex gap-4 pt-6 border-t dark:border-gray-800">
            <button
              type="button"
              onClick={() => {
                setEditingTour(null)
                setFormData(null)
                document.body.style.overflow = 'auto'
              }}
              className="flex-1 px-6 py-3 border rounded-lg dark:text-white"
            >
              Отмена
            </button>

            <button
              onClick={handleUpdate}
              className="flex-1 px-6 py-3 text-white bg-blue-600 rounded-lg"
            >
              Сохранить
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
