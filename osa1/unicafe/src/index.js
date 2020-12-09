import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  // Funktioita joilla lisätään arvostelujen laskureiden määrää
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

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
        <div>
        <h1>Statistics</h1>
        <div>good: {good}</div>
        <div>neutral: {neutral}</div>
        <div>bad: {bad}</div>
        </div>
    </div>
  )
}

//Oma komponentti, jolla huolehditaan klikattavat näppäimet
const Button = ({handleClick, text}) => {
  return (
    <button onClick ={handleClick}>
     {text}
    </button>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
