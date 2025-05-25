'use client';
import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

const ColorPicker = ({ label, styleKey }) => {
  const { styles, updateStyle } = useResume();
  const currentColor = styles[styleKey];

  const handleChange = (e) => {
    updateStyle(styleKey, e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor={`${styleKey}-picker`} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          id={`${styleKey}-picker`}
          value={currentColor}
          onChange={handleChange}
          className="w-10 h-10 p-0 border-none rounded-md cursor-pointer"
          aria-label={`Select ${label}`}
        />
        <input
          type="text"
          value={currentColor}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          aria-label={`${label} hex code`}
        />
      </div>
    </div>
  );
};

export default ColorPicker; 