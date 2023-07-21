require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/route');
const { graphqlHTTP } = require('express-graphql');
const { Schema } = require("./Schemas/graphqlSchemas");
const { root } = require('./GraphQL/UserResolvers');

app.use(express.json());

app.use('/api/v1', router);

app.get('/hello', (req, res) => { res.send("hello") });

// mongoose.connect('',)
//     .then(() => console.log('Mongoose is Connected'))
//     .catch((err) => { console.error(err) });

const port = process.env.PORT;

//Route for GraphQL API's..
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`Server Running at Port ${port}`);
    console.log(`GraphQL Server Running @ http://${process.env.HOST_ADDRESS}:${port}/graphql`);
});


module.exports = app;