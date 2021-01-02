const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const allLikes = blogs.reduce(function(sum, blog){
                        return sum + blog.likes
                    }, 0)
    return allLikes
}

const favoriteBlog = (blogs) => {
    const mostLikes = blogs.reduce(function(prev, cur){
        return prev.likes > cur.likes ? prev : cur
    }, {})
    return mostLikes
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}