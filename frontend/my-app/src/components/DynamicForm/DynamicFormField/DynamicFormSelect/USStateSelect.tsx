import DynamicFormSelect from "./DynamicFormSelect";
import { US_STATES } from "../../../../constants";

const USStateSelect = ({ formKey, formRequired, defaultValue }: Props) => {
  return (
    <DynamicFormSelect
      formKey={formKey}
      formRequired={formRequired}
      defaultValue={defaultValue}
      options={US_STATES}
    />
  );
}

interface Props {
  formKey: string;
  formRequired: boolean;
  defaultValue: string;
}

export default USStateSelect;
