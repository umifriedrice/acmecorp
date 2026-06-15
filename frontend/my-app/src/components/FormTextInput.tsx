export default function TextInput({ formKey, value, required, onChange }: Props) {
  return (
    <input
      id={formKey}
      type="text"
      className="ctrl"
      value={value}
      required={required}
      onChange={(e) => onChange(formKey, e.target.value)}
    />
  );
}

interface Props {
  formKey: string;
  value: string;
  required: boolean;
  onChange: (key: string, value: string) => {};
}
