import axios from "axios";
import type { AddressServiceInsertType } from "../types/address";

const postCountry = async (param: AddressServiceInsertType) => {
  const result = await axios.post("http://localhost:3001/api/addresses", param);
  console.log('DEBUG POST', result, param);
  return result;
};

export default {
  postCountry,
};
