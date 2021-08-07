const graphql = require('graphql');
const Person = require('../models/person');
const Resource = require('../models/resource');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;


//const dummy = require('../dummy.json');

const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        name: { type: GraphQLString },
        level: { type: GraphQLString },
        role: { type: GraphQLString },
        team: { type: GraphQLString }
/*,
        ooodoc: {
            type: OneononeDocType,
            resolve(parent, args) {
                return dummy.oneononedocs.find(el => el.personId === parent.id);
            }
        }
*/
    })
});

/*
const OneononeDocType = new GraphQLObjectType({
    name: 'Oneononedoc',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        link: { type: GraphQLString },
        person: {
            type: PersonType,
            resolve(parent, args) {
                return dummy.people.find(el => el.id === parent.personId);
            }
        }
    })
});
*/
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        person: {
            type: PersonType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return dummy.people.find(el => el.id === args.id);
            }
        },
        people: {
            type: new GraphQLList(PersonType),
            resolve(parent, args) {
                return dummy.people;
            }
        }
/*,
        ooodoc: {
            type: OneononeDocType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return dummy.oneononedocs.find(el => el.id === args.id);
            }
        }
*/
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPerson: {
            type: PersonType,
            args: {
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                name: { type: GraphQLString },
                level: { type: GraphQLString },
                role: { type: GraphQLString },
                team: { type: GraphQLString }
            },
            resolve(parent, args) {
                let person = new Person({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    name: args.name,
                    level: args.level,
                    role: args.role,
                    team: args.team 
                });
                return person.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
}); 
