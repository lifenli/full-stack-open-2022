const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
    {
        "title": "Good day",
        "author": "James Bond",
        "url": "good.blog/1",
        "likes": 32,

    },
    {
        "title": "Hello world",
        "author": "John Doe",
        "url": "good.blog/2",
        "likes": 12,
    },
    {
        "title": "Interesting view",
        "author": "Jane Dido",
        "url": "good.blog/3",
        "likes": 2,

    },

]

const userLogin = async () => {
    const response = await api.post('/api/login')
        .send({
            "username": "adminUser",
            "name": "admin",
            "password": "password"
        })
    // console.log(response.body);
    // console.log(response.body.token);
    // console.log(typeof (response.body.token));
    return response
}

const blogsInDB = async () => {
    await userLogin()
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}



module.exports = { initialBlogs, blogsInDB, userLogin }