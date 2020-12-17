import React, { useState } from 'react'
import Form from './Form'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '+358 45 503 1334'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')

 // Funktiot input-elementin valuen muuttamiselle
  const handleNameChange = (event) =>{
    event.preventDefault()
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }


  //Funktio nimen lisäämiselle listaan
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    //Kerätään nimet listaan tarkistamista varten
    let apu = []
    for (let y = 0; y < persons.length; y++){
      apu.push(persons[y].name)
    }
    //Tarkistetaan onko nimi jo listassa, jos on niin nimeä ei lisätä
    apu.includes(personObject.name)
      ? window.alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject))
    
     //Nollataan uusi nimi
     setNewName('')
     setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form newName={newName} newNumber={newNumber}
       handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
       addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )

}

export default App