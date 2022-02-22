const { ApolloServer, gql } = require("apollo-server");


const mocks = {
    Date: () => "12/12/1987",
    String: () => "Cool Data String",
};

const typeDefs = gql`
    scalar Date


    """
    An Object that describes the characteristics of a Programming day
    """
    type ProgrammingDay {

        "A Programming day's unique identifier"
        id: ID!
        date: Date!
        language: String!
        "the level of programming"
        level: Level
    }

    enum Level {
        Beginner
        Intermediate
        Advance
    }

    type Query {
        totalDays: Int!
        allDays: [ProgrammingDay!]!
    }

    input AddDayInput {
        date: Date!
        language: String!
        level: Level
    }

    type RemoveDayPayload {
        day: ProgrammingDay!
        removed: Boolean
        totalBefore: Int
        totalAfter: Int
    }

    type Mutation {
        addDay(input: AddDayInput!): ProgrammingDay
        removeDay(id: ID!): RemoveDayPayload!
    }

    type Subscription {
        newDay: ProgrammingDay!
    }
`;


// const resolvers = {

// };

const server = new ApolloServer ({
    typeDefs,
    mocks
});

server.listen().then(({url})=>
    console.log(`Server running at ${url}`)
);