import React from "react";
import Header from "./Header";
import Part from "./Part";
import Total from "./Total";


const App = () => {
  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10, 7, 14]
  const amount = exercises[0] + exercises[1] + exercises[2]

  return (
    <div>
      <Header name={course} />
      <Part part={parts[0]} exercise={exercises[0]} />
      <Part part={parts[1]} exercise={exercises[1]} />
      <Part part={parts[2]} exercise={exercises[2]} />
      <Total amount={amount} />
    </div >
  )
}


export default App;
