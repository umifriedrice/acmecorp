import { useCallback, useState, type SubmitEvent } from "react";
import CountrySelect from "@/components/CountrySelect";
import DynamicAddressForm from "@/components/DynamicForm";
import PlacesAutocomplete, {
  type AddressData,
} from "@/components/PlacesAutocomplete";
import { validateFormAddress } from "@/utils/address";
import type { CountryType } from "@/types/address";
import addressRepo from "@/repository/address";
import FormErrorMessage from "@/components/FormErrorMessage";
import { isObjEmpty } from "@/utils/object";
import "./AddressForm.css";
import { COUNTRIES } from "@/constants";

const AddressForm = () => {
  // Because the countries data fetched from backend, we use temporary constant in the frontend while waiting the backend returns the data
  const [selectedCountry, setSelectedCountry] = useState<CountryType>(
    COUNTRIES[0].value as CountryType
  );
  const [autocompletePlace, setAutocompletePlace] = useState({});
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [manualSubmitLoading, setManualSubmitLoading] =
    useState<boolean>(false);
  const [autocompleteSubmitLoading, setAutocompleteSubmitLoading] =
    useState<boolean>(false);

  const handleManualSubmit = async (e: SubmitEvent | MouseEvent) => {
    setManualSubmitLoading(true);
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    const formData = new FormData(form);
    const errors = validateFormAddress(selectedCountry, formData);

    if (errors.length > 0) {
      setErrors(errors);
      setManualSubmitLoading(false);
      return;
    }

    const data = Object.fromEntries(formData);

    try {
      await addressRepo.saveAddress(
        selectedCountry,
        data as { [key: string]: string }
      );
      alert("Address is succesfully saved.");
      setOpenForm(false);
      setErrors([]);
    } catch (error) {
      console.error("Error occurred from server, error:", error);
      alert(`Failed to save address, Error: ${error}`);
    } finally {
      setManualSubmitLoading(false);
    }
  };

  const handleCountrySelected = useCallback((value: CountryType) => {
    setSelectedCountry(value);
    setOpenForm(false);
    setErrors([]);
  }, []);

  const handleAddressSelect = useCallback((addressData: AddressData) => {
    setAutocompletePlace(addressData);
  }, []);

  const handlePlaceAutocompleteSave = async () => {
    setAutocompleteSubmitLoading(true);
    if (isObjEmpty(autocompletePlace)) {
      setErrors(["Please fill in the address"]);
      setAutocompleteSubmitLoading(false);
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
    } finally {
      setAutocompleteSubmitLoading(false);
    }
  };

  const handleEditManualButtonClick = () => {
    setOpenForm(true);
    setErrors([]);
  };

  const handleClose = useCallback(() => {
    setOpenForm(false);
    setErrors([]);
  }, []);

  console.log("DEBUG SELECTED COUNTRY", selectedCountry);

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
                disabled={autocompleteSubmitLoading}
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
            submitDisabled={manualSubmitLoading}
            onSubmit={handleManualSubmit}
            onClose={handleClose}
          />
        )}
        {errors && errors.length > 0 ? (
          <FormErrorMessage errors={errors} />
        ) : null}
      </div>
    </div>
  );
};

export default AddressForm;
