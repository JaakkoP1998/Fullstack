const notificationReducer = (state = '', action) => {
  switch(action.type){
    case 'ADDED':
      return state = `Successfully added anecdote: ${action.data}`
    case 'VOTED':
      return state = `Voted for: ${action.data}`
    case 'NULL':
      return state = ''
    default: return state
  }
  
}

export const notificationNull = () => {
  return {
    type: 'NULL'
  }
}

export const notificationAdd = (content) => {
  return {
    type: 'ADDED',
    data: content
  }
}

export const notificationVote = (content) => {
  return {
    type: 'VOTED',
    data: content 
  }
}

export default notificationReducer