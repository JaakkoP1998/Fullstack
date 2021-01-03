//useDispatch versio koodista
/* import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

//Komponentti uusien anekdoottien lomakkeelle
const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    //Uuden anekdootin lisäys
    const addAnecdote = async (event) =>{
        event.preventDefault()
        const content = event.target.inputA.value
        event.target.inputA.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`Added '${content}'`, 3000))
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="inputA"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm */

//Connect-versio
import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

//Komponentti uusien anekdoottien lomakkeelle
const AnecdoteForm = (props) => {
    //Uuden anekdootin lisäys
    const addAnecdote = async (event) =>{
        event.preventDefault()
        const content = event.target.inputA.value
        event.target.inputA.value = ''
        props.createAnecdote(content)
        props.setNotification(`Added '${content}'`, 3000)
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="inputA"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default connect( null, { createAnecdote, setNotification })(AnecdoteForm)