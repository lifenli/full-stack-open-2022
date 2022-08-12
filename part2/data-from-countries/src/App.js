
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryList = response.data.map(country => ({
          country: country.name.common,
          capital: country.capital,
          area: country.area,
          languages: country.languages,
          flag: country.flags.svg,
          lat: country.latlng[0],
          lon: country.latlng[1]
        })
        )
        setCountries(countryList)
      })
  }, [])

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
    axios
      .get(url)
      .then(response => {
        const weatherObj = {
          temp: response.data.main.temp,
          icon: response.data.weather[0].icon,
          wind: response.data.wind
        }
        setWeather(weatherObj)
      })

  }, [lat, lon, api_key])

  const handleFilter = (event) => {
    setValue(event.target.value)
  }


  const newList = countries.filter(country => country.country.toLowerCase().startsWith(value.toLowerCase()))
  console.log(newList);


  const SingleCountry = ({ list, i }) => {
    console.log(lat, lon)
    console.log(weather);
    setLat(list[i].lat)
    setLon(list[i].lon)

    return (
      <>
        <h1> {list[i].country}</h1>
        <p> capital {list[i].capital}</p>
        <p> area {list[i].area}</p>
        <div>
          <h2>Languages</h2>
          {Object.values(list[i].languages).map((language) =>
            <ul key={language}>
              <li> {language} </li>
            </ul>)
          }
        </div>
        <img src={list[i].flag} alt="map" width="100px" />
        <h2>Weather in {list[i].country}</h2>
        <p>Temprature {Math.round(weather.temp - 273.15)} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="map" width="100px" />
        <p>Wind {weather.wind.speed} m/s</p>
      </>

    )
  }


  const CountryInfo = ({ list }) => {
    const [show, setShow] = useState(false)
    const [ind, setInd] = useState('')
    const handleClick = (country) => {
      setShow(true)
      setInd(list.indexOf(country))
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
