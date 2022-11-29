const { indexOf } = require('lodash');
var _ = require('lodash');

const totalLikes = (blogs) => {
    let likes = 0
    if (blogs.length > 0) {
        for (let blog of blogs) {
            likes += blog.likes
        }
        return likes
    } else {
        return 0
    }
}

const favoriteBlog = (blogs) => {
    let likes = []
    for (let blog of blogs) {
        likes.push(blog.likes)
    }
    const mostLikes = likes.find(biggest => biggest === Math.max(...likes))
    // spread the "likes" array, otherwise it returns "NaN"
    const favBlog = blogs.find(blog => blog.likes === mostLikes)
    const { __v, _id, url, ...remained } = favBlog
    // destructure the favBlog by removing the three named properties
    return (remained)
}

const mostBlogs = (blogs) => {
    let authors = []
    for (let blog of blogs) {
        authors.push(blog.author)
    }
    const authorList = _.countBy(authors, _.identity)
    const authorName = _.maxBy(Object.entries(authorList), Object.values)
    return _.zipObject(["author", "blogs"], authorName)
}

const mostLikes = (blogs) => {
    const authorByName = _.groupBy(blogs, 'author')
    const authorList = Object.keys(authorByName, 'author')
    // console.log(authorByName);
    const blogArray = Object.values(authorByName)
    const likesTotal = []
    for (let eachArray of blogArray) {
        const authorLikes = _.sumBy(eachArray, 'likes')
        likesTotal.push(authorLikes)
    }
    // console.log(authorList);
    // console.log(likesTotal);
    const mostLikes = Math.max(...likesTotal)
    // console.log(mostLikes);
    const ind = likesTotal.indexOf(mostLikes)

    function newObj() {
        this.author = authorList[ind]
        this.likes = mostLikes
    }
    // console.log(_.assignIn(new newObj));
    return _.assignIn(new newObj)

}



module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}