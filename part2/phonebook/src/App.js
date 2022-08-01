
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '121 - 1212 - 1212'
    }
  ])

  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNumber(event.target.value)
  }


  const handleButtonSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target.value)
    const newPersonObj = {
      name: newName,
      number: number
    }
    persons.find(person => person.name === newPersonObj.name)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPersonObj)); setNewName(''); setNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>number: <input onChange={handleNumChange} value={number} type="tel" /></div>
        {/* validate the type of input to be phone number */}
        <div>
          <button onClick={handleButtonSubmit} type="submit">add</button>
        </div>
      </form>
      <div>{persons.map(person =>
        <p key={person.name}> {person.name} {person.number}</p>
      )}
      </div>
    </div>
  )
}

export default App