const restaurantResolvers = require('./restaurants.js');
const customerResolvers = require('./customers.js');

const resolvers = {
    Query: {
        ...restaurantResolvers.Query,
        ...customerResolvers.Query,
    },
    Mutation: {
        ...restaurantResolvers.Mutation,
        ...customerResolvers.Mutation,
        
    },
}
module.exports = { resolvers }