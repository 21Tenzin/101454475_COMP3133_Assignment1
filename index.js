const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./db");
const schema = require("./schema");
const resolvers = require("./resolvers");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

const server = new ApolloServer({ typeDefs: schema, resolvers });

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(4002, () => {
        console.log("Server started on http://localhost:4002/graphql");
    });
}

startServer();