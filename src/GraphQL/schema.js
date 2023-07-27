const { buildSchema } = require('graphql');

const Schema = buildSchema(`
    type Blogs {
        _id: String!
        title: String!
        author: User
        description: String!
        metaTags: [String]
    }

    type User {
        _id: String
        firstName: String!
    }

    type Query {
        getBlogs: [Blogs]
        getBlogById(id:String!): Blogs
    }
`);

module.exports = Schema;