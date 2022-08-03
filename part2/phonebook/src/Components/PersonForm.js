import React from "react";


const PersonsForm = ({ handleButtonSubmit, handleNameChange, handleNumChange, nameValue, numValue }) => {

    return (
        <div>
            <form onSubmit={handleButtonSubmit} >
                <h2>add a new</h2>
                <p>  name: <input type="text" onChange={handleNameChange} value={nameValue} /></p>
                <p>  number: <input type="tel" onChange={handleNumChange} value={numValue} /></p>
                <button type="submit">add</button>
            </form>

        </div>
    );
}

export default PersonsForm;