import { type SubmitEvent } from "react";
import DynamicFormField from "./DynamicFormField";
import { COUNTRY_FORM_FIELDS } from "./formConfig";
import "./DynamicForm.css";

const DynamicAddressForm = ({
  country,
  onSubmit,
  onClose
}: DynamicAddressFromProps) => {
  const fields = COUNTRY_FORM_FIELDS[country] || [];

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {fields.map((field) => (
        <DynamicFormField
          key={field.key}
          formKey={field.key}
          formLabel={field.label}
          formType={field.type ?? ""}
          formRequired={field.required ?? false}
          defaultValue={field.defaultValue ?? ""}
        />
      ))}

      <button type="submit" className="submit-button">
        Save Address
      </button>
      <button className="submit-button submit-button--red" onClick={onClose}>
        Edit Using Autocomplete
      </button>
    </form>
  );
}

interface DynamicAddressFromProps {
  country: "US" | "AUS" | "ID";
  onSubmit: (e: SubmitEvent) => void;
  onClose: () => void;
}

export default DynamicAddressForm;