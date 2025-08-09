import { useState } from 'react';
import type { Form, FormField, FieldType } from '../types';
import { createNewField } from '../utils';

interface FormBuilderProps {
  form: Form | null;
  onSave: (form: Form) => void;
}

const FormBuilder = ({ form, onSave }: FormBuilderProps) => {
  const [title, setTitle] = useState(form?.title || '');
  const [fields, setFields] = useState<FormField[]>(form?.fields || []);
  const [editingField, setEditingField] = useState<FormField | null>(null);

  const addField = (type: FieldType) => {
    const newField = createNewField(type);
    setFields([...fields, newField]);
    setEditingField(newField);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(f => 
      f.id === id ? { ...f, ...updates } : f
    ));
    if (editingField?.id === id) {
      setEditingField({ ...editingField, ...updates });
    }
  };

  return (
    <div className="builder-panel">
      <h2>Form Builder</h2>
      <div className="form-title">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Form Title"
        />
      </div>

      <div className="field-types">
        {(['text', 'email', 'number', 'select', 'checkbox'] as FieldType[]).map(type => (
          <button 
            key={type} 
            className="field-type-btn"
            onClick={() => addField(type)}
          >
            Add {type}
          </button>
        ))}
      </div>

      <div className="fields-list">
        {fields.map(field => (
          <div 
            key={field.id} 
            className={`field-item ${editingField?.id === field.id ? 'active' : ''}`}
            onClick={() => setEditingField(field)}
          >
            <div className="field-header">
              <span>{field.label}</span>
              <button 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setFields(fields.filter(f => f.id !== field.id));
                }}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingField && (
        <div className="field-editor">
          <h3>Field Settings</h3>
          <div className="form-group">
            <label>Label:</label>
            <input
              value={editingField.label}
              onChange={(e) => updateField(editingField.id, { label: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={editingField.required}
                onChange={(e) => updateField(editingField.id, { required: e.target.checked })}
              />
              Required
            </label>
          </div>

          {editingField.type === 'select' && (
            <div className="options-editor">
              <h4>Options</h4>
              {editingField.options?.map((opt, i) => (
                <div key={i} className="option-item">
                  <input
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...editingField.options!];
                      newOptions[i] = e.target.value;
                      updateField(editingField.id, { options: newOptions });
                    }}
                  />
                  <button
                    className="remove-option"
                    onClick={() => {
                      updateField(editingField.id, { 
                        options: editingField.options?.filter((_, idx) => idx !== i) 
                      });
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button 
                className="add-option"
                onClick={() => {
                  updateField(editingField.id, { 
                    options: [...editingField.options || [], `Option ${editingField.options?.length || 0 + 1}`]
                  });
                }}
              >
                + Add Option
              </button>
            </div>
          )}
        </div>
      )}

      <button 
        className="save-form"
        onClick={() => onSave({
          id: form?.id || `form-${Date.now()}`,
          title,
          fields,
          lastUpdated: Date.now()
        })}
      >
        {form ? 'Update Form' : 'Create Form'}
      </button>
    </div>
  );
};

export default FormBuilder;