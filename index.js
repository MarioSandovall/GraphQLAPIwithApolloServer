const { ApolloServer, gql, ApolloError } = require('apollo-server');

const SessionAPI = require('./dataSources/sessions');
const SpeakerAPI = require('./dataSources/speakers');

const typeDefs =  require('./schema');

const resolvers = require('./resolvers');

const dataSources = () => ({
    sessionAPI: new SessionAPI(),
    speakerAPI: new SpeakerAPI()
});

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    dataSources, 
    debug: false,
    formatError: (error) => {
        if (error.extensions.code === 'INTERNAL_SERVER_ERROR'){
            return new ApolloError('We are having some trouble', 'error',{ toke: 'uniqueToken'})
        }

        return error;
    }
});

server 
    .listen({ port: process.env.PORT || 4001 })
    .then(({ url }) => {
        console.log(`GraphQl running at ${url}`);
    });