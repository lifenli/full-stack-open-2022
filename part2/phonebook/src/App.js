
import PersonsForm from './Components/PersonForm'
import ListPersons from './Components/ListPersons'
import Filter from './Components/Filter'
import { useEffect, useState } from 'react'
import personService from './services/persons'



const App = () => {
  const [searchName, setSearchName] = useState('')
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initalData => setPersons(initalData))
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

  const handleButtonSubmit = (event) => {
    event.preventDefault();
    const newPersonObj = {
      name: newName,
      number: number,
    }
    const existPerson = persons.find(person => person.name === newName)
    const changedPerson = { ...existPerson, number: newPersonObj.number }
    function updateNumber() {
      if (window.confirm(`${newName} is already added to phonebook, replace the old one with a new one?`)) {
        personService
          .update(existPerson.id, changedPerson)
          .then(returnedPerson => setPersons(persons.map(person => person.id !== existPerson.id ? person : returnedPerson)))
          .catch(e => alert(`${newName} was deleted from the server`))
        setNewName('');
        setNumber('')
      }
    }

    persons.find(person => person.name === newPersonObj.name)
      ? updateNumber()
      : personService
        .create(newPersonObj)
        .then(returnedObj => {
          setPersons(persons.concat(returnedObj)); setNewName(''); setNumber('');
        }
        ).catch(e => console.log(e))
  }

  const handleDelete = (e) => {
    const buttonId = parseInt(e.target.id)
    const targetPerson = persons.find(person => person.id === buttonId)
    const targetName = targetPerson.name
    if (window.confirm(`Delete ${targetName}?`)) {
      personService
        .remove(targetPerson.id)
      personService
        .getAll()
        .then(returnedPersons => setPersons(returnedPersons))
    }
  }

  const showFilter =
    persons.find(person => person.name.toLowerCase() === searchName.toLowerCase())
      // if the searchName matches the one in the persons array (case insensitive)
      ? persons.filter(person => person.name.toLowerCase() === searchName.toLowerCase())
      : persons
  // Assign a new variable to the filter, without altering the "persons" values
  // Do NOT alter the "persons" value by setPersons() ...


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} value={searchName} />
      <PersonsForm handleButtonSubmit={handleButtonSubmit} handleNameChange={handleNameChange} handleNumChange={handleNumChange} nameValue={newName} numValue={number} />
      <ListPersons list={showFilter} handleDelete={handleDelete} />
      {/* the value depends on the filter */}

    </div>
  )
}

export default App