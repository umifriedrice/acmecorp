import DynamicFormSelect from "./DynamicFormSelect";

export const AUS_STATES: string[] = [
  "NSW",
  "VIC",
  "QLD",
  "WA",
  "SA",
  "TAS",
  "ACT",
  "NT",
];

export default function USStateSelect({ formKey, value, onChange }: Props) {
  return (
    <DynamicFormSelect
      formKey={formKey}
      value={value}
      options={AUS_STATES}
      onChange={onChange}
    />
  );
}

interface Props {
  formKey: string;
  value: string;
  options: string[];
  onChange: (key: string, value: string) => {};
}
