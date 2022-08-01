
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchName(event.target.value);
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

  const showFilter =
    persons.find(person => person.name.toLowerCase() === searchName.toLowerCase())
      // if the searchName matches the one in the persons array (case insensitive)
      ? persons.filter(person => person.name.toLowerCase() === searchName.toLowerCase())
      : persons

  const ListPersons = ({ persons }) => {
    return (
      persons.map(person =>
        <p key={person.id}>{person.name} {person.number} </p>
      )
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        Filter shown with <input onChange={handleSearch} value={searchName} />
      </p>
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
      <ListPersons persons={showFilter} />
    </div>
  )
}

export default App