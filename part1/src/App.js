import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  )
}

const Display = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.rating}</td>
        <td>{props.value} </td>
      </tr>
    </tbody>
  )

}

const Stats = (props) => {

  const values = [props.good, props.neutral, props.bad, props.all, props.average, props.positive]
  if (props.all !== 0) {

    return (
      <div>
        <h2>{props.header}</h2>
        <table>

          <Display rating="good" value={values[0]} />

          <Display rating="neutral" value={values[1]} />

          <Display rating="bad" value={values[2]} />

          <Display rating="all" value={values[3]} />

          <Display rating="average" value={values[4]} />

          <Display rating="positive" value={values[5]} />

        </table>
      </div>
    )
  } else {
    return (
      <h2>No feedback given</h2>
    )
  }
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => setGood(newValue + 1)
  const setToNeutral = newValue => setNeutral(newValue + 1)
  const setToBad = newValue => setBad(newValue + 1)


  return (
    <div>
      <h1>Give Feeback</h1>
      < Button handleClick={() => setToGood(good)} text="good" />
      < Button handleClick={() => setToNeutral(neutral)} text="neutral" />
      < Button handleClick={() => setToBad(bad)} text="bad" />
      <Stats header="Statics" good={good} neutral={neutral} bad={bad} all={good + neutral + bad} average={(good + neutral + bad) / 3} positive={(good / (good + neutral + bad) * 100) + '%'} />
    </div>
  )

}

export default App