import "./DynamicFormSelect.css";
import "../../../styles.css";

const DynamicFormSelect = ({
  formKey,
  formRequired,
  defaultValue,
  options,
}: Props) => {
  return (
    <select
      id={formKey}
      name={formKey}
      className="field-input"
      defaultValue={defaultValue}
      required={formRequired}
    >
      {options.map((opt, index) => (
        <option key={`${opt}-${index}`} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

interface Props {
  formKey: string;
  formRequired: boolean;
  defaultValue: string;
  options: string[];
}

export default DynamicFormSelect;
