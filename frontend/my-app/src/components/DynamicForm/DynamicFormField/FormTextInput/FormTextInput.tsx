// import "./FormTextInput.css";
import "@/components/styles.css";

const TextInput = ({ formKey, defaultValue, formRequired }: Props) => {
  return (
    <input
      id={formKey}
      name={formKey}
      type="text"
      className="field-input"
      defaultValue={defaultValue ?? ""}
      required={formRequired}
    />
  );
}

interface Props {
  formKey: string;
  defaultValue?: string;
  formRequired: boolean;
}

export default TextInput;