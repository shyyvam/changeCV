'use client';
import React from 'react';
import { Palette, Type, TextCursorInput, PlusCircle, Trash2, Settings2 } from 'lucide-react';
import ColorPicker from './ColorPicker';
import FontSelector from './FontSelector';
import FontSizeSelector from './FontSizeSelector';
import CustomFieldManager from './CustomFieldManager';

const Toolbar = () => {
  const [activeTab, setActiveTab] = React.useState('text');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'text':
        return (
          <>
            <FontSelector />
            <FontSizeSelector />
          </>
        );
      case 'color':
        return (
          <>
            <ColorPicker label="Primary Color" styleKey="primaryColor" />
            <ColorPicker label="Secondary Color" styleKey="secondaryColor" />
            <ColorPicker label="Text Color" styleKey="textColor" />
            <ColorPicker label="Background Color" styleKey="backgroundColor" />
          </>
        );
      case 'fields':
        return <CustomFieldManager />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full md:w-96 bg-white shadow-lg p-6 space-y-6 print:hidden">
      <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">Customize Resume</h2>
      
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'text' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('text')}
          aria-label="Text Customization"
        >
          <Type size={18} /> Text
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'color' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('color')}
          aria-label="Color Customization"
        >
          <Palette size={18} /> Color
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'fields' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('fields')}
          aria-label="Custom Fields"
        >
          <Settings2 size={18} /> Fields
        </button>
      </div>

      <div className="space-y-4">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Toolbar; 