import { saveAddress } from "../db/address";
import { AUSAddressType, IDAddressType, USAddressType } from "../types/address";

const saveUSAddress = (param: USAddressType) => {
  saveAddress({
    country: param.country,
    address_line1: param.addressLine1,
    address_line2: param.addressLine2,
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
  saveAddress({
    country: param.country,
    address_line1: param.addressLine1,
    address_line2: param.addressLine2,
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
  saveAddress({
    country: param.country,
    province: param.province,
    city: param.city,
    district: param.district,
    post_code: param.postCode,
    village: param.village,
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
