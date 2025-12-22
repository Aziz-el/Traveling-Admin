import React, { useState } from 'react';
import { ApplicationType } from '../../model/types';
import { Check, X } from 'lucide-react';

interface ApplicationCardProps {
  application: ApplicationType;
  onChangeStatus?: (id: number, status: 'подтвержден' | 'отклонен') => void;
}

export default function ApplicationCard({ application, onChangeStatus }: ApplicationCardProps) {
  const [status, setStatus] = useState<ApplicationType['status']>(application.status);

  const handleApprove = () => {
    setStatus('подтвержден');
    onChangeStatus?.(application.id, 'подтвержден');
  };

  const handleReject = () => {
    setStatus('отклонен');
    onChangeStatus?.(application.id, 'отклонен');
  };

  return (
    <div
      className={`relative bg-white dark:bg-gray-900 rounded-xl shadow-md border overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer
        ${status === 'подтвержден' 
          ? 'border-green-500 dark:border-green-400 ring-2 ring-green-100 dark:ring-green-900' 
          : status === 'отклонен' 
          ? 'border-red-500 dark:border-red-400 ring-2 ring-red-100 dark:ring-red-900' 
          : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight break-words">
            {application.sender}
          </h3>
          
          {status !== 'ожидает' && (
            <span className={`flex-shrink-0 px-2.5 py-1 text-xs font-semibold rounded-full ${
              status === 'подтвержден' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {status === 'подтвержден' ? 'Активный' : 'Отклонен'}
            </span>
          )}
        </div>

        {status === 'ожидает' ? (
          <div className="flex flex-col gap-2 sm:gap-3">
            <button
              onClick={handleApprove}
              className="flex items-center justify-center w-full gap-2 px-3 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200"
            >
              <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              Подтвердить
            </button>
            <button
              onClick={handleReject}
              className="flex items-center justify-center w-full gap-2 px-3 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900 transition-colors duration-200"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
              Отклонить
            </button>
          </div>
        ) : (
          <div className={`flex items-center gap-2 py-3 px-4 rounded-lg ${
            status === 'подтвержден' 
              ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900' 
              : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900'
          }`}>
            {status === 'подтвержден' ? (
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            ) : (
              <X className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            )}
            <span className={`text-base sm:text-lg font-semibold ${
              status === 'подтвержден' 
                ? 'text-green-700 dark:text-green-400' 
                : 'text-red-700 dark:text-red-400'
            }`}>
              {status === 'подтвержден' ? 'Подтверждено' : 'Отклонено'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}