import React from 'react';

//Komponentti joka huolehtii tehtävien yhteismäärästä
const Total = ({parts}) => {
	const total = parts.reduce( (sum, part) => {
		return sum + part.exercises
	}, 0)
	return (
		<div>
		<p> Number of exercises {total}</p>
		</div>
	)
}

const Part = ({name, exercises}) => {
	return (
		<div>
		<p> {name} {exercises} </p>
		</div>
	)
}


//Komponentti joka huolehtii osista
const Content = ({courses}) => {
	return (
		<div>
			<ul>
				{courses.map(course => 
				<li key={course.id}>
					<Part name={course.name} exercises={course.exercises}/>
				</li>)}
			</ul>
		</div>
	)
}

//Komponentti joka huolehtii kurssin nimen renderöimisestä
const Header = (props) => {
	return (
		<div>
			<h1>{props.course.name}</h1>
		</div>
	)
}

//Komponentti joka huolehtii tehtävien yhteismäärästä
const Course = ({courses}) => {
	return (
	<div>
	  <ul>
		 {courses.map (course =>
		 <li key={course.id}>
     	  <Header course={course} />
     	  <Content courses={course.parts} />
     	  <Total parts={course.parts}/>
		  </li>
		 )}
	  </ul>
    </div>
	)
}

export default Course