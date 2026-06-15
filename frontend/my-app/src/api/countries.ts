import axios from "axios";

const getAllCountries = async () => {
  const result = await axios.get("http://localhost:3001/api/countries");
  return result.data;
};

export default {
  getAllCountries,
};
