import AUSStateSelect from "./AUSStateSelect";
import USStateSelect from "./USStateSelect";
import FormTextInput from "./FormTextInput";
import IDProvinceSelect from "./IDProvinceSelect";

const FORM_TYPE = {
    text: FormTextInput,
    aus_select_state: AUSStateSelect,
    us_select_state: USStateSelect,
    id_select_province: IDProvinceSelect
}

export default function FormField({ formKey, formLabel, formType, value, onChange }: Props) {
  const Control = FORM_TYPE[formType] || FormTextInput;
  return (
    <div className="field">
      <label className="field-label" htmlFor={formKey}>{formLabel}</label>
      <Control formKey={formKey} value={value} onChange={onChange} />
    </div>
  );
}

interface Props {
    formKey: string;
    formType: string;
    formLabel: string;
    formRequired: boolean;
    value: string;
    onChange: (key: string, value: string) => void;
}