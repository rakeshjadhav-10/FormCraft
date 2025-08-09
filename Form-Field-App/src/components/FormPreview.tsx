import type { Form, FormField } from '../types';

interface FormPreviewProps {
  form: Form | null;
}

const FormPreview = ({ form }: FormPreviewProps) => {
  if (!form) {
    return <div className="preview-empty">Select or create a form to preview</div>;
  }

  return (
    <div className="preview-panel">
      <h2>Form Preview</h2>
      <div className="preview-container">
        <h3>{form.title}</h3>
        <form>
          {form.fields.map(field => (
            <div key={field.id} className="preview-field">
              <label>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>
              {renderFieldInput(field)}
            </div>
          ))}
          <button type="submit" className="submit-btn">Submit Form</button>
        </form>
      </div>
    </div>
  );
};

function renderFieldInput(field: FormField) {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
    case 'date':
      return (
        <input 
          type={field.type} 
          placeholder={field.placeholder} 
          required={field.required}
        />
      );
    case 'textarea':
      return <textarea required={field.required} />;
    case 'select':
      return (
        <select required={field.required}>
          {field.options?.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    case 'checkbox':
      return <input type="checkbox" />;
    case 'radio':
      return (
        <div className="radio-group">
          {field.options?.map(opt => (
            <label key={opt}>
              <input 
                type="radio" 
                name={field.id} 
                value={opt} 
                required={field.required} 
              />
              {opt}
            </label>
          ))}
        </div>
      );
    default:
      return <input type="text" />;
  }
}

export default FormPreview;