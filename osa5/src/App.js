import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

//Komponentti sisäänkirjautumisen lomakkeelle
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleLogin}>
            <div>
             username
                <input
                    type="text"
                    value={props.username}
                    name="Username"
                    onChange={({ target }) => props.setUsername(target.value)}
                />
            </div>
            <div>
            password
                <input
                    type="password"
                    value={props.password}
                    name="Password"
                    onChange={({ target }) => props.setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}


//Komponentti blogejen renderöintiin
const BlogsList = ({ blogs, name }) => {

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogUser')
    }

    return (
        <div>
            <p>{name} logged in</p> <button onClick={handleLogout}>logout</button>
            <div>
                {blogs
                    .sort(function(a, b){
                        if(b.likes < a.likes){
                            return -1
                        }
                        if(b.likes > a.likes){
                            return 1
                        }
                        return 0
                    })
                    .map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    )}
            </div>
        </div>
    )
}

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //setErrorMessagea käytetään mutta itse errorMessagea ei kutsuta missään vaiheessa
    // eslint-disable-next-line no-unused-vars
    const [errorMessage, setErrorMessage] = useState(null)
    const blogFromRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    //Sivun käynnistyessä tarkistetaan onko local-storagessa käyttäjää
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    //Funktio blogin lisäämiselle
    const addBlog = (blogObject) => {
    //Lisäyksen jälkeen muutetaan blog-lomake näkymättömäksi
        blogFromRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
            })
    }

    //Tapahtuma kun kirjaudutaan sisään
    const handleLogin =  async (event) => {
        event.preventDefault()

        try{
            const user = await loginService.login({
                username, password
            })
            //Tallennetaan käyttäjätunnukset local storageen selaimessa
            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h2>blogs</h2>
            {user === null ?
                <LoginForm username={username} password={password}
                    handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />
                : <div>
                    <Togglable buttonLabel="add blog" ref={blogFromRef}>
                        <BlogForm createBlog={addBlog} user={user}/>
                    </Togglable>
                    <BlogsList blogs={blogs} name={user.name} />
                </div>
            }
        </div>
    )
}

export default App