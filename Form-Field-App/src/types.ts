export type FieldType = 
  | 'text' | 'email' | 'password' 
  | 'number' | 'date' | 'textarea'
  | 'select' | 'checkbox' | 'radio';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  defaultValue?: string | number | boolean;
  options?: string[]; // For select/radio
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    pattern?: string;
  };
}

export interface Form {
  id: string;
  title: string;
  fields: FormField[];
  lastUpdated: number;
}