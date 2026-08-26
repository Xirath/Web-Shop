interface FormFieldProps {
  name: string;
  label: string;
  type: "text" | "number";
  placeholder: string;
  defaultValue?: string | number;
  required?: boolean;
}

export default function FormField({
  name,
  label,
  type,
  placeholder,
  defaultValue,
  required,
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-gray-300 px-3 py-2"
        required={required}
      />
    </div>
  );
}
