import { useState, type SubmitEvent } from "react";
import CountrySelect from "../CountrySelect";
import DynamicAddressForm from "../DynamicForm";
import PlacesAutocomplete from "../PlacesAutocomplete";
import { COUNTRIES } from "../../constants";
import { validateFormAddress } from "../../utils/address";
import "./AddressForm.css";
import type { CountryType } from "../../types/address";
import addressRepo from "../../repository/address";

const AddressForm = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryType>(
    COUNTRIES[0].value as CountryType
  );
  const [autocompletePlace, setAutocompletePlace] = useState({});
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleManualSubmit = async (e: SubmitEvent | MouseEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    const formData = new FormData(form);
    const errors = validateFormAddress(selectedCountry, formData);

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    const data = Object.fromEntries(formData);

    try {
      await addressRepo.saveAddress(selectedCountry, data as { [key: string]: string });
      alert("Address is succesfully saved.");
      setOpenForm(false);
      setErrors([]);
    } catch (error) {
      console.error("Error occurred from server, error:", error);
      alert(`Failed to save address, Error: ${error}`);
    }
  };

  const handleCountrySelected = (value: CountryType) => {
    setSelectedCountry(value);
    setOpenForm(false);
    setErrors([]);
  };

  const handleAddressSelect = (addressData) => {
    setAutocompletePlace(addressData);
  };

  const handlePlaceAutocompleteSave = async () => {
    if (!autocompletePlace) {
      setErrors(["Please fill in the address"]);
      return;
    }

    console.log("DEBUG AUTOCOMPLETE", autocompletePlace);
    try {
      await addressRepo.saveAddress(selectedCountry, autocompletePlace);

      alert("Address is successfully saved");
      setOpenForm(false);
      setErrors([]);
      setAutocompletePlace({});
    } catch (error) {
      console.error("Error occurred from server, error:", error);
      alert(`Failed to save address, Error: ${error}`);
    }
  };

  const handleEditManualButtonClick = () => {
    setOpenForm(true);
    setErrors([]);
  };

  const handleClose = () => {
    setOpenForm(false);
    setErrors([]);
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-head">
          <h1 className="form-title">Address Form</h1>
          <p className="form-subtitle">Please put the address in this form</p>
        </div>
        <hr className="form-rule" />
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
            <div className="form-actions">
              <button
                className="form-btn-secondary"
                onClick={handleEditManualButtonClick}
              >
                Edit manually
              </button>
              <button
                className="form-btn"
                onClick={handlePlaceAutocompleteSave}
              >
                Save Address
              </button>
            </div>
          </>
        ) : (
          <DynamicAddressForm
            key={selectedCountry}
            country={selectedCountry}
            onSubmit={handleManualSubmit}
            onClose={handleClose}
          />
        )}
        {errors && errors.length > 0 ? (
          <div className="form-errors">
            <p className="form-errors-title">
              Form is invalid, please check these suggestions below
            </p>
            <ul className="form-errors-list">
              {errors.map((err: string) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddressForm;
