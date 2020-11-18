import React from "react";
import "./App.css";
import data from "./honda_wmi.json";

function App() {
  const keys = ["Name", "WMI", "Country", "CreatedOn", "VehicleType"];

  const getRowsJsx = () => {
    return data.map((d) => {
      const wmi = d.WMI;
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
      <header>WMI Data - Honda | Total: {data.length}</header>
      <table>
        <thead>
          <tr>
            `
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
