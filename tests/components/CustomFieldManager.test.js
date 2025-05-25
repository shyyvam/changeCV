import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomFieldManager from '@/app/components/Toolbar/CustomFieldManager';
import { ResumeProvider, useResume } from '@/app/contexts/ResumeContext';

// Mock lucide-react icons used in CustomFieldManager
jest.mock('lucide-react', () => ({
  PlusCircle: () => <div data-testid="plus-icon">Plus</div>,
  Trash2: () => <div data-testid="trash-icon">Trash</div>,
  Edit3: () => <div data-testid="edit-icon">Edit</div>,
}));

// Mock useResume hook
const mockAddCustomField = jest.fn();
const mockUpdateCustomField = jest.fn();
const mockRemoveCustomField = jest.fn();

jest.mock('@/app/contexts/ResumeContext', () => ({
  ...jest.requireActual('@/app/contexts/ResumeContext'),
  useResume: () => ({
    customFields: [],
    addCustomField: mockAddCustomField,
    updateCustomField: mockUpdateCustomField,
    removeCustomField: mockRemoveCustomField,
  }),
}));

describe('CustomFieldManager Component', () => {
  beforeEach(() => {
    mockAddCustomField.mockClear();
    mockUpdateCustomField.mockClear();
    mockRemoveCustomField.mockClear();
    
    jest.spyOn(require('@/app/contexts/ResumeContext'), 'useResume').mockImplementation(() => ({
      customFields: [],
      addCustomField: mockAddCustomField,
      updateCustomField: mockUpdateCustomField,
      removeCustomField: mockRemoveCustomField,
    }));
  });

  const renderCustomFieldManager = (initialFields = []) => {
    jest.spyOn(require('@/app/contexts/ResumeContext'), 'useResume').mockImplementation(() => ({
      customFields: initialFields,
      addCustomField: mockAddCustomField,
      updateCustomField: mockUpdateCustomField,
      removeCustomField: mockRemoveCustomField,
    }));
    return render(<CustomFieldManager />);
  };

  test('renders input fields for new custom field and an add button', () => {
    renderCustomFieldManager();
    expect(screen.getByLabelText('New Field Label')).toBeInTheDocument();
    expect(screen.getByLabelText('New Field Value')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add field/i })).toBeInTheDocument();
  });

  test('allows adding a new custom field', () => {
    renderCustomFieldManager();
    const labelInput = screen.getByLabelText('New Field Label');
    const valueInput = screen.getByLabelText('New Field Value');
    const addButton = screen.getByRole('button', { name: /add field/i });

    fireEvent.change(labelInput, { target: { value: 'LinkedIn' } });
    fireEvent.change(valueInput, { target: { value: 'linkedin.com/in/user' } });
    fireEvent.click(addButton);

    expect(mockAddCustomField).toHaveBeenCalledWith({
      label: 'LinkedIn',
      value: 'linkedin.com/in/user',
    });
    expect(labelInput.value).toBe('');
    expect(valueInput.value).toBe('');
  });

  test('does not add field if label or value is empty', () => {
    renderCustomFieldManager();
    const addButton = screen.getByRole('button', { name: /add field/i });

    // Try with empty label
    fireEvent.change(screen.getByLabelText('New Field Value'), { target: { value: 'some value' } });
    fireEvent.click(addButton);
    expect(mockAddCustomField).not.toHaveBeenCalled();

    // Try with empty value
    fireEvent.change(screen.getByLabelText('New Field Label'), { target: { value: 'some label' } });
    fireEvent.change(screen.getByLabelText('New Field Value'), { target: { value: '' } });
    fireEvent.click(addButton);
    expect(mockAddCustomField).not.toHaveBeenCalled();
  });

  test('displays existing custom fields and allows editing and removal', async () => {
    const initialFieldsData = [
      { id: '1', label: 'GitHub', value: 'github.com/user1' },
      { id: '2', label: 'Portfolio', value: 'user.com/portfolio' },
    ];
    jest.spyOn(require('@/app/contexts/ResumeContext'), 'useResume').mockImplementation(() => ({
      customFields: initialFieldsData,
      addCustomField: mockAddCustomField,
      updateCustomField: mockUpdateCustomField,
      removeCustomField: mockRemoveCustomField,
    }));

    render(<CustomFieldManager />);

    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('github.com/user1')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('user.com/portfolio')).toBeInTheDocument();

    // Test remove
    const removeButtons = screen.getAllByLabelText(/Remove/);
    fireEvent.click(removeButtons[0]);
    expect(mockRemoveCustomField).toHaveBeenCalledWith('1');

    // Test edit
    const editButtons = screen.getAllByLabelText(/Edit/);
    fireEvent.click(editButtons[1]);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('Portfolio')).toBeInTheDocument();
      expect(screen.getByDisplayValue('user.com/portfolio')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue('Portfolio'), { target: { value: 'My Portfolio' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    
    expect(mockUpdateCustomField).toHaveBeenCalledWith('2', { label: 'My Portfolio', value: 'user.com/portfolio' });
  });
}); 