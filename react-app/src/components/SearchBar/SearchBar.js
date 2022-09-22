import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SearchBar.css"

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([])
  const [value, setValue] = useState("")

  const handleFilter = (e) => {
    const word = e.target.value
    const filter = Object.values(data).filter(value => {
      return value.title.toLowerCase().includes(word.toLowerCase())
    })

    console.log(filter)

    if (word === "") {
      setFilteredData([])
      setValue("")
    } else {
      setFilteredData(filter)
      setValue(word)
    }
  }

  const closeSearch = () => {
    setFilteredData([])
    return setValue("")
  }


  return (
    <div className="search">
      {/* <img className="searchIcon" src="/static/search.png"></img> */}
      <div className="searchInputs">
        <input className="searchInputField" type="text" placeholder={placeholder} onChange={handleFilter} value={value} />
        <button id="search-clear-button" onClick={closeSearch}>
          <svg aria-label="Search" color="#8e8e8e" fill="#8e8e8e" height="18" role="img" viewBox="0 0 24 24" width="16"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>

        </button>
      </div>
      {filteredData.length != 0 && (
        <div className="searchResult">
          {filteredData.slice(0, 10).map((value, key) => {
            return (
              <NavLink onClick={closeSearch} className="searchItem" to={`/tasks/${value.id}`}>
                <span> {value.title} at {value.city}</span>
              </NavLink>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar
