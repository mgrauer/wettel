const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;
const dummy = require('../dummy.json');

const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        level: { type: GraphQLString },
        role: { type: GraphQLString },
        org: { type: GraphQLString },
        ooodoc: {
            type: OneononeDocType,
            resolve(parent, args) {
                return dummy.oneononedocs.find(el => el.personId === parent.id);
            }
        }
    })
});

const OneononeDocType = new GraphQLObjectType({
    name: 'Oneononedoc',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        link: { type: GraphQLString },
        person: {
            type: PersonType,
            resolve(parent, args) {
                console.log(parent);
                return dummy.people.find(el => el.id === parent.personId);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        person: {
            type: PersonType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from persistence
                console.log('RESOLVE');
                console.log(parent);
                console.log(args);
                return dummy.people.find(el => el.id === args.id);
            }
        },
        ooodoc: {
            type: OneononeDocType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log(dummy);
                return dummy.oneononedocs.find(el => el.id === args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
}); 
