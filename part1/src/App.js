import React from "react";
import Header from "./Header";
import Part from "./Part";
import Total from "./Total";


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header name={course.name} />
      <Part part={course.parts[0]['name']} exercise={course.parts[0]['exercises']} />
      <Part part={course.parts[1]['name']} exercise={course.parts[1]['exercises']} />
      <Part part={course.parts[2]['name']} exercise={course.parts[2]['exercises']} />
      <Total amount={course.parts[0]['exercises'] + course.parts[1]['exercises'] + course.parts[2]['exercises']} />
    </div >
  )
}


export default App;
