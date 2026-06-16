import { COUNTRY_FORM_FIELDS } from "../components/DynamicForm/formConfig";
import type { CountryType } from "../types/address";

const validateFourDigitCode = (value: string): boolean => /^\d{4}$/.test(value);

const validateFiveDigitCode = (value: string): boolean => /^\d{5}$/.test(value);

export const validateFormAddress = (country: CountryType, formData: FormData) => {
  const errors: string[] = [];
  const formFields = COUNTRY_FORM_FIELDS[country];

  for (const field of formFields) {
    const value = (formData.get(field.key) as string) ?? "";
    const label = field.label;
    if (field.required && !value.trim()) {
      errors.push(`Please fill in ${label}'s field`);
    }

    if (field.validation === "4_digit_code" && !validateFourDigitCode(value)) {
      errors.push(`${label} must be 4 digit code`);
    }

    if (field.validation === "5_digit_code" && !validateFiveDigitCode(value)) {
      errors.push(`${label} must be 5 digit code`);
    }
  }
  return errors;
};
