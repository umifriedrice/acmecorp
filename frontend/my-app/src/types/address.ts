export type USAddressType = {
  country: "US";
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
};

export type AUSAddressType = {
  country: "AUS";
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  state: string;
  postCode: string;
};

export type IDAddressType = {
  country: "ID";
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