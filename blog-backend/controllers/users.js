const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const blog = require('../models/blog')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, author: 1 })
    response.json(users)
})

userRouter.post('/',
    //express-validator
    body('username').isLength({ min: 3 }),
    body('password').isLength({ min: 3 }),
    async (request, response) => {
        const { username, name, password } = request.body
        const existingUser = await User.findOne({ username })
        const saltRounds = 15
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({
            username,
            name,
            passwordHash,
        })

        const errors = validationResult(request);
        if (existingUser) {
            return response.status(400).json({ error: 'Username must be unique' })
        } else if (!errors.isEmpty() && errors.errors[0].param === 'password') {
            return response
                .status(400)
                .send('Password must be longer than 3 characters.')
        } else if (!errors.isEmpty() && errors.errors[0].param === 'username') {
            return response
                .status(400)
                .send('Username must be longer than 3 characters.')
        }

        const savedUser = user.save()
        response.status(201).json(savedUser)

    })

module.exports = userRouter