import React, { useEffect, useState } from "react";
import "./App.css";
import data from "./honda_wmi.json";
import axios from "axios";
import { getCars, getCountries } from "./api";
import "./table.css";

function App() {
  const keys = ["name", "wmi", "country", "createdOn", "vehicleType"];

  const [cars, setCars] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [country, setCountry] = useState("View All");
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    getCars(searchText, country).then((autos) => {
      setCars(autos);
    });
  }, []);

  useEffect(() => {
    getCountries().then((list) => {
      setCountries(list);
    });
  }, []);

  const getData = () => {
    getCars(searchText, country).then((autos) => {
      setCars(autos);
    });
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
      {loadingText}
      <input
        type="text"
        onChange={(event) => setSearchText(event.target.value)}
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
      <table id="cars">
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
