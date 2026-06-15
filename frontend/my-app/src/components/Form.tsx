import { useEffect, useState, type SubmitEvent } from "react";
import CountrySelect from "./CountrySelect";
import DynamicAddressForm from "./DynamicForm";
import PlacesAutocomplete from "./PlacesAutocomplete";
import addressAPI from "../api/address";
import { COUNTRIES, FORM_DEFAULT_VALUE } from "./const";

export default function Form() {
  const [selectedCountry, setSelectedCountry] = useState<string>(
    COUNTRIES[0].value
  );
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [values, setValues] = useState<{ [key: string]: string }>(FORM_DEFAULT_VALUE[selectedCountry]);

  useEffect(() => {
    setValues(FORM_DEFAULT_VALUE[selectedCountry]);
  }, [openForm, selectedCountry]);

  const handleChange = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: SubmitEvent | MouseEvent) => {
    e.preventDefault();
    const param = { country: selectedCountry, ...values };
    setValues({});
    console.log('SUBMIT', param);
    // addressAPI.postCountry({ country: selectedCountry, ...values });
  };

  const handleCountrySelected = (value: string) => {
    setSelectedCountry(value);
    setOpenForm(false);
  };

  const handleAddressSelect = (addressData) => {
    setValues(addressData);

  };

  return (
    <div>
      <div>Please put the address in this form</div>
      <CountrySelect
        selectedCountry={selectedCountry}
        onOptionSelected={handleCountrySelected}
      />
      {!openForm ? (
        <>
          <PlacesAutocomplete
            countryCode={selectedCountry}
            onAddressSelect={handleAddressSelect}
          />

          <button onClick={() => setOpenForm(true)}>Edit manually</button>
          <button onClick={handleSubmit}>Save Address</button>
        </>
      ) : (
        <DynamicAddressForm
          country={selectedCountry}
          values={values}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
