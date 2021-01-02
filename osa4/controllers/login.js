const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async(request, response) => {
    const body = request.body

    //Etsitään ja verrataan löytyykö annettua käyttäjää ja onko salasana oikein
    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if(!(user && passwordCorrect)){
        return response.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    //Luodaan tokeni käyttäjälle
    const token = jwt.sign(userForToken, process.env.SECRED)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter