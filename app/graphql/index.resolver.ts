import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

// query - mutation - schema - types

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "blogsType",
          fields: {
            id: { type: GraphQLInt },
            title: { type: GraphQLString },
            text: { type: GraphQLString },
            image: { type: GraphQLString },
          },
        })
      ),
      resolve: () => {
        return [
          {
            id: 1,
            title: "title of blod",
            text: "text of blod",
            image: "index dot jpec",
          },
        ];
      },
    },
  },
});
const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {},
});

export const graphQLSchema = new GraphQLSchema({
  query: RootQuery,
  //   mutation: RootMutation,
});
