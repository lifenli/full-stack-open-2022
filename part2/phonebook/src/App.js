
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')
  // const [buttonSubmit, setButtonSubmit] = useState(true)


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  const handleButtonSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.value)
    const newPersonObj = {
      name: newName,
    }
    persons.find(person => person.name === newPersonObj.name)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPersonObj)); setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button onClick={handleButtonSubmit} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person =>
        <p key={person.name}> {person.name}</p>
      )}
      </div>
    </div>
  )
}

export default App