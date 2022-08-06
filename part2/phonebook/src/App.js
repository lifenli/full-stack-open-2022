
import PersonsForm from './Components/PersonForm'
import ListPersons from './Components/ListPersons'
import Filter from './Components/Filter'
import { useEffect, useState } from 'react'
import axios from 'axios'



const App = () => {
  const [searchName, setSearchName] = useState('')
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data);
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchName(event.target.value)
  }

  const showFilter =
    persons.find(person => person.name.toLowerCase() === searchName.toLowerCase())
      // if the searchName matches the one in the persons array (case insensitive)
      ? persons.filter(person => person.name.toLowerCase() === searchName.toLowerCase())
      : persons
  // Assign a new variable to the filter, without altering the "persons" values
  // Do NOT alter the "persons" value by setPersons() ...


  const handleButtonSubmit = (event) => {
    event.preventDefault();
    const newPersonObj = {
      name: newName,
      number: number,
      id: persons.length + 1
    }
    persons.find(person => person.name === newPersonObj.name)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPersonObj)); setNewName(''); setNumber('');
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} value={searchName} />
      <PersonsForm handleButtonSubmit={handleButtonSubmit} handleNameChange={handleNameChange} handleNumChange={handleNumChange} nameValue={newName} numValue={number} />
      <ListPersons list={showFilter} />
      {/* the value depends on the filter */}

    </div>
  )
}

export default App