'use client';
import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { AVAILABLE_FONTS } from '../../lib/defaultData';

const FontSelector = () => {
  const { styles, updateStyle } = useResume();

  const handleChange = (e) => {
    const selectedFont = AVAILABLE_FONTS.find(font => font.value === e.target.value);
    if (selectedFont) {
      updateStyle('fontFamily', selectedFont.value);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="font-selector" className="block text-sm font-medium text-gray-700 mb-1">
        Font Family
      </label>
      <select
        id="font-selector"
        value={styles.fontFamily}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        aria-label="Select font family"
      >
        {AVAILABLE_FONTS.map(font => (
          <option key={font.name} value={font.value} style={{ fontFamily: font.value }}>
            {font.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector; 