import countriesAPI from "@/api/countries";
import type { CountryObjType } from "@/types/country";

const getAllCountries = async (): Promise<CountryObjType[]> => {
  const result = await countriesAPI.getAllCountries();

  return result.data.countries.map((country: CountryObjType) => ({
    label: country.label,
    value: country.value,
  }));
};

export default {
  getAllCountries,
};
