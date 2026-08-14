interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
   required?: boolean;
}

export default function FormField({
  label,
  type,
  placeholder,
  required,
}: FormFieldProps) {
  return (
    <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>

      <input type={type} 
      placeholder={placeholder}    className="w-full rounded-md border border-gray-300 px-3 py-2"
    required={required}/>
    </div>
  );
}
