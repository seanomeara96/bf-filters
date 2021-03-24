import React, { useState } from "react";
import filters from "./filters.json";
function Fields({ handleChange }) {
  return Object.keys(filters).map((key) => (
    <Field key={key} filterName={key} handleChange={handleChange} />
  ));
}

function Field({ filterName, handleChange }) {
  let options = filters[filterName].map((filterValue) => (
    <div key={filterValue}>
      <input
        onChange={() => {
          handleChange(filterName, filterValue);
        }}
        type="checkbox"
        id={filterValue}
        name={filterValue}
        value={filterValue}
      />
      <label htmlFor={filterValue}>{filterValue}</label>
    </div>
  ));
  return (
    <div>
      <h2>{filterName}</h2>
      <div>{options}</div>
    </div>
  );
}
function App() {
  const [appliedFilters, setAppliedFilters] = useState([]);
  function handleChange(name, value) {
    let filterString = `"${name}=${value}"`;
    let newConfig = [...appliedFilters];
    if (!newConfig.includes(filterString)) {
      newConfig.push(filterString);
      setAppliedFilters(newConfig);
    } else {
      newConfig = newConfig.filter((el) => el !== filterString);
      setAppliedFilters(newConfig);
    }
  }
  return (
    <div className="App">
      <textarea
        readOnly
        style={{
          resize: "none",
          boxSizing: "border-box",
          backgroundColor: "coral",
          display: "block",
          padding: "0px",
          border: "none",
          width: "100%",
          cursor: "pointer",
          paddingRight: "3rem",
          paddingLeft: "3rem",
        }}
        onClick={(event) => {
          event.target.select();
          document.execCommand("copy");
          alert("copied");
        }}
        type="text"
        value={appliedFilters.join(";")}
      />

      <div style={{ maxWidth: "800px", margin: "3rem" }} className="container">
        {<Fields handleChange={handleChange} />}
      </div>
    </div>
  );
}

export default App;
