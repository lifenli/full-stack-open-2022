
import React from "react";

const ListPersons = ({ list, handleDelete }) => {

    return (
        <div>
            {list.map(person =>
                <p key={person.id}>{person.name} {person.number} <button key={person.id} id={person.id} onClick={handleDelete}>delete</button></p>
            )}

        </div>

    )
}


export default ListPersons;