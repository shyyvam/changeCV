'use client';
import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

const FontSizeSelector = () => {
  const { styles, updateStyle } = useResume();

  const handleChange = (e) => {
    updateStyle('baseFontSize', parseInt(e.target.value, 10));
  };

  return (
    <div className="mb-4">
      <label htmlFor="font-size-selector" className="block text-sm font-medium text-gray-700 mb-1">
        Base Font Size: {styles.baseFontSize}px
      </label>
      <input
        type="range"
        id="font-size-selector"
        min="10"
        max="24"
        value={styles.baseFontSize}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        aria-label="Select base font size"
      />
    </div>
  );
};

export default FontSizeSelector; 