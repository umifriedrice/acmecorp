import { getAllAddresses } from "../db/address";
import { AddressServiceInsertType } from "../types/address";
import addressService from "../services/address"

const getAll = () => {
  return getAllAddresses();
};

const save = (param: AddressServiceInsertType) => {
  switch (param.country) {
    case "US":
      addressService.saveUSAddress(param);
      break;
    case "AUS":
      addressService.saveAUSAddress(param);
      break;
    case "ID":
      addressService.saveIDAddress(param);
      break;
    default:
      break;
  }
};

export default {
  getAll,
  save,
};