// graphql schema for user registration...
const { buildSchema } = require('graphql');

const Schema = buildSchema(`
    type Mutation {
        createUser(
            firstName: String!,
            lastName: String!,
            email: String!,
            password: String!,
            phone: String!
        ): User
    }

    type Query {
        getUsers: [User]
    }

    type User {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        phone: String!
    }
`);

module.exports = {
    Schema
}