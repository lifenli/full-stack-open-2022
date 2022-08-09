
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

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

  const handleFilter = (event) => {
    setValue(event.target.value)
  }


  const newList = countries.filter(country => country.country.toLowerCase().startsWith(value.toLowerCase()))
  console.log(newList);


  const CountryInfo = ({ list }) => {
    return (
      <div>
        {list.map(country =>
          <p key={country.country}>{country.country}</p>)
        }
      </div>
    )
  }

  const SingleCountry = ({ list }) => {
    return (
      <>
        <h1> {list[0].country}</h1>
        <p> capital {list[0].capital}</p>
        <p> area {list[0].area}</p>
        <div>
          <h2>Languages</h2>
          {Object.values(list[0].languages).map(language =>
            <ul>
              <li key={language.language}> {language} </li>
            </ul>)
          }
        </div>
        <img src={list[0].flag} alt="map" width="100px" />
      </>


    )
  }


  return (
    <div className="App">
      <p>find counries <input onChange={handleFilter} value={value} /></p>
      <div>
        {newList.length === 1 && <SingleCountry list={newList} />}
        {newList.length > 10 && value && <p>"Too many matches, specify another filter"</p>}
        {newList.length <= 10 && newList.length > 1 && <CountryInfo list={newList} />}

      </div >
    </div >
  )
}

export default App;
