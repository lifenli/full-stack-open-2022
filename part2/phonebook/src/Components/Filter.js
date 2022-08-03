import React from "react"

const Filter = ({ handleSearch, value }) => {
    return (
        <div>
            Filter shown with <input type="text" onChange={handleSearch} value={value} />
        </div>
    );
}

export default Filter;