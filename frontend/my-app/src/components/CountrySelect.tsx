import { COUNTRIES } from "./const"

export default function CountrySelect({
  selectedCountry,
  onOptionSelected,
}: Props) {
  const handleOptionSelected = (value: string) => {
    onOptionSelected(value);
  };

  return (
    <div>
      <label>Select Country:</label>
      <select
        value={selectedCountry}
        onChange={(e) => handleOptionSelected(e.target.value)}
      >
        {COUNTRIES.map((country) => (
          <option value={country.value}>{country.label}</option>
        ))}
      </select>
    </div>
  );
}

interface Props {
  selectedCountry: string;
  onOptionSelected: (country: string) => void;
}
