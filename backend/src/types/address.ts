export type CountryType = 'US' | "AUS" | "ID";

export type DbAddressParamType = {
  id: number;
  country: CountryType;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  post_code?: string;
  suburb?: string;
  district?: string;
  village?: string;
  province?: string;
  street?: string;
};

export type DbAddressInsertParamType = Omit<DbAddressParamType, "id">;

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
