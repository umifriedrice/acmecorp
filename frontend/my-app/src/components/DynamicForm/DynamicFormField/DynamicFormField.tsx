import FormTextInput from "./FormTextInput";
import {
  AUSStateSelect,
  USStateSelect,
  IDProvinceSelect,
} from "./DynamicFormSelect";
import "./DynamicFormField.css";

const FORM_TYPE = {
  text: FormTextInput,
  aus_select_state: AUSStateSelect,
  us_select_state: USStateSelect,
  id_select_province: IDProvinceSelect,
};

const DynamicFormField = ({
  formKey,
  formLabel,
  formType,
  formRequired,
  defaultValue,
}: Props) => {
  const Control = FORM_TYPE[formType] || FormTextInput;
  return (
    <div className="field">
      <label className="field-label" htmlFor={formKey}>
        {formLabel}
      </label>
      <Control
        formKey={formKey}
        formRequired={formRequired}
        defaultValue={defaultValue}
      />
    </div>
  );
};

interface Props {
  formKey: string;
  formType: string;
  formLabel: string;
  formRequired: boolean;
  defaultValue: string;
}

export default DynamicFormField;
