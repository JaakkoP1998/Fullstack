const blogRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

//Tokenin haku ja varmennus
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}

//Kaikkien blogejen haku
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
      .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

//Yksittäisen blogin haku
blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      return response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
})

  //Yksittäisen blogin lisäys
blogRouter.post('/', async (request, response) => {
    const body = request.body
    
    //Haetaan ja varmennetaan token
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRED)
    if(!token || !decodedToken.id){
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    //Lisäys ei saa onnistua jos blogilla ei ole titleä tai url:lää
    if(body.title === undefined || body.url === undefined){
      return response.status(400).json({ error: 'content missing' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes === undefined  ? 0 : body.likes
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
})


//Yksittäisen blogin poisto
blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

//Yksittäisen blogin likejen muokkaus (ei toimi)
blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = { 
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
    response.json(updatedBlog.toJSON())
})

module.exports = blogRouter