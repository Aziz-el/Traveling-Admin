import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface CustomDateTimePickerProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const CustomCalendar: React.FC<CustomDateTimePickerProps> = ({ name, value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (dateTime: string) => {
    onChange({ target: { name, value: dateTime } } as unknown as React.ChangeEvent<HTMLInputElement>);
    setIsOpen(false);
  };

  return (
    <div ref={pickerRef} className={`relative w-full ${className}`}>
      <div className="flex items-center w-full">
        <input
          name={name}
          type="text"
          value={value}
          readOnly
          className="w-full px-4 py-2.5 rounded-l-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e1e2e] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="h-[45.6px] px-3 py-3 border-t border-b border-r border-gray-300 dark:border-gray-700 rounded-r-lg bg-white dark:bg-[#1e1e2e] hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
        >
          <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full p-4 bg-white dark:bg-[#1e1e2e] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
          <input
            type="datetime-local"
            value={value}
            onChange={e => handleChange(e.target.value)}
            className="w-full px-3 py-2 border text-gray-900  rounded-md bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
