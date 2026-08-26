interface FormFieldProps {
  label: string;
  name:string;
  type: string;
  placeholder: string;
   required?: boolean;
}

export default function FormField({
  label,
  name,
  type,
  placeholder,
  required,
}: FormFieldProps) {

  return (
    <div className="mb-4">
        <label
         htmlFor={name}
         className="mb-1 block text-sm font-medium text-gray-700">{label}</label>

      <input
        id={name} 
      type={type} 
      name={name}
      placeholder={placeholder}    className="w-full rounded-md border border-gray-300 px-3 py-2"
    required={required}/>
    </div>
  );
}
