const {
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLSchema,
} = require("graphql");
const resolvers = require("./resolvers");

const user = new GraphQLObjectType({
    name: "user",
    fields: () => ({
        _id: {
            type: GraphQLString,
        },
        id:{
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        lastname: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        avatar: {
            type: GraphQLString,
        },
        rol: {
            type: GraphQLString,
        },
    }),
});

const Message = new GraphQLObjectType({
    name: "Message",
    fields: () => ({
        _id: {
            type: GraphQLString,
        },
        body: {
            type: GraphQLString,
        },
        from: {
            type: user,
        },
        to: {
            type: user,
        },
        readed: {
            type: GraphQLBoolean,
        },
    }),
});

const House = new GraphQLObjectType({
    name: "House",
    fields: () => ({
        _id: {
            type: GraphQLString,
        },
        address: {
            type: GraphQLString,
        },
        city: {
            type: GraphQLString,
        },
        state: {
            type: GraphQLString,
        },
        size: {
            type: GraphQLInt,
        },
        type: {
            type: GraphQLString,
        },
        zipcode: {
            type: GraphQLInt,
        },
        rooms: {
            type: GraphQLInt,
        },
        bathrooms: {
            type: GraphQLInt,
        },
        parking: {
            type: GraphQLBoolean,
        },
        price: {
            type: GraphQLInt,
        },
        image: {
            type: GraphQLString,
        },
    }),
});

const userFilterInput = new GraphQLInputObjectType({
    name: "userFilterInput",
    fields: () => ({
        name: {
            type: GraphQLString,
        },
        lastname: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
    }),
});

const query = {
    hello: {
        type: GraphQLString,
        resolve: resolvers.hello
    },
    users: {
        type: new GraphQLList(user),
        resolve: resolvers.users,
    },
    user: {
        type: user,
        args: {
            id: {
                type: GraphQLID,
            },
        },
        resolve: resolvers.user,
    },
    usersByFilter: {
        type: new GraphQLList(user),
        args: {
            filter: {
                type: userFilterInput,
            },
        },
        resolve: resolvers.userFilterInput
    },
    messages: {
        type: new GraphQLList(Message),
        resolve: resolvers.messages,
    },
    message: {
        type: Message,
        args: {
            id: {
                type: GraphQLString,
            },
        },
        resolve: resolvers.message,
    },
    houses: {
        type: new GraphQLList(House),
        resolve: resolvers.houses,
    },
    house: {
        type: House,
        args: {
            id: {
                type: GraphQLString
            }
        },
        resolve: resolvers.house
    }
}

const queryType = new GraphQLObjectType({
    name: "query",
    fields: query
})

const schema = new GraphQLSchema({
    query: queryType
})

module.exports = schema;


