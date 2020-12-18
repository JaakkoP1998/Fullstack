import React from 'react'

const Person = ({ name, number, deletePerson}) => {
  return (
    <div>
      <li> 
        {name} {number}
        <button onClick={deletePerson}>Delete</button>
      </li> 
    </div>
  )
}

export default Person