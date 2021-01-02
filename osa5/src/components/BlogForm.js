import React, { useState } from 'react'
import PropTypes from 'prop-types'

//Komponentti blogien lisäämiselle
const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    //Funktiot input-arvojen muuttamiselle
    const handleTitleChange = (event) => {
        event.preventDefault()
        setNewTitle(event.target.value)
    }
    const handleAuthorChange = (event) => {
        event.preventDefault()
        setNewAuthor(event.target.value)
    }
    const handleUrlChange = (event) => {
        event.preventDefault()
        setNewUrl(event.target.value)
    }

    //Funktio blogin lisäämiselle
    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: Math.floor(Math.random() * Math.floor(1000))
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <form onSubmit={addBlog} >
            <div> Title:
                <input
                    value={newTitle}
                    onChange={handleTitleChange}>
                </input>
            </div>
            <div> Author:
                <input
                    value={newAuthor}
                    onChange={handleAuthorChange}>
                </input>
            </div>
            <div> Url:
                <input
                    value={newUrl}
                    onChange={handleUrlChange}>
                </input>
            </div>
            <button type="submit">Save</button>
        </form>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}

export default BlogForm