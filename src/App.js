import React, { useEffect, useState } from "react";
import "./App.css";
import data from "./honda_wmi.json";
import axios from "axios";

function App() {
  const keys = ["name", "wmi", "country", "createdOn", "vehicleType"];

  const [cars, setCars] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [country, setCountry] = useState("View All");
  const [loadingText, setLoadingText] = useState("");

  const getCars = async () => {
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

  const getCountries = async () => {
    const response = await axios({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      url: "http://localhost:55216/cars/countries",
    });
    return response.data;
  };

  useEffect(() => {
    getCars().then((autos) => {
      setCars(autos);
    });
  }, []);

  useEffect(() => {
    getCountries().then((list) => {
      setCountries(list);
    });
  }, []);

  const getData = () => {
    getCars().then((autos) => {
      setCars(autos);
    });
    console.log(searchText + " " + country);
  };

  const getRowsJsx = () => {
    return cars.map((d) => {
      const wmi = d.wmi;

      return (
        <tr key={wmi}>
          {keys.map((k) => (
            <td key={`${wmi}-${k}`}>{d[k]}</td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div className="App">
      <header>WMI Data - Honda | Total: {cars.length}</header>

      <input
        type="text"
        onMouseOut={(event) => setSearchText(event.target.value)}
      ></input>
      <select onChange={(e) => setCountry(e.target.value)}>
        <option value="View All">View All</option>
        {countries &&
          countries.map((i, k) => (
            <option key={k} value={i}>
              {i}
            </option>
          ))}
      </select>
      <button type="button" onClick={getData()}>
        Search
      </button>
      <table>
        <thead>
          <tr>
            {keys.map((k) => (
              <th key={k}>{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>{getRowsJsx()}</tbody>
      </table>
    </div>
  );
}

export default App;
