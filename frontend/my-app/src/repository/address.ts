import type { AddressServiceInsertType, CountryType } from "../types/address";
import addressAPI from "../api/address";

const generateAddressParam = (
  country: CountryType,
  data: { [key: string]: string }
): AddressServiceInsertType => {
  switch (country) {
    case "US":
      return {
        country: "US",
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 ?? "",
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      };
    case "AUS":
      return {
        country: "AUS",
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 ?? "",
        suburb: data.suburb,
        state: data.state,
        postCode: data.postCode,
      };
    case "ID":
      return {
        country: "ID",
        province: data.province,
        city: data.city,
        district: data.district,
        village: data.village ?? "",
        postCode: data.postCode,
        streetAddress: data.streetAddress,
      };
  }
};

const saveAddress = async (
  country: CountryType,
  data: { [key: string]: string }
) => {
  const params = generateAddressParam(country, data);

  await addressAPI.postCountry(params);
};

export default {
  saveAddress,
};
