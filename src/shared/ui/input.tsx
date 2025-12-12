import React from 'react';


interface CustomInputProps {
name: string;
value: string | number;
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
type?: string;
min?: number;
placeholder?: string;
className?: string;
}


export const CustomInput: React.FC<CustomInputProps> = ({ name, value, onChange, type = 'text', min, placeholder = '', className }) => {
return (
<input
name={name}
type={type}
min={min}
value={value}
onChange={onChange}
placeholder={placeholder}
className={`w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e1e2e] text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 ${className}`}
/>
);
};


export default CustomInput;