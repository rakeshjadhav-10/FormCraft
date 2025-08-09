import type { Form, FormField, FieldType } from './types';

export const createNewField = (type: FieldType): FormField => {
  const baseField = {
    id: `field-${Date.now()}`,
    type,
    label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
    required: false
  };

  switch (type) {
    case 'select':
    case 'radio':
      return { ...baseField, options: ['Option 1'] };
    case 'number':
      return { ...baseField, validation: { min: 0, max: 100 } };
    default:
      return baseField;
  }
};

export const saveFormsToLocal = (forms: Form[]) => {
  localStorage.setItem('forms', JSON.stringify(forms));
};

export const loadFormsFromLocal = (): Form[] => {
  const saved = localStorage.getItem('forms');
  return saved ? JSON.parse(saved) : [];
};