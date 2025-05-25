'use client';
import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { PlusCircle, Trash2, Edit3 } from 'lucide-react';

const CustomFieldManager = () => {
  const { customFields, addCustomField, updateCustomField, removeCustomField } = useResume();
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleAddField = (e) => {
    e.preventDefault();
    if (newFieldLabel.trim() && newFieldValue.trim()) {
      addCustomField({ label: newFieldLabel, value: newFieldValue });
      setNewFieldLabel('');
      setNewFieldValue('');
    }
  };

  const handleStartEdit = (field) => {
    setEditingFieldId(field.id);
    setEditLabel(field.label);
    setEditValue(field.value);
  };

  const handleSaveEdit = (id) => {
    if (editLabel.trim() && editValue.trim()) {
      updateCustomField(id, { label: editLabel, value: editValue });
      setEditingFieldId(null);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Custom Fields</h3>
      <form onSubmit={handleAddField} className="space-y-3 p-3 border rounded-md bg-gray-50">
        <div>
          <label htmlFor="new-field-label" className="block text-sm font-medium text-gray-700">New Field Label</label>
          <input
            type="text"
            id="new-field-label"
            value={newFieldLabel}
            onChange={(e) => setNewFieldLabel(e.target.value)}
            placeholder="e.g., LinkedIn Profile"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="new-field-value" className="block text-sm font-medium text-gray-700">New Field Value</label>
          <input
            type="text"
            id="new-field-value"
            value={newFieldValue}
            onChange={(e) => setNewFieldValue(e.target.value)}
            placeholder="e.g., https://linkedin.com/in/yourprofile"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle size={18} className="mr-2" /> Add Field
        </button>
      </form>

      {customFields.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-md font-medium text-gray-700">Existing Fields:</h4>
          {customFields.map((field) => (
            <div key={field.id} className="p-3 border rounded-md bg-white shadow-sm">
              {editingFieldId === field.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    className="block w-full px-3 py-1 border border-gray-300 rounded-md sm:text-sm"
                    placeholder="Label"
                  />
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="block w-full px-3 py-1 border border-gray-300 rounded-md sm:text-sm"
                    placeholder="Value"
                  />
                  <div className="flex space-x-2">
                    <button onClick={() => handleSaveEdit(field.id)} className="text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
                    <button onClick={() => setEditingFieldId(null)} className="text-xs px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{field.label}</p>
                    <p className="text-xs text-gray-600 break-all">{field.value}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleStartEdit(field)} className="text-blue-500 hover:text-blue-700" aria-label={`Edit ${field.label}`}>
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => removeCustomField(field.id)} className="text-red-500 hover:text-red-700" aria-label={`Remove ${field.label}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomFieldManager; 