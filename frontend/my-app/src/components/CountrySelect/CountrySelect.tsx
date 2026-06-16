import { COUNTRIES } from "../../constants";
import "./CountrySelect.css";
import "../styles.css";
import type { CountryType } from "../../types/address";

function CountrySelect({
  selectedCountry,
  onOptionSelected,
}: Props) {
  const handleOptionSelected = (value: CountryType) => {
    onOptionSelected(value);
  };

  return (
    <div className="country-select-wrapper">
      <label className="country-select-label">Select Country</label>
      <select
        className="field-input"
        value={selectedCountry}
        onChange={(e) => handleOptionSelected(e.target.value as CountryType)}
      >
        {COUNTRIES.map((country) => (
          <option key={country.value} value={country.value}>{country.label}</option>
        ))}
      </select>
    </div>
  );
}

interface Props {
  selectedCountry: CountryType;
  onOptionSelected: (country: CountryType) => void;
}

export default CountrySelect;