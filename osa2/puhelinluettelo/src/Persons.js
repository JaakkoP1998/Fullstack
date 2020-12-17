import React from 'react'
import Person from './Person'

const Persons = ({persons}) => {
 return (
   <div>
     <ul>
        {persons.map((person) =>
        <Person key={person.name} name={person.name} number={person.number} />
        )}
      </ul>
   </div>
 )
}

export default Persons