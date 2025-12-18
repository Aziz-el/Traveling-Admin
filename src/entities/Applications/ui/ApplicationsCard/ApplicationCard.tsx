import React, { useState } from 'react';
import { ApplicationType } from '../../model/types';

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
      className={`relative bg-gray-900 border-2 rounded-xl shadow-md overflow-hidden transition-all duration-300 cursor-pointer
        ${status === 'подтвержден' ? 'border-green-500' : status === 'отклонен' ? 'border-red-500' : 'border-gray-700 hover:border-gray-500'}`}
    >
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-lg font-bold text-gray-100">{application.sender}</h3>

        {status === 'ожидает' ? (
          <div className="flex gap-2">
            <button
              onClick={handleApprove}
              className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
            >
              Подтвердить
            </button>
            <button
              onClick={handleReject}
              className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              Отклонить
            </button>
          </div>
        ) : (
          <div
            className={`text-lg font-semibold ${
              status === 'подтвержден' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {status === 'подтвержден' ? 'Подтверждено' : 'Отклонено'}
          </div>
        )}
      </div>
    </div>
  );
}
