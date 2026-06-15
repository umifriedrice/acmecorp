import { useState, useEffect } from "react";
import DynamicFormField from "./DynamicFormField";
import { COUNTRY_FORM_FIELDS } from "./const";

export default function DynamicAddressForm({
  country,
  values,
  onChange,
  onSubmit
}: DynamicAddressFromProps) {
  const fields = COUNTRY_FORM_FIELDS[country] || [];
//   const [values, setValues] = useState<{ string: string } | {}>({});
//   const [submitted, setSubmitted] = useState<{ string: string } | {}>({});

//   useEffect(() => {
//     setValues({});
//     setSubmitted(null);
//   }, [country]);

//   const handleChange = (key, value) =>
//     setValues((prev) => ({ ...prev, [key]: value }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted({ country, ...values });
//     setValues({});
//     addressAPI.postCountry({ country, ...values });
//   };

  return (
    <>
      <style>{CSS}</style>
      <form className="form" onSubmit={onSubmit}>
        {fields.map((field) => (
          <DynamicFormField
            key={field.key}
            formKey={field.key}
            formLabel={field.label}
            formType={field.type ?? ""}
            formRequired={field.required ?? false}
            value={values[field.key] ?? ""}
            onChange={onChange}
          />
        ))}

        <button type="submit" className="submit">
          Save Address
        </button>
      </form>
    </>
  );
}

const CSS = `
  * { box-sizing: border-box; }
  .page {
    min-height: 100%;
    padding: 32px 16px;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #1a1a2e;
  }
  .card {
    max-width: 460px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #e6e6ef;
    border-radius: 14px;
    padding: 28px;
    box-shadow: 0 1px 2px rgba(20,20,50,.04), 0 12px 32px rgba(20,20,50,.06);
  }
  .head h1 { margin: 0; font-size: 1.4rem; font-weight: 700; letter-spacing: -.02em; }
  .head p  { margin: 6px 0 0; font-size: .85rem; color: #6b6b80; line-height: 1.5; }
  .rule { border: none; border-top: 1px solid #eeeef4; margin: 22px 0; }
  .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .field-label { font-size: .8rem; font-weight: 600; color: #3a3a52; }
  .ctrl {
    width: 100%;
    padding: 10px 12px;
    font-size: .9rem;
    font-family: inherit;
    color: #1a1a2e;
    background: #fff;
    border: 1.5px solid #e0e0ec;
    border-radius: 9px;
    transition: border-color .15s, box-shadow .15s;
    appearance: none;
  }
  .ctrl:focus {
    outline: none;
    border-color: #5b5bd6;
    box-shadow: 0 0 0 3px rgba(91,91,214,.14);
  }
  .ctrl:disabled { background: #f5f5fa; color: #9a9ab0; cursor: wait; }
  select.ctrl {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b6b80' d='M6 8 0 0h12z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 32px;
  }
  .ctrl-error-box {
    display: flex; align-items: center; gap: 8px;
    color: #c0392b; font-size: .82rem; border-color: #f0c0bb; background: #fdf3f2;
  }
  .retry {
    border: none; background: #c0392b; color: #fff;
    padding: 4px 10px; border-radius: 6px; font-size: .78rem; cursor: pointer;
  }
  .submit {
    width: 100%; margin-top: 6px; padding: 12px;
    font-size: .92rem; font-weight: 600; font-family: inherit;
    color: #fff; background: #5b5bd6; border: none; border-radius: 9px;
    cursor: pointer; transition: background .15s;
  }
  .submit:hover { background: #4a4ac4; }
  .result {
    margin-top: 18px; padding: 14px; background: #1a1a2e; color: #c8f7c5;
    border-radius: 9px; font-size: .78rem; overflow-x: auto;
    font-family: 'SF Mono', Menlo, monospace;
  }
`;

interface DynamicAddressFromProps {
  country: "USA" | "AUS" | "ID";
  onChange: (key: string, value: string) => void;
  onSubmit: (e: SubmitEvent) => void;
  values: { [key: string]: string }
}
