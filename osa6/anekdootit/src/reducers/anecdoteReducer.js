import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'NEW ANECDOTE':
      return [...state, action.data]
    case 'INITIAL':
      return action.data
    case 'VOTE':
      const updatedAnecdote = action.data
      const id = updatedAnecdote.id
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : updatedAnecdote
        )
    default: return state
  }
}

export const voteFor = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(id)
    dispatch({
      type:'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type:'NEW ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type:'INITIAL',
      data: anecdotes
    })
  }
}

export default anecdoteReducer