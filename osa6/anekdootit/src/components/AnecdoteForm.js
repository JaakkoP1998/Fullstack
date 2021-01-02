import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationAdd, notificationNull } from '../reducers/notificationReducer'

//Komponentti uusien anekdoottien lomakkeelle
const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    //Uuden anekdootin lisäys
    const addAnecdote = (event) =>{
        event.preventDefault()
        const content = event.target.inputA.value
        event.target.inputA.value = ''
        dispatch(createAnecdote(content))
        dispatch(notificationAdd(content))
        setTimeout(() => {
            dispatch(notificationNull())
        }, 5000)
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

export default AnecdoteForm