
import React from "react";

const ListPersons = ({ list }) => {

    return (
        <div>
            {list.map(person =>
                <p key={person.id}>{person.name} {person.number} </p>
            )}

        </div>

    )
}


export default ListPersons;