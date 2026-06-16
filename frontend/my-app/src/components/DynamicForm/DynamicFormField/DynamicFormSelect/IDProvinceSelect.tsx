import DynamicFormSelect from "./DynamicFormSelect";
import { ID_PROVINCES } from "@/constants";

const IDProvinceSelect = ({
  formKey,
  formRequired,
  defaultValue,
}: Props) => {
  return (
    <DynamicFormSelect
      formKey={formKey}
      formRequired={formRequired}
      defaultValue={defaultValue}
      options={ID_PROVINCES}
    />
  );
}

interface Props {
  formKey: string;
  formRequired: boolean;
  defaultValue: string;
}

export default IDProvinceSelect;