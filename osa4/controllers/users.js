const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

//Lisätään käyttäjä
usersRouter.post('/', async (request, response) => {
    const body = request.body

    //Kuinka monta "rundia" salausta(hash) tehdään
    const saltRounds = 10
    //Varsinainen salaus
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

//Kaikkien käyttäjien haku
usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter