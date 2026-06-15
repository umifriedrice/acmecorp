export default function DynamicFormSelect({ formKey, value, options, onChange }: Props) {
 
  return (
    <select
      id={formKey}
      className="ctrl"
      value={value}
      defaultValue={options[0]}
      req
      onChange={(e) => onChange(formKey, e.target.value)}
    >
      {options.map((opt, index) => (
        <option key={`${opt}-${index}`} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

interface Props {
  formKey: string;
  value: string;
  options: string[];
  required: boolean;
  onChange: (key: string, value: string) => void;
}
