//Koodi ennen tehtävää 6.19
//useSelector ja useDispatch versio
/* import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
//import { notificationVote, notificationNull } from '../reducers/notificationReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(voteFor(id))
        //Näytetään anekdootti jota äänestettiin ja tyhjennetään notifikaatio 3 sekunnin kuluessa
        dispatch(setNotification(`you voted '${content}'`, 3000))
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

export default AnecdoteList */

//Connect-versio
import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const handleVote = (id, content) => {
        props.voteFor(id)
        props.setNotification(content, 3000)
    }

    return (
        <div>
            {props.anecdotes
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
                        <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
                            vote
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    voteFor,
    setNotification
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes