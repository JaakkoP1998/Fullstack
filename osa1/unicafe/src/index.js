import React, { useState } from 'react'
import ReactDOM from 'react-dom'


//Oma komponentti, jolla huolehditaan klikattavat näppäimet
const Button = ({handleClick, text}) => {
  return (
    <button onClick ={handleClick}>
     {text}
    </button>
  )
}

// Komponentti statistiikan näyttämiselle
const StatisticLine = ({text, value}) =>{
  return(
      <td>{text}: {value}</td>
  )
}

// Komponentti statistiikan seuraamiselle
const Statistics = ({good, neutral, bad, average, positives, allClicks }) => {
  if (allClicks.length === 0){
    return(
      <div>
      <h1>Statistics</h1>
        No Feedback given
      </div>
    )
  }
   return (
    <div>
     <h1>Statistics</h1>
     <table>
       <tbody>
        <tr><StatisticLine text="good" value={good}/></tr>
        <tr><StatisticLine text="neutral" value={neutral}/></tr>
        <tr><StatisticLine text="bad" value={bad}/></tr>
        <tr><StatisticLine text="average" value={average}/></tr>
        <tr><StatisticLine text="positives" value={positives + "%"}/></tr>
       </tbody>
     </table>
    </div>
   )
}


//App komponentti
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //Taulukko johon tallennetaan palaute
  const [allClicks, setAll] = useState([])
  //Muuttujat keskiarvon laskemiseen
  const summa = allClicks.length
  const average =  (good + bad*-1) / summa 
  const positives = good / summa

   
  // Funktioita joilla lisätään arvostelujen laskureiden määrää
  const increaseGood = () => {
    //Lisätään arvostelua vastaava numero taulukkoon
    setAll(allClicks.concat(1))
    //Kasvatetaan laskurin määrää yhdellä
    setGood(good + 1)
    //Kutsutaan keskiarvoa laskevaa funktiota päivittämistä varten
  }
  const increaseNeutral = () => {
    setAll(allClicks.concat(0))
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    setAll(allClicks.concat(-1))
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button 
        handleClick={increaseGood}
        text = 'Good'
        />
        <Button 
        handleClick={increaseNeutral}
        text = 'Neutral'
        />
        <Button 
        handleClick={increaseBad}
        text = 'Bad'
        />
        <Statistics good={good} neutral={neutral} bad= {bad}
          average={average} positives={positives} allClicks={allClicks}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
