import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

//Haetaan anekdootit baseUrl:ästä
const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

//Lisätään uusi anekdootti baseUrl:ään
const createNew = async (content) => {
    const object = { 
        content, 
        votes: 0 
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateAnecdote = async (id) => {
    const anecdoteUrl = `${baseUrl}/${id}`
    const anecdotes = await getAll()
    const oldAnecdote = anecdotes.find(a => a.id === id)
    const newAnecdote = {
        ...oldAnecdote,
        votes: oldAnecdote.votes + 1
    }

    const response = await axios.put(anecdoteUrl, newAnecdote)
    return response.data
}

export default { getAll, createNew, updateAnecdote }