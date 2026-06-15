export type USAddressType = {
  country: "United States";
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
};

export type AUSAddressType = {
  country: "Australia";
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  state: string;
  postCode: string;
};

export type IDAddressType = {
  country: "Indonesia";
  province: string;
  city: string;
  district: string;
  village: string;
  postCode: string;
  streetAddress: string;
};

export type AddressServiceInsertType =
  | USAddressType
  | AUSAddressType
  | IDAddressType;

export type CountryType = "US" | "AUS" | "ID"