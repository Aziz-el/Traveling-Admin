import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface CustomNumberInputProps {
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const CustomNumberInput: React.FC<CustomNumberInputProps> = ({ name, value, onChange, min, max, className }) => {
  const handleIncrement = () => {
    if (max !== undefined && value >= max) return;
    onChange({ target: { name, value: value + 1 } } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDecrement = () => {
    if (min !== undefined && value <= min) return;
    onChange({ target: { name, value: value - 1 } } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <input
        name={name}
        type="number"
        value={value}
        readOnly
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e1e2e] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      />
      <div className="absolute right-6 top-[25px] transform -translate-y-1/2 flex flex-col h-5 justify-between">
        <button type="button" onClick={handleIncrement} className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <ChevronUp className="w-3 h-3 text-gray-600 dark:text-gray-300" />
        </button>
        <button type="button" onClick={handleDecrement} className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <ChevronDown className="w-3 h-3 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default CustomNumberInput;
