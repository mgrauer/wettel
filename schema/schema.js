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

const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        name: { type: GraphQLString },
        level: { type: GraphQLString },
        role: { type: GraphQLString },
        team: { type: GraphQLString },
        ooodoc: {
            type: ResourceType,
            resolve(parent, args) {
                return Resource.findById(parent.ooodocId);
            }
        }
    })
});

const ResourceType = new GraphQLObjectType({
    name: 'Resource',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        link: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        person: {
            type: PersonType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Person.findById(args.id);
            }
        },
        people: {
            type: new GraphQLList(PersonType),
            resolve(parent, args) {
                return Person.find({});
            }
        },
        resource: {
            type: ResourceType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Resource.findById(args.id);
            }
        },
        resources: {
            type: new GraphQLList(ResourceType),
            resolve(parent, args) {
                return Resource.find({});
            }
        }
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
        },
        addResource: {
            type: ResourceType,
            args: {
                name: { type: GraphQLString },
                link: { type: GraphQLString }
            },
            resolve(parent, args) {
                let resource = new Resource({
                    name: args.name,
                    link: args.link
                });
                return resource.save();
            }
        },
        addOooDoc: {
            type: ResourceType,
            args: {
                name: { type: GraphQLString },
                link: { type: GraphQLString },
                personId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let resource = new Resource({
                    name: args.name,
                    link: args.link
                });
                resource.save();
                const query = { _id: args.personId };
                Person.updateOne(query, { $set: { ooodocId: resource.id }}, {}, function(err, res){});
                return resource;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
}); 
