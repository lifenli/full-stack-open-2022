import React from "react";
import Header from "./Header";
import Part from "./Part";
import Total from "./Total";


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header name={course} />
      <Part part={part1['name']} exercise={part1['exercises']} />
      <Part part={part2['name']} exercise={part2['exercises']} />
      <Part part={part3['name']} exercise={part3['exercises']} />
      <Total amount={part1['exercises'] + part2['exercises'] + part3['exercises']} />
    </div >
  )
}


export default App;
