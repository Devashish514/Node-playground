require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require("./REST/routes/routes");
const { graphqlHTTP } = require('express-graphql');
const root = require('./GraphQL/rootResolver');
const Schema = require("./GraphQL/schema");

app.use(express.json());

app.use('/api/v1', routes);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connection Successfull..'))
    .catch(err => console.error(err));

const PORT = process.env.PORT;

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: root,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Server Running @ http://localhost:${PORT}/ `);
    console.log(`graphQL server Running @ http://localhost:${PORT}/graphql`);
});
