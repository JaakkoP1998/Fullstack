import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { notificationVote, notificationNull } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(voteFor(id))
        //Näytetään anekdootti jota äänestettiin ja tyhjennetään notifikaatio 5 sekunnin kuluessa
        dispatch(notificationVote(content))
        setTimeout(() => {
            dispatch(notificationNull())
        }, 5000)
    }

    return (
        <div>
            {anecdotes
            .sort(function (a, b){
                if (a.votes < b.votes){
                    return 1
                }
                if (a.votes > b.votes){
                    return -1
                }
                return 0
            })
            .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes 
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList