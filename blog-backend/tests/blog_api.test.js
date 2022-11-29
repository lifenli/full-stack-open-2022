const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')


// beforeEach - Runs a function before each of the tests in this file runs. 
beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await api.post('/api/users').send(
        {
            "username": "adminUser",
            "name": "admin",
            "password": "password"
        }
    )


})

describe('Blogs saved and initiated', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(3)
    })

    // test if the unique identifier property of the blog posts is named id
    test('unique property is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.map(post => post.id)).toBeDefined()
    })
})

describe('User authorization and adding/deleting a blog', () => {


    test('User is authorized and new blog is saved', async () => {
        const user = await User.findOne({ "username": "adminUser" })
        console.log(`"user:" ${user}`);
        const newBlog = {
            "title": "This is a test blog",
            "author": "admin",
            "url": "/blog/test",
            "likes": 12,
            "user": user
        }

        const response = await helper.userLogin()
        console.log(response.body.token);

        await api.post('/api/blogs')
            .set('Authorization', `bearer ${response.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const updatedBlogs = await helper.blogsInDB()
        // blogsInDB is a function that needs to be executed
        expect(updatedBlogs).toHaveLength(helper.initialBlogs.length + 1)
        // the total number of blogs in the system is increased by one
        const content = updatedBlogs.map(blog => blog.title)
        expect(content).toContain("This is a test blog")
        // the content of the blog post is saved correctly to the database.
    })


    test('title or url missing returns 404 Bad request', async () => {
        const user = await User.findOne({ "username": "adminUser" })
        console.log(`"user2 :" ${user}`);
        const response = await helper.userLogin()
        const newBlog = {
            "author": "admin",
            "user": user
        }
        const newBlogObj = new Blog(newBlog)
        //  this is to test the mongoose validation
        await expect(newBlogObj.save(newBlog)).rejects.toThrow(mongoose.Error.ValidationError)
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${response.body.token}`)
            .send(newBlog)
            .expect(404) //the default status was set in controller/blogs if title or url is missing
        const dbBlogs = await helper.blogsInDB()
        expect(dbBlogs).toHaveLength(helper.initialBlogs.length)

    })


    test('missing like property will default to 0', async () => {
        const response = await helper.userLogin()
        const user = response.body.username
        const newBlog = {
            "title": "This is a test blog",
            "author": "Jane Doe",
            "url": "/blog/test",
            "user": user
        }

        await api.post('/api/blogs')
            .set('Authorization', `bearer ${response.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const updatedBlogs = await helper.blogsInDB()
        const newBlogInDB = updatedBlogs.find(blog => blog.title === "This is a test blog")
        expect(newBlogInDB.likes).toBe(0)
    })

    test('deleting a blog returns 204 status', async () => {
        const originalBlogs = await helper.blogsInDB()
        // const user = response.body.username
        const blogToDelete = originalBlogs[0]
        const response = await helper.userLogin()
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${response.body.token}`)
            .expect(204)

        const blogsAfterDelete = await helper.blogsInDB()
        expect(blogsAfterDelete).toHaveLength(originalBlogs.length - 1)

        const content = blogsAfterDelete.map(blog => blog.title)
        expect(content).not.toContain('This is a test blog')
    })


    test('updated a blog with likes', async () => {
        const newBlog = {
            "title": "Interesting view",
            "author": "Jane Dido",
            "url": "good.blog/3",
            "likes": 12,
            "user": user
        }
        const blogsinDB = await helper.blogsInDB()
        const foundBlog = blogsinDB.find(blog => blog.title === 'Interesting view')
        console.log(foundBlog.id); // 6371acc6616eb32323776276
        await api.put(`/api/blogs/${foundBlog.id}`)
            .send(newBlog)
            .expect(200)
        const blogsAfterUpdate = await helper.blogsInDB()
        const updatedBlog = blogsAfterUpdate.find(blog => blog.title === 'Interesting view')
        expect(updatedBlog.likes).toBe(12)
    })

})

afterAll(() => {
    mongoose.connection.close()
})