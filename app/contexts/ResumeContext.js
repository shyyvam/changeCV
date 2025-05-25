'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { DUMMY_RESUME_DATA, INITIAL_STYLES } from '../lib/defaultData';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(DUMMY_RESUME_DATA);
  const [styles, setStyles] = useState(INITIAL_STYLES);
  const [customFields, setCustomFields] = useState([]);

  const updateStyle = useCallback((styleKey, value) => {
    setStyles(prevStyles => ({ ...prevStyles, [styleKey]: value }));
  }, []);

  const addCustomField = useCallback((field) => {
    setCustomFields(prevFields => [...prevFields, { ...field, id: Date.now().toString() }]);
  }, []);

  const updateCustomField = useCallback((id, updatedField) => {
    setCustomFields(prevFields =>
      prevFields.map(field => (field.id === id ? { ...field, ...updatedField } : field))
    );
  }, []);

  const removeCustomField = useCallback((id) => {
    setCustomFields(prevFields => prevFields.filter(field => field.id !== id));
  }, []);

  const updateResumeSection = useCallback((section, data) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: typeof data === 'function' ? data(prevData[section]) : data,
    }));
  }, []);

  const value = {
    resumeData,
    setResumeData,
    updateResumeSection,
    styles,
    updateStyle,
    customFields,
    addCustomField,
    updateCustomField,
    removeCustomField,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}; 