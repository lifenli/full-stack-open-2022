
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
    .then(response => {
      const countryList = response.data.map(country => ({
        country: country.name.common,
        capital: country.capital,
        area: country.area,
        languages: country.languages,
        flag: country.flags.svg
      })
      )
      setCountries(countryList)
    }
    )
  }, [])


  const handleFilter = (event) => {
    setValue(event.target.value)
  }


  const newList = countries.filter(country => country.country.toLowerCase().startsWith(value.toLowerCase()))
  console.log(newList);


  const SingleCountry = ({ list, i }) => {
    console.log(list[i]);
    return (
      <>
        <h1> {list[i].country}</h1>
        <p> capital {list[i].capital}</p>
        <p> area {list[i].area}</p>
        <div>
          <h2>Languages</h2>
          {Object.values(list[i].languages).map((language) =>
            <ul>
              <li key={i.toString()}> {language} </li>
            </ul>)
          }
        </div>
        <img src={list[i].flag} alt="map" width="100px" />
      </>


    )
  }


  const CountryInfo = ({ list }) => {
    const [show, setShow] = useState(false)
    const [ind, setInde] = useState('')
    const handleClick = (country) => {
      setShow(true)
      setInde(list.indexOf(country))
    }

    return (
      <div>
        {list.map((country) =>
          <div key={country.country} >{country.country} <button onClick={() => handleClick(country)}> show </button>
          </div>
        )}
        {show && <SingleCountry list={list} i={ind} />}
      </div >
    )
  }

  return (
    <div className="App">
      <p>find counries <input onChange={handleFilter} value={value} /></p>

      {newList.length === 1 && <SingleCountry list={newList} i="0" />}
      {newList.length > 10 && value && <p>"Too many matches, specify another filter"</p>}
      {newList.length <= 10 && newList.length > 1 && <CountryInfo list={newList} />}


    </div >
  )
}

export default App;
