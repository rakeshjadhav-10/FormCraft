import type { Form } from '../types';

interface FormListProps {
  forms: Form[];
  onSelect: (form: Form) => void;
  onDelete: (id: string) => void;
}

const FormList = ({ forms, onSelect, onDelete }: FormListProps) => {
  return (
    <div className="list-panel">
      <h2>Your Forms</h2>
      <div className="forms-container">
        {forms.length === 0 ? (
          <div className="empty-list">No forms created yet</div>
        ) : (
          forms.map(form => (
            <div 
              key={form.id} 
              className="form-card"
              onClick={() => onSelect(form)}
            >
              <div className="card-content">
                <h3>{form.title}</h3>
                <div className="meta-info">
                  <span>{form.fields.length} fields</span>
                  <span>{new Date(form.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
              <button 
                className="delete-form"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(form.id);
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FormList;