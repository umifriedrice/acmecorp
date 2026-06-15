import DynamicFormSelect from "./DynamicFormSelect";
import { ID_PROVINCES } from "../constants";

export default function IDProvinceSelect({ formKey, value, onChange }: Props) {
  return (
    <DynamicFormSelect
      formKey={formKey}
      value={value}
      options={ID_PROVINCES}
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
