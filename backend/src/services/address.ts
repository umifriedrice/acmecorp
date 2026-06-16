import { saveAddress } from "../db/address";
import { AUSAddressType, IDAddressType, USAddressType } from "../types/address";
import { AUS_STATES, ID_PROVINCES, US_STATES } from "../constants";
import { ValidationError } from "../errors";
import { validateFiveDigitNumeric, validateFourDigitNumeric } from "../utils/validation";

const saveUSAddress = (param: USAddressType) => {

  // // US ADDRESS VALIDATION
  // if (!param.addressLine1?.trim()) throw new ValidationError("address line 1 is required");
  // if (!param.city?.trim()) throw new ValidationError("city is required");
  // if (!US_STATES.includes(param.state)) throw new ValidationError("state must be a valid US state code");
  // if (!validateFiveDigitNumeric(param.zipCode)) throw new ValidationError("zip code must be a 5-digit code");

  saveAddress({
    country: param.country,
    address_line1: param.addressLine1,
    address_line2: param.addressLine2 ?? "",
    city: param.city,
    state: param.state,
    zip_code: param.zipCode,
    post_code: "",
    suburb: "",
    district: "",
    village: "",
    province: "",
    street: "",
  });
};

const saveAUSAddress = (param: AUSAddressType) => {

  // // AUS ADDRESS VALIDATION
  // if (!param.addressLine1?.trim()) throw new ValidationError("address line 1 is required");
  // if (!param.suburb?.trim()) throw new ValidationError("suburb is required");
  // if (!AUS_STATES.includes(param.state)) throw new ValidationError("state must be a valid Australian state or territory code");
  // if (!validateFourDigitNumeric(param.postCode)) throw new ValidationError("post code must be a 4-digit code");

  saveAddress({
    country: param.country,
    address_line1: param.addressLine1,
    address_line2: param.addressLine2 ?? "",
    state: param.state,
    suburb: param.suburb,
    post_code: param.postCode,
    city: "",
    zip_code: "",
    district: "",
    village: "",
    province: "",
    street: "",
  });
};

const saveIDAddress = (param: IDAddressType) => {

  // // ID ADDRESS VALIDATION
  // if (!ID_PROVINCES.includes(param.province)) throw new ValidationError("province must be a valid Indonesian province");
  // if (!param.city?.trim()) throw new ValidationError("city is required");
  // if (!param.district?.trim()) throw new ValidationError("district is required");
  // if (!param.streetAddress?.trim()) throw new ValidationError("street address is required");
  // if (!validateFiveDigitNumeric) throw new ValidationError("post code must be a 5-digit code");

  saveAddress({
    country: param.country,
    province: param.province,
    city: param.city,
    district: param.district,
    post_code: param.postCode,
    village: param.village ?? "",
    street: param.streetAddress,
    suburb: "",
    address_line1: "",
    address_line2: "",
    state: "",
    zip_code: "",
  });
};

export default {
  saveAUSAddress,
  saveUSAddress,
  saveIDAddress,
};
