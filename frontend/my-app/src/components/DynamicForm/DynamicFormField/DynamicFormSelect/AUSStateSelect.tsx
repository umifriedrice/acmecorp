import DynamicFormSelect from "./DynamicFormSelect";
import { AUS_STATES } from "@/constants";

const AUSStateSelect = ({ formKey, formRequired, defaultValue }: Props) => {
  return (
    <DynamicFormSelect
      formKey={formKey}
      formRequired={formRequired}
      defaultValue={defaultValue}
      options={AUS_STATES}
    />
  );
}

interface Props {
  formKey: string;
  formRequired: boolean;
  defaultValue: string;
}

export default AUSStateSelect;