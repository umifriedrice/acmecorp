import type { CountryType } from "@/types/address";
import type { CountryObjType } from "@/types/country";
import { useEffect, useState } from "react";
import countryRepo from "@/repository/country";
import LoadingIndicator from "@/components/LoadingIndicator";
import "./CountrySelect.css";
import "@/components/styles.css";

function CountrySelect({ selectedCountry, onOptionSelected }: Props) {
  const [countries, setCountries] = useState<CountryObjType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleOptionSelected = (value: CountryType) => {
    onOptionSelected(value);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      const countries = await countryRepo.getAllCountries();

      setCountries(countries);
      setLoading(false);
      onOptionSelected(countries[0].value as CountryType);
    };

    fetchCountries();
  }, []);

  return (
    <div className="country-select-wrapper">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <label className="country-select-label">Select Country</label>
          <select
            className="field-input"
            value={selectedCountry}
            onChange={(e) =>
              handleOptionSelected(e.target.value as CountryType)
            }
          >
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

interface Props {
  selectedCountry: CountryType;
  onOptionSelected: (country: CountryType) => void;
}

export default CountrySelect;
