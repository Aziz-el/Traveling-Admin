import React from 'react'
import { TourProps, TourType } from '../../model/type'
import { ImageWithFallback } from '../../../../shared/ui/ImageWithFallback';
import { Link, useNavigate } from 'react-router';
import { Clock, DollarSign, Edit, MapPin, Star, Trash2, Users } from 'lucide-react';
import { useTourStore } from '../../model/useTourStore';
import { optimizeImageUrl } from '../../../../shared/utils/imageRenderingOptimizator';
import ConfirmDialog from '../../../../shared/ui/ConfirmDialog';
import ConfirmModal from '../../../../shared/ui/ConfirmModal';
import { useToast } from '../../../../shared/ui/Toast';
import { useState } from 'react';

export default function TourCardFull({ tour, setFormData, setEditingTour, onSelectTour, selectedTourId }: TourProps & {
  setFormData?: React.Dispatch<React.SetStateAction<TourType | null>>,
  setEditingTour?: React.Dispatch<React.SetStateAction<TourType | null>>
}) {
  const optimizedImageUrl = optimizeImageUrl(tour?.image_url, 800, 90);
  const navigate = useNavigate();
  const tourStore = useTourStore();
  const onDeleteTour = tourStore.deleteTour;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState('');
  const { showToast } = useToast();

  const handleEdit = (tour: TourType) => {
    setEditingTour?.(tour);
    setFormData?.(tour);
  };

  const handleDelete = (id: string, name: string) => {
    setDialogOpen(true);
    setPendingId(id);
  };

  if (tour === undefined) {
    return <div>Tour not found</div>
  }

  return (
    <>
    <div
      key={tour?.id}
      onClick={() => { onSelectTour?.(tour?.id); navigate(`/tours/${tour?.id}`); }}
      className={`relative bg-white dark:bg-gray-900 rounded-xl shadow-md border overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer 
        ${selectedTourId === tour?.id
          ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-100 dark:ring-blue-900'
          : 'border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700'
        }`}
    >
      <div className="relative overflow-hidden bg-gray-100 aspect-video dark:bg-gray-800">
        <ImageWithFallback
          src={optimizedImageUrl || tour?.image_url}
          alt={tour?.title}
          className="object-cover w-full h-full antialiased transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:opacity-100"></div>

        <div className="absolute flex gap-2 top-3 right-3">
          <span
            className={`px-3 py-1.5 text-sm font-semibold rounded-full backdrop-blur-md shadow-lg ${tour?.is_active
                ? 'bg-green-500/95 text-white'
                : 'bg-gray-500/95 text-white'
              }`}
          >
            {tour?.is_active ? "Активный" : "Неактивный"}
          </span>
        </div>

        {tour?.rating > 0 && (
          <div className="absolute flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white rounded-lg shadow-lg bottom-3 left-3 bg-white/10 border border-white/10 backdrop-blur-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            {tour?.rating.toFixed(1)}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors line-clamp-1 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {tour?.title}
          </h3>
          {tour?.description && (
            <p className="text-sm leading-relaxed text-gray-600 line-clamp-2 dark:text-gray-400">
              {tour?.description}
            </p>
          )}
        </div>

        <div className="pb-4 mb-4 space-y-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg dark:bg-blue-900/30">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="truncate">{tour?.location}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg dark:bg-purple-900/30">
              <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span>{tour?.duration}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg dark:bg-green-900/30">
              <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <span>Вместимость: {tour?.capacity} чел.</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg dark:bg-blue-900/30">
              <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">от</p>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${tour?.price}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link to={`/edit-tour/${tour?.id}`} className="flex-1">
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
            >
              <Edit className="w-4 h-4" />
              Изменить
            </button>
          </Link>

          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(tour?.id, tour?.title); setTimeout(() => { tourStore.fetchTours() }, 1000); }}
            className="flex items-center justify-center flex-1 gap-2 px-4 py-2.5 text-sm font-medium text-red-600 transition-all duration-200 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900"
          >
            <Trash2 className="w-4 h-4" />
            Удалить
          </button>
        </div>
      </div>
    </div>
    <ConfirmDialog open={dialogOpen} title="Подтвердите удаление" message={pendingId ? `Вы уверены, что хотите удалить тур?` : ''} onCancel={() => setDialogOpen(false)} onConfirm={async () => {
      if (!pendingId) return;
      try {
        await onDeleteTour(pendingId);
        setConfirmMsg('Тур удалён');
        setConfirmOpen(true);
      } catch (err) {
        console.debug('Delete tour failed', err);
        showToast('Не удалось удалить тур', 'error');
      } finally {
        setDialogOpen(false);
        setPendingId(null);
      }
    }} />
    <ConfirmModal open={confirmOpen} title="Готово" message={confirmMsg} onClose={() => setConfirmOpen(false)} />
    </>
  )
}