interface FormFieldProps {
  label: string;
  type: "text" | "number";
  name: string;
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
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2"
        required={required}
      />
    </div>
  );
}
