import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  )
}
const Stats = (props) => {
  return (
    <div>
      {props.rating} {props.total}
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // const [total, setTotal] = useState(0)

  return (
    <div>
      <h1>Give Feeback</h1>
      < Button handleClick={() => setGood(good + 1)} text="good" />
      < Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      < Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>Statistics</h2>
      <Stats rating={'good'} total={good} />
      <Stats rating={'neutral'} total={neutral} />
      <Stats rating={'bad'} total={bad} />
      <p>all {good + neutral + bad} </p>
      <p>Average {(good + neutral + bad) / 3}  </p>
      <p>Positive {good / (good + neutral + bad) * 100} %</p>
    </div>
  )
}

export default App