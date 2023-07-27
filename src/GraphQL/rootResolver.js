const { getAllBlogsResolver, getBlogByIdResolver } = require("./resolvers/blogResolvers");


const root = {
    getBlogs: getAllBlogsResolver,
    getBlogById: getBlogByIdResolver
}

module.exports = root;