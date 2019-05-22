// Include Express server and its dependencies
const bodyparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');
const port = process.env.PORT || 9000;
const app = express();


// Include GraphQL schema and resolver
const fs = require('fs');
const schemaObj = fs.readFileSync('./schema.graphql', {encoding:'utf-8'});
const resolvers = require('./resolvers');
const {makeExecutableSchema} = require('graphql-tools');

// Bind schema and resolver
const schema = makeExecutableSchema({typeDefs:schemaObj, resolvers:resolvers});

// Register bodyparser and cors middleware with Express framework
app.use(cors(), bodyparser.json());

// Define routes to fetch data from GraphQL clients
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express')
// ReactJS clients can use this endpoint to query GraphQL server
app.use('/graphql', graphqlExpress({schema}))
// GraphiQL client can use this endpoint to query GraphQL server
app.use('/graphiql', graphiqlExpress({endpointURL: "/graphql"}))

// Start the Express server
app.listen(
    port, () => console.info (
        `Server started on port ${port}`
    )
);

