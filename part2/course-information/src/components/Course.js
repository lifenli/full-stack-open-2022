import React from "react";

const Part = ({ part }) => {
    return (
        <p> {part.name} {part.exercises} </p>
    )
}

const TotalExercises = ({ parts }) => {
    const exerAmount = []
    const exerArray = exerAmount.concat(parts) // create an array for the exercises amount
    // console.log(exerArray);
    return (
        <h3>total of {exerArray.reduce((a, b) => a + b)} exercises </h3> // add up the amount 
    )
}


const ReturnCourse = ({ course }) => {
    // console.log(course.parts);
    const courseParts = course.parts // each course is an object
    return (
        <div>
            <h2>{course.name}</h2>
            {courseParts.map(part =>
                <Part key={part.id} part={part} />
            )}
            {/* loop through the "parts" */}
            <TotalExercises parts={courseParts.map(parts => parts.exercises)} />
            {/* // map through each PART and retrieve the value of "exercises" */}
        </div >
    )
}

const Course = ({ courses }) => {
    // console.log(courses);
    return (
        <div>
            {
                courses.map(course =>
                    < ReturnCourse key={course.id} course={course} />
                )
                // map through the whole array list
            }
        </div>
    )


}

export default Course;