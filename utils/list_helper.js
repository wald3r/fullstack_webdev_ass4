const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) => {

    let value = 0
    for(let a = 0; a < blogs.length; a++){
        value += blogs[a].likes
    }
    return value
}

const favoriteBlog = (blogs) => {

    let min = 0
    let blog = null
    for(let a = 0; a < blogs.length; a++){
        if(blogs[a].likes > min){
            min = blogs[a].likes
            blog = blogs[a]
        }
    }
    return blog
}

const findAuthor = (authors, name) => {
    for(let a = 0; a < authors.length; a++){
        if(authors[a].author === name){
            return a
        }
    }
    return -1
}


const findMostBlogs = (authors) => {

    let author = null
    let min = 0
    for(let a = 0; a < authors.length; a++){
        if(authors[a].blogs > min){
            min = authors[a].blogs
            author = authors[a]
        }
    }
    return author
}

const findMostLikes = (authors) => {

    let author = null
    let min = 0
    for(let a = 0; a < authors.length; a++){
        if(authors[a].likes > min){
            min = authors[a].likes
            author = authors[a]
        }
    }
    return author
}

const mostBlogs = (blogs) => {

    let newauthors = []
    for(let a = 0; a < blogs.length; a++){
        let b = findAuthor(newauthors, blogs[a].author)
        if(b > -1){
            newauthors[b].blogs += 1
        }else{
            const newauthor = {author: blogs[a].author, blogs: 1}
            newauthors.push(newauthor)
        }
    }

    return findMostBlogs(newauthors)
}

const mostLikes = (blogs) => {

    let newauthors = []

    for(let a = 0; a < blogs.length; a++){
        let b = findAuthor(newauthors, blogs[a].author)
        if(b > -1){
            newauthors[b].likes += blogs[a].likes
        }else{
            const newauthor = {author: blogs[a].author, likes: blogs[a].likes}
            newauthors.push(newauthor)
        }
    }
    
    return findMostLikes(newauthors)
}


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }