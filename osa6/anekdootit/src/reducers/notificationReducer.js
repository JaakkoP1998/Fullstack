const notificationReducer = (state = '', action) => {
  switch(action.type){
    case 'SET NOTIFICATION':
      return state = `${action.data}`
    default: return state
  }
}


export const setNotification = (content, timer) => {
  return async dispatch => {
    dispatch({
      type: 'SET NOTIFICATION',
      data: content
    })
    setTimeout(() => {
      dispatch({
        type: 'SET NOTIFICATION',
        data: ''
      })
    }, timer)
  }
}

export default notificationReducer