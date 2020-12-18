import React, { useState, useEffect } from 'react'
import pservices from './services/services'
import Form from './Form'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')

  //Haetaan henkilöiden tiedot palvelimelta
  useEffect(() => {
    pservices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
      : pservices
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })
    
     //Nollataan uusi nimi
     setNewName('')
     setNewNumber('')
  }
  
  //Funktio henkilötietojen poistamiselle
  const deletePersonOf = (name) => {
    const person = persons.find(p => p. name === name)
    console.log(person.id)
    const id = person.id
    pservices
     .destroy(id, person)
     .then(deletedPerson => {
       console.log(deletedPerson)
       const filteredPersons = persons.filter(p => p.id !== id)
       if(window.confirm(`Do you want to delete ${deletedPerson.name}`)){
         setPersons(filteredPersons)
       }
     })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form newName={newName} newNumber={newNumber}
       handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
       addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePersonOf}/>
    </div>
  )

}

export default App