import { useState } from 'react'


const Button = (props) => {
  return (
    <p>
      <button onClick={props.handleClick}>{props.text}</ button>
    </p>
  )

}

const MaxVotesDiv = (props) => {
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p> {props.quote} </p>
      <p> has {props.finalvotes} votes </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const n = anecdotes.length
  const votesArr = Array(n).fill(0) //  create a zero-filled array of a desired length
  const newArr = [...votesArr] // not to muate the original array

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(0)
  const [arr, setArr] = useState(newArr) //assing the newArr value to arr
  const [maxVotes, setMaxVotes] = useState(0)
  const [position, setPosition] = useState(0)

  function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const updateVotes = (i) => {
    setVotes(votes + 1)
    arr[i] += 1  // on each click arr[i] add 1 to it
    setArr(arr)  // arr got updated, reassign the value to arr after the update
    setMaxVotes(Math.max(...arr)) //get the max. number in the arr
    setPosition(arr.indexOf(Math.max(...arr)))
  }

  const handleClick = (min, max) => {
    setSelected(randomNum(min, max))

  }



  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {arr[selected]} votes</p>
      <Button handleClick={() => updateVotes(selected)} text="vote" />
      <Button handleClick={() => handleClick(0, anecdotes.length - 1)} text="Next anecdote" />
      <MaxVotesDiv quote={anecdotes[position]} finalvotes={maxVotes} />
    </div>
  )

}


export default App