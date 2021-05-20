import axios from "axios";

export const getCars = async (searchText, country) => {
  const response = await axios({
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    url: "http://localhost:55216/cars",
    params: { searchText: searchText, country: country },
  });
  return response.data;
};

export const getCountries = async () => {
  const response = await axios({
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    url: "http://localhost:55216/cars/countries",
  });
  return response.data;
};
