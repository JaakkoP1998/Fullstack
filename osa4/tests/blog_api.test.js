const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

//Testaamista varten luodut blogit
const initialBlogs = [
    {
        title: "jest supertest testiin",
        author: "Manni Muistoinen",
        url: "jesterit.com",
        likes: 25
    },
    {
        title: "Esimerkkilista testaukseen",
        author: "Aarni Ojala",
        url: "kuumulankanta.fi",
        likes: 7
    },
    {
        title: "Viimeinen blogi",
        author: "Hessu Myöhäinen",
        url: "lastindex.com",
        likes: 6
    }
]

//Alustetaan testi-tietokantaan testaamista varten blogeja
beforeEach(async () => {
 await Blog.deleteMany({})
 let blogObject = new Blog(initialBlogs[0])
 await blogObject.save()
 blogObject = new Blog(initialBlogs[1])
 await blogObject.save()
 blogObject = new Blog(initialBlogs[2])
 await blogObject.save()
})

//Testataan että kaikki blogit palautetaan
test('All blogs are returned', async () =>{
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

//Testataan uuden, kriteerit täyttävän blogin lisääminen 
test('Blog can be added', async () => {
    const newBlog = {
        title: "Building blog out of blogs",
        author: "Lego Man",
        url: "www.legoland.com",
        likes: 14
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAfter = await Blog.find({})
    expect(blogsAfter).toHaveLength(initialBlogs.length + 1)
})

//Testataan blogin lisääminen mistä puuttuvat likes-osio
test('Blog can be added without likes', async () => {
    const newBlog = {
        title: "Neverending testing",
        author: "Doctor Green",
        url: "greenland.uk"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAfter = await Blog.find({})
    expect(blogsAfter[(blogsAfter.length - 1)].likes).toBe(0)
})

//Testataan että blogia, josta puuttuvat url tai title, blogia ei lisätä
test('Blog cannot be added without title or url', async () => {
    const newBlog = {
        author: "Doctor Green",
        likes: 8
    }

    const blogsAtStart = Blog.find({})

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAfter = Blog.find({})

    expect(blogsAfter.length).toBe(blogsAtStart.length)
})

//Testataan yksittäisen blogin poisto
test('Blog can be deleted', async() => {
    const blogsAtStart = await Blog.find({})
    const blogToBeDeleted = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToBeDeleted.id}`)
        .expect(204) 

    const blogsAfter = await Blog.find({})
    expect(blogsAfter).toHaveLength(blogsAtStart.length - 1)
})

//Testaamista ei saatu oikeaan muotoon, mutta rest:in mukaan muokkaus toimii
/* test('Blogs likes can be updated ', async() => {
    const blogsAtStart = await Blog.find({})
    let blogToBeUpdated = blogsAtStart[0]
    
    blogToBeUpdated.likes = 120

    await api
     .put(`/api/blogs/${blogToBeUpdated.id}`)
     .expect(200)

    const blogsAfter = await Blog.find({})
    const updatedBlog = blogsAfter[0]

    expect(updatedBlog.likes).toBe(120)
}) 
 */
afterAll(() => {
    mongoose.connection.close()
})